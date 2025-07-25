import { Hover, Range, Position } from 'vscode-languageserver/node';

import Jimp = require('jimp');

import Parser = require('web-tree-sitter');

import { rawDataFromAST } from '../binary-data/utils';
import {
  prtDevModeWFromRawData,
  prtDevModeFromRawData,
  DevMode,
  devModeConstants,
  extractDmFieldsFlags,
} from '../binary-data/printing-device-mode';
import { bitmapAsBase64EncodedString, bitmapInfoFromRawData } from '../binary-data/bitmap-data';
import { convertToDWORD } from '../binary-data/convert-data';

export async function hoverFromAST(root: Parser.Tree, line: number, character: number) {
  return await scanBlock(root.rootNode, line, character);
}

async function scanTopLevelStructure(
  node: Parser.Node,
  line: number,
  character: number,
): Promise<Hover | null> {
  switch (node.type) {
    case 'assignment':
      return await scanAssignment(node, line, character);
    case 'block':
      return await scanBlock(node, line, character);
  }
  return null;
}

async function scanBlock(
  node: Parser.Node,
  line: number,
  character: number,
): Promise<Hover | null> {
  for (const syntax_node of node.namedChildren) {
    if (syntax_node === null) {
      continue;
    }
    let ret = await scanTopLevelStructure(syntax_node, line, character);
    if (ret !== null) {
      return ret;
    }
  }
  return null;
}

function positionInNode(line: number, character: number, node: Parser.Node): boolean {
  return (
    (node.startPosition.row < line ||
      (node.startPosition.row === line && node.startPosition.column <= character)) &&
    (line < node.endPosition.row ||
      (line === node.endPosition.row && character <= node.endPosition.column))
  );
}

function generateDocsForDevMode(struct: DevMode | undefined, ansiVersion: boolean): string[] {
  // remarks
  let structDocLink;
  if (ansiVersion) {
    structDocLink =
      '[DEVMODEA](https://learn.microsoft.com/en-us/windows/win32/api/wingdi/ns-wingdi-devmodea)';
  } else {
    structDocLink =
      '[DEVMODEW](https://learn.microsoft.com/en-us/windows/win32/api/wingdi/ns-wingdi-devmodew)';
  }
  let remarks = `This member is of the type ${structDocLink}.

Be aware that only entries marked by the flags of the member *dmFields* are considered as valid.
To speed up reading of this structure there are symbols next to the values indicating whether the entry is flagged:

- \uD83C\uDFF3\uFE0F: value is valid
- \u26D4: value is not valid
- \uD83D\uDCCC: value is always valid

Furthermore this structure contains two [unions](https://en.cppreference.com/w/cpp/language/union).
This means that only one member (including all submembers) can be valid at a time.

By the way it seems that MS Access does not clear the memory after allocation.
Therefore the structure may contain garbage especially after the zero byte of the two fixed size strings.
This is also the reason why this member seams always to have different content after an export even though nothing had changed.`;

  let content = `**PrtDevMode${ansiVersion ? '' : 'W'}:**\n\n`;
  if (struct === undefined) {
    // TODO: add reason why
    content += '*could not parse structure*';
    return [content, remarks];
  }

  const dmFields = struct['dmFields'];
  let dmFieldsFlags = extractDmFieldsFlags(dmFields);

  const pinned_entry_names = [
    'dmDeviceName',
    'dmSpecVersion',
    'dmDriverVersion',
    'dmSize',
    'dmDriverExtra',
    'dmFields',
  ];
  const available_flags = extractDmFieldsFlags(0b111111111111111111111111111111);

  function formatEntry(name: string, value: any, indentation: number): string {
    // display entry name
    let out = `${'  '.repeat(indentation)}- ${name}:`;

    // display value
    if (typeof value === 'string') {
      out += ` '${value}'`;
    } else if (typeof value === 'object') {
      // values are displayed in a sub list
    } else if (name === 'dmFields') {
      out += ` ${value} (=${Object.keys(dmFieldsFlags).length} flags)`;
    } else if (name === 'dmPrintQuality' && value >= 0) {
      out += ` ${value}`;
    } else if (Object.keys(devModeConstants).includes(name)) {
      let subKey;
      if (typeof value === 'number' && value < 0) {
        subKey = String(value);
      } else {
        subKey = value;
      }

      out += ` ${devModeConstants[name][subKey] ?? '???'} (${value})`;
    } else {
      out += ` ${value}`;
    }

    // mark flagged values
    const check_for_flag = `DM_${name.slice(2).toUpperCase()}`;
    if (pinned_entry_names.includes(name)) {
      out += ' \uD83D\uDCCC'; // https://emojipedia.org/pushpin/
    } else if (Object.values(dmFieldsFlags).includes(check_for_flag)) {
      out += ' \uD83C\uDFF3\uFE0F'; // https://emojipedia.org/white-flag/
    } else if (Object.values(available_flags).includes(check_for_flag)) {
      out += ' \u26D4'; // https://emojipedia.org/no-entry/
    }

    // add a sub list
    if (name === 'dmFields') {
      if (Object.keys(dmFieldsFlags).length > 0) {
        out += '\n';
      }
      for (const [flag, flag_name] of Object.entries(dmFieldsFlags)) {
        out += `  - ${flag_name} (${flag})\n`;
      }
    } else if (typeof value === 'object') {
      out += '\n';
      for (const [sub_name, sub_value] of Object.entries(value)) {
        out += formatEntry(sub_name, sub_value, indentation + 1) + '\n';
      }
    }

    return out;
  }

  content += Object.entries(struct)
    .filter(([key]) => key !== '_driverData')
    .map((el) => formatEntry(el[0], el[1], 0))
    .join('\n');

  return [content, remarks];
}

/** feature still in development */
const enablePictureData = false;

async function scanAssignment(
  assignment_node: Parser.Node,
  line: number,
  character: number,
): Promise<Hover | null> {
  if (!positionInNode(line, character, assignment_node)) {
    return null;
  }

  let range = Range.create(
    Position.create(assignment_node.startPosition.row, assignment_node.startPosition.column),
    Position.create(assignment_node.endPosition.row, assignment_node.endPosition.column),
  );

  if (assignment_node.firstNamedChild?.type === 'identifier') {
    if (assignment_node.firstNamedChild.text === 'PrtDevMode') {
      const struct = prtDevModeFromRawData(rawDataFromAST(assignment_node));

      return {
        contents: generateDocsForDevMode(struct, true),
        range: range,
      };
    } else if (assignment_node.firstNamedChild.text === 'PrtDevModeW') {
      // https://learn.microsoft.com/en-us/windows-hardware/drivers/display/the-devmodew-structure
      const struct = prtDevModeWFromRawData(rawDataFromAST(assignment_node));

      return {
        contents: generateDocsForDevMode(struct, false),
        range: range,
      };
    } else if (enablePictureData && assignment_node.firstNamedChild.text === 'PictureData') {
      const raw_data = rawDataFromAST(assignment_node);
      const bitmapInfo = bitmapInfoFromRawData(raw_data);

      if (!raw_data || !bitmapInfo) {
        return {
          contents: '*could not parse structure*',
          range: range,
        };
      }

      const structContent = `**BITMAPINFOHEADER**
- biSize: ${bitmapInfo['biSize']}
- biWidth: ${bitmapInfo['biWidth']}
- biHeight: ${bitmapInfo['biHeight']}
- biPlanes: ${bitmapInfo['biPlanes']}
- biBitCount: ${bitmapInfo['biBitCount']}
- biCompression: ${bitmapInfo['biCompression']}
- biSizeImage: ${bitmapInfo['biSizeImage']}
- biXPelsPerMeter: ${bitmapInfo['biXPelsPerMeter']}
- biYPelsPerMeter: ${bitmapInfo['biYPelsPerMeter']}
- biClrUsed: ${bitmapInfo['biClrUsed']}
- biClrImportant: ${bitmapInfo['biClrImportant']}
      `;

      let preview = '**PictureData (EXPERIMENTAL):**\n\n';

      const previewAsBase64 = bitmapAsBase64EncodedString(bitmapInfo, raw_data);
      if (previewAsBase64) {
        // preview += `![Preview](data:image/bmp;base64,${previewAsBase64})`;

        let bmpHeader: number[] = [];
        bmpHeader.push(...[66, 77]); // bfType: ascii string 'BM'
        bmpHeader.push(...convertToDWORD(raw_data.length)); // bfSize
        bmpHeader.push(...convertToDWORD(0)); // bfReserved
        bmpHeader.push(...convertToDWORD(14 + bitmapInfo['biSize'])); //bfOffBits

        const u8 = new Uint8Array(bmpHeader.concat(raw_data));
        const buf = Buffer.from(u8);

        try {
          const img = await Jimp.create(buf);
          preview += `![Preview](${await img.getBase64Async('image/bmp')})`;
        } catch {
          return {
            contents: '*could not parse structure*',
            range: range,
          };
        }
      } else {
        let header: number[] = [];
        // http://www.libpng.org/pub/png/spec/1.2/PNG-Structure.html
        header.push(...[137, 80, 78, 71, 13, 10, 26, 10]);
        const u8 = new Uint8Array(header.concat(raw_data));
        const buf = Buffer.from(u8);

        try {
          const img = await Jimp.create(buf);
          preview += `![Preview](${await img.getBase64Async('image/png')})`;
        } catch {
          return {
            contents: '*could not parse structure*',
            range: range,
          };
        }
      }

      // contents += `<img width="20" height="20" src="data:image/bmp;base64,${previewAsBase64}"/>`;
      // contents +=
      //   '<img width="20" height="15" src="data:image/jpeg;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="/>';

      // TODO: add meta information of the image
      return {
        contents: [preview, structContent],
        range: range,
      };
    }
  }

  return null;
}
