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

// TODO: continue
export function pictureDataFromAST(assignment_node: Parser.SyntaxNode): string {
  let content_node = assignment_node.firstNamedChild?.nextNamedSibling;
  if (!content_node) {
    return '';
  }

  const hex_values = hexValuesFromNode(content_node);
  // const raw_data = hex2bin(hex_values);

  return hex_values.map((el) => el.slice(2)).join('');
}

export function prtDevModeFromAST(assignment_node: Parser.SyntaxNode) {
  let content_node = assignment_node.firstNamedChild?.nextNamedSibling;
  if (!content_node) {
    return;
  }

  return prtDevModeFromHexValues(hexValuesFromNode(content_node));
}

export function prtDevModeWFromAST(assignment_node: Parser.SyntaxNode) {
  let content_node = assignment_node.firstNamedChild?.nextNamedSibling;
  if (!content_node) {
    return;
  }

  return prtDevModeWFromHexValues(hexValuesFromNode(content_node));
}

function hex2bin(hex_values: string[]): number[] {
  let total_hex: string = hex_values.map((v) => v.slice(2)).join('');
  if (total_hex.length % 2 == 1) return []; // TODO: maybe throw an error or return undefined
  let raw_data: number[] = [];

  for (let idx = 0; idx < total_hex.length / 2; ++idx) {
    raw_data.push(Number('0x' + total_hex.slice(idx * 2, idx * 2 + 2)));
  }

  return raw_data;
}

/** signed, 2 bytes */
function extractShort(raw_data: number[], start_pos: number): number {
  // TODO: implement
  return 0;
}

/** signed, 4 bytes */
function extractLong(raw_data: number[], start_pos: number): number {
  // TODO: implement
  return 0;
}

/** maps to unsigned short, 2 bytes */
function extractWORD(raw_data: number[], start_pos: number): number {
  const data = raw_data.slice(start_pos, start_pos + 2);
  return data[0] + (data[1] << 8);
}

/** maps to unsigned short, 4 bytes */
function extractDWORD(raw_data: number[], start_pos: number): number {
  // TODO: implement
  return 0;
}

function extractString(raw_data: number[], start_pos: number, num_char: number): string {
  const string_data = raw_data.slice(start_pos, start_pos + num_char);
  const end_idx = string_data.findIndex((elem) => elem == 0);
  return String.fromCharCode(...string_data.slice(0, end_idx));
}

function extractWString(raw_data: number[], start_pos: number, num_char: number): string {
  // TODO: implement
  return '';
}

/**
 * - [DEVMODEA](https://learn.microsoft.com/en-us/windows/win32/api/wingdi/ns-wingdi-devmodea)
 */
export function prtDevModeFromHexValues(hex_values: string[]) {
  const raw_data = hex2bin(hex_values);
  if (raw_data.length < 156) {
    return;
  }

  const struct = {
    dmDeviceName: extractString(raw_data, 0, 32),
    dmSpecVersion: extractWORD(raw_data, 32),
    dmDriverVersion: extractWORD(raw_data, 34),
    dmSize: extractWORD(raw_data, 36),
    dmDriverExtra: extractWORD(raw_data, 38),
    dmFormName: extractString(raw_data, 70, 32),
  };
  if (struct.dmSize + struct.dmDriverExtra != raw_data.length) {
    return;
  }

  // TODO: apply sorting order of DEVMODEA

  return struct;
}

/**
 * - [DEVMODEW](https://learn.microsoft.com/en-us/windows/win32/api/wingdi/ns-wingdi-devmodew)
 */
export function prtDevModeWFromHexValues(hex_values: string[]) {
  const raw_data = hex2bin(hex_values);
  if (raw_data.length < 220) {
    return;
  }

  const struct = {
    dmDeviceName: extractWString(raw_data, 0, 32),
    dmSpecVersion: extractWORD(raw_data, 64),
    dmDriverVersion: extractWORD(raw_data, 66),
    dmSize: extractWORD(raw_data, 68),
    dmDriverExtra: extractWORD(raw_data, 70),
    dmFormName: extractWString(raw_data, 102, 32),
  };
  if (struct.dmSize + struct.dmDriverExtra != raw_data.length) {
    return;
  }

  // TODO: apply sorting order of DEVMODEW

  return struct;
}
