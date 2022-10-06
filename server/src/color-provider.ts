import { Color, ColorInformation, Position, Range } from 'vscode-languageserver/node';

import Parser = require('web-tree-sitter');

export function colorsFromAST(uri: string, root: Parser.Tree) {
  const colors: ColorInformation[] = [];

  scanBlock(uri, root.rootNode, colors);

  return colors;
}

function scanTopLevelStructure(uri: string, node: Parser.SyntaxNode, colors: ColorInformation[]) {
  switch (node.type) {
    case 'assignment':
      scanAssignment(uri, node, colors);
      break;
    case 'block':
      scanBlock(uri, node, colors);
      break;
  }
}

function scanBlock(uri: string, node: Parser.SyntaxNode, colors: ColorInformation[]) {
  for (const syntax_node of node.namedChildren) {
    scanTopLevelStructure(uri, syntax_node, colors);
  }
}

// https://learn.microsoft.com/en-us/office/vba/api/access.form.datasheetgridlinescolor
const color_properties = [
  'AlternateBackColor',
  'BackColor',
  'BorderColor',
  'DatasheetAlternateBackColor',
  'DatasheetBackColor12',
  'DatasheetGridlinesColor',
  'DatasheetGridlinesColor12',
  'ForeColor',
  'GridlineColor',
];

export function convertTextToColor(text: string) {
  // TODO: pass real values
  return Color.create(1, 0, 0, 1);
}

function scanAssignment(
  uri: string,
  assignment_node: Parser.SyntaxNode,
  colors: ColorInformation[],
) {
  if (
    !assignment_node.firstNamedChild ||
    !color_properties.includes(assignment_node.firstNamedChild.text)
  ) {
    return;
  }

  const color_value_node = assignment_node.firstNamedChild.nextNamedSibling;
  if (
    color_value_node === undefined ||
    color_value_node?.startPosition === undefined ||
    color_value_node?.endPosition === undefined
  ) {
    return;
  }

  colors.push({
    range: Range.create(
      Position.create(color_value_node.startPosition.row, color_value_node.startPosition.column),
      Position.create(color_value_node.endPosition.row, color_value_node.endPosition.column),
    ),
    color: convertTextToColor(color_value_node.text),
  });
}
