import type Parser = require('web-tree-sitter');
import {
  extractDWORD,
  extractLong,
  extractPOINTL,
  extractRGBQUAD,
  extractShort,
  extractWORD,
} from './extract-data';

function hexValuesFromNode(node: Parser.Node) {
  let hex_values: string[] = [];
  for (const child_node of node.namedChildren) {
    if (child_node == null || child_node.type !== 'hex_value') {
      continue;
    }
    hex_values.push(child_node.text);
  }
  return hex_values;
}

export function rawDataFromAST(assignment_node: Parser.Node): number[] | undefined {
  let content_node = assignment_node.firstNamedChild?.nextNamedSibling;
  if (!content_node) {
    return;
  }

  return hex2bin(hexValuesFromNode(content_node));
}

export function hex2bin(hex_values: string[]): number[] {
  let total_hex: string = hex_values.map((v) => v.slice(2)).join('');
  if (total_hex.length % 2 === 1) {
    return [];
  } // TODO: maybe throw an error or return undefined
  let raw_data: number[] = [];

  for (let idx = 0; idx < total_hex.length / 2; ++idx) {
    raw_data.push(Number('0x' + total_hex.slice(idx * 2, idx * 2 + 2)));
  }

  return raw_data;
}

export type StructMember = [string, 'SHORT' | 'LONG' | 'WORD' | 'DWORD' | 'POINTL' | 'RGBQUAD'];

export function extractStruct(raw_data: number[], structDef: StructMember[]) {
  let struct: { [id: string]: any } = new Map();
  let offset = 0;
  for (const structMember of structDef) {
    const name = structMember[0];
    const type = structMember[1];
    let value = undefined;

    switch (type) {
      case 'SHORT':
        value = extractShort(raw_data, offset);
        offset += 2;
        break;
      case 'LONG':
        value = extractLong(raw_data, offset);
        offset += 4;
        break;
      case 'WORD':
        value = extractWORD(raw_data, offset);
        offset += 2;
        break;
      case 'DWORD':
        value = extractDWORD(raw_data, offset);
        offset += 4;
        break;
      case 'POINTL':
        value = extractPOINTL(raw_data, offset);
        offset += 8;
        break;
      case 'RGBQUAD':
        value = extractRGBQUAD(raw_data, offset);
        offset += 4;
        break;
    }
    struct[name] = value;
  }
  struct['__size__'] = offset;

  return struct;
}
