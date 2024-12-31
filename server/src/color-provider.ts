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

function GetRValue(color: number): number {
  return color & 0x000000ff;
}

function GetGValue(color: number): number {
  return (color & 0x0000ff00) >> 8;
}

function GetBValue(color: number): number {
  return (color & 0x00ff0000) >> 16;
}

export function convertTextToColor(color_as_text: string): Color | null {
  if (!/^\d+$/.test(color_as_text)) {
    return null;
  }

  const color_as_number = parseInt(color_as_text);
  if (isNaN(color_as_number)) {
    return null;
  }

  const color_mask = 0xffffff;
  if ((color_as_number | color_mask) !== color_mask) {
    return null;
  }

  return Color.create(
    GetRValue(color_as_number) / 255,
    GetGValue(color_as_number) / 255,
    GetBValue(color_as_number) / 255,
    1,
  );
}

export function convertColorToNumber(color: Color): number {
  return (
    (Math.trunc(color.red * 255) & 0xff) +
    ((Math.trunc(color.green * 255) & 0xff) << 8) +
    ((Math.trunc(color.blue * 255) & 0xff) << 16)
  );
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

  const color = convertTextToColor(color_value_node.text);
  if (color === null) {
    return;
  }

  colors.push({
    range: Range.create(
      Position.create(color_value_node.startPosition.row, color_value_node.startPosition.column),
      Position.create(color_value_node.endPosition.row, color_value_node.endPosition.column),
    ),
    color: color,
  });
}
