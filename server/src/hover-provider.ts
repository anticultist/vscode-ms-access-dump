import { Hover, Range, Position } from 'vscode-languageserver/node';

import Parser = require('web-tree-sitter');

import {
  DevMode,
  extractDmFieldsFlags,
  pictureDataFromAST,
  prtDevModeFromAST,
  prtDevModeWFromAST,
} from './binary-data-parser';

export function hoverFromAST(root: Parser.Tree, line: number, character: number) {
  return scanBlock(root.rootNode, line, character);
}

function scanTopLevelStructure(
  node: Parser.SyntaxNode,
  line: number,
  character: number,
): Hover | null {
  switch (node.type) {
    case 'assignment':
      return scanAssignment(node, line, character);
    case 'block':
      return scanBlock(node, line, character);
  }
  return null;
}

function scanBlock(node: Parser.SyntaxNode, line: number, character: number): Hover | null {
  for (const syntax_node of node.namedChildren) {
    let ret = scanTopLevelStructure(syntax_node, line, character);
    if (ret !== null) return ret;
  }
  return null;
}

function positionInNode(line: number, character: number, node: Parser.SyntaxNode): boolean {
  return (
    (node.startPosition.row < line ||
      (node.startPosition.row == line && node.startPosition.column <= character)) &&
    (line < node.endPosition.row ||
      (line == node.endPosition.row && character <= node.endPosition.column))
  );
}

function generateDocsForDevMode(struct: DevMode | undefined, ansiVersion: boolean): string {
  let contents = `**PrtDevMode${ansiVersion ? '' : 'W'} (EXPERIMENTAL):**\n\n`;
  if (struct === undefined) {
    contents += '*could not parse structure*';
    return contents;
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

  contents += Object.entries(struct)
    .map((el) => formatEntry(el[0], el[1], 0))
    .join('\n');

  // TODO: add comments on the structure, e.g.:
  // - be aware of (two) unions
  // - data structure is probably not initialized vs. not flagged values
  // - not flagged data

  if (ansiVersion) {
    contents +=
      '\n\n[DEVMODEA](https://learn.microsoft.com/en-us/windows/win32/api/wingdi/ns-wingdi-devmodea)';
  } else {
    contents +=
      '\n\n[DEVMODEW](https://learn.microsoft.com/en-us/windows/win32/api/wingdi/ns-wingdi-devmodew)';
  }

  return contents;
}

function scanAssignment(
  assignment_node: Parser.SyntaxNode,
  line: number,
  character: number,
): Hover | null {
  if (!positionInNode(line, character, assignment_node)) return null;

  let range = Range.create(
    Position.create(assignment_node.startPosition.row, assignment_node.startPosition.column),
    Position.create(assignment_node.endPosition.row, assignment_node.endPosition.column),
  );

  if (assignment_node.firstNamedChild?.type == 'identifier') {
    if (assignment_node.firstNamedChild.text == 'PrtDevMode') {
      const struct = prtDevModeFromAST(assignment_node);

      return {
        contents: generateDocsForDevMode(struct, true),
        range: range,
      };
    } else if (assignment_node.firstNamedChild.text == 'PrtDevModeW') {
      // https://learn.microsoft.com/en-us/windows-hardware/drivers/display/the-devmodew-structure
      const struct = prtDevModeWFromAST(assignment_node);

      return {
        contents: generateDocsForDevMode(struct, false),
        range: range,
      };
    } else if (assignment_node.firstNamedChild.text == 'PictureData') {
      const previewAsBase64 = pictureDataFromAST(assignment_node);
      // TODO: add 'experimental' note
      let contents = '**Preview**\n\n';
      contents += `![Preview](data:image/png;base64,${previewAsBase64})`;

      // https://learn.microsoft.com/en-us/windows/win32/api/wingdi/ns-wingdi-bitmapinfoheader
      // https://superuser.com/questions/1199393/is-it-possible-to-directly-embed-an-image-into-a-markdown-document
      // let contents =
      //   '![Hello World](data:image/png;base64,...)';

      return {
        contents: contents,
        range: range,
      };
    }
  }

  return null;
}
