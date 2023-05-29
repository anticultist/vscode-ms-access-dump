import { Hover, Range, Position } from 'vscode-languageserver/node';

import Parser = require('web-tree-sitter');

import {
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

function formatDevMode(struct: {} | undefined, ansiVersion: boolean): string {
  let contents = `**PrtDevMode${ansiVersion ? '' : 'W'} (EXPERIMENTAL):**\n\n`;
  if (struct === undefined) {
    contents += '*could not parse structure*';
    return contents;
  }

  function formatEntry(name: string, value: any): string {
    if (typeof value === 'string') {
      return `- ${name}: '${value}'`;
    } else if (name === 'dmFields') {
      // TODO: add byte representation
      let txt = `- ${name}: ${value}`;
      let flags = extractDmFieldsFlags(value);
      if (Object.keys(flags).length > 0) {
        txt += '\n';
      }
      for (const [flag, flag_name] of Object.entries(flags)) {
        txt += `  - ${flag_name} (${flag})\n`;
      }
      return txt;
    } else {
      return `- ${name}: ${value}`;
    }
  }

  contents += Object.entries(struct)
    .map((el) => formatEntry(el[0], el[1]))
    .join('\n');

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
        contents: formatDevMode(struct, true),
        range: range,
      };
    } else if (assignment_node.firstNamedChild.text == 'PrtDevModeW') {
      const struct = prtDevModeWFromAST(assignment_node);

      return {
        contents: formatDevMode(struct, false),
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
