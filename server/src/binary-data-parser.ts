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

export function prtDevModeFromAST(assignment_node: Parser.SyntaxNode): {} {
  let content_node = assignment_node.firstNamedChild?.nextNamedSibling;
  if (!content_node) {
    return {};
  }

  return prtDevModeFromHexValues(hexValuesFromNode(content_node));
}

function hex2bin(hex_values: string[]): number[] {
  let total_hex: string = hex_values.map((v) => v.slice(2)).join('');
  if (total_hex.length % 2 == 1) return []; // TODO: maybe throw an error
  let raw_data: number[] = [];

  for (let idx = 0; idx < total_hex.length / 2; ++idx) {
    raw_data.push(Number('0x' + total_hex.slice(idx * 2, idx * 2 + 2)));
  }

  return raw_data;
}

function extractString(raw_data: number[], start_pos: number, length: number): string {
  const string_data = raw_data.slice(start_pos, start_pos + length);
  const end_idx = string_data.findIndex((elem) => elem == 0);
  return String.fromCharCode(...string_data.slice(0, end_idx));
}

// https://learn.microsoft.com/en-us/windows/win32/api/wingdi/ns-wingdi-devmodea
// https://learn.microsoft.com/en-us/windows/win32/api/wingdi/ns-wingdi-devmodew
export function prtDevModeFromHexValues(hex_values: string[]): {} {
  let raw_data = hex2bin(hex_values);

  return {
    dmDeviceName: extractString(raw_data, 0, 32),
    dmFormName: extractString(raw_data, 70, 32),
  };

  // TODO: apply sorting order of DEVMODEA
}
