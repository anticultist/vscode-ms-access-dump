import { Color, ColorInformation, Position, Range } from 'vscode-languageserver/node';
import { getPropertyValuesFromAST } from './ast-utils';

import Parser = require('web-tree-sitter');

export function colorsFromAST(root: Parser.Tree) {
  const colors: ColorInformation[] = [];

  getPropertyValuesFromAST(root.rootNode, COLOR_PROPERTIES).forEach((node) => {
    const color = convertTextToColor(node.text);
    if (color === null) {
      return;
    }

    colors.push({
      range: Range.create(
        Position.create(node.startPosition.row, node.startPosition.column),
        Position.create(node.endPosition.row, node.endPosition.column),
      ),
      color: color,
    });
  });

  return colors;
}

// https://learn.microsoft.com/en-us/office/vba/api/access.form.datasheetgridlinescolor
const COLOR_PROPERTIES = [
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
