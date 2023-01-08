import { off } from 'process';
import Parser = require('web-tree-sitter');

function hexValuesFromNode(node: Parser.SyntaxNode) {
  let hex_values: string[] = [];
  for (const child_node of node.namedChildren) {
    if (child_node.type !== 'hex_value') {
      continue;
    }
    hex_values.push(child_node.text);
  }
  return hex_values;
}

export function prtDevModeFromAST(assignment_node: Parser.SyntaxNode) {
  let content_node = assignment_node.firstNamedChild?.nextNamedSibling;
  if (content_node) {
    return hexValuesFromNode(content_node).join(' ,\n');
  }
  return 'PrtDevMode';
}

function hex2bin(hex_values: string[]): number[] {
  let total_hex: string = hex_values.map((v) => v.slice(2)).join('');
  if (total_hex.length % 2 == 1) return []; // TODO: maybe throw an error
  let raw_data: number[] = [];

  for (let idx = 0; idx < total_hex.length / 2; ++idx) {
    raw_data.push(Number('0x' + total_hex.slice(idx * 2, idx * 2 + 2)));
  }
  // 32+17*4+4

  return raw_data;
}

// https://learn.microsoft.com/en-us/windows/win32/api/wingdi/ns-wingdi-devmodea
// https://learn.microsoft.com/en-us/windows/win32/api/wingdi/ns-wingdi-devmodew
export function prtDevModeFromHexValues(hex_values: string[]): {} {
  // sizeof(DEVMODEA) = 232 ?!
  let raw_data = hex2bin(hex_values);
  return {
    dmDeviceName: '',
    dmSpecVersion: '',
    dmDriverVersion: '',
    dmSize: '',
    dmDriverExtra: '',
    dmFields: '',
    // _0: '',
    dmColor: '',
    dmDuplex: '',
    dmYResolution: '',
    dmTTOption: '',
    dmCollate: '',
    dmFormName: '',
    dmLogPixels: '',
    dmBitsPerPel: '',
    dmPelsWidth: '',
    dmPelsHeight: '',
    // _1: '',
    dmDisplayFrequency: '',
    dmICMMethod: '',
    dmICMIntent: '',
    dmMediaType: '',
    dmDitherType: '',
    dmReserved1: '',
    dmReserved2: '',
    dmPanningWidth: '',
    dmPanningHeight: '',
  };
}
