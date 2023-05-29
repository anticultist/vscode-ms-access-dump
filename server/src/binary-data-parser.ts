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
  const data = raw_data.slice(start_pos, start_pos + 2);
  return data[0] + (data[1] << 8) + (data[2] << 16) + (data[3] << 24);
}

function extractString(raw_data: number[], start_pos: number, num_char: number): string {
  const string_data = raw_data.slice(start_pos, start_pos + num_char);
  const end_idx = string_data.findIndex((elem) => elem == 0);
  return String.fromCharCode(...string_data.slice(0, end_idx));
}

function extractWString(raw_data: number[], start_pos: number, num_char: number): string {
  let string_data: number[] = [];
  for (let char_idx = 0; char_idx < num_char; ++char_idx) {
    string_data.push(extractWORD(raw_data, start_pos + char_idx * 2));
  }
  const end_idx = string_data.findIndex((elem) => elem == 0);
  return String.fromCharCode(...string_data.slice(0, end_idx));
}

export function extractDmFieldsFlags(dmFields: number): {} {
  const flags: { [id: number]: string } = {};

  for (let bit_position = 0; bit_position < 32; ++bit_position) {
    const flag: number = 1 << bit_position;
    if ((dmFields & flag) !== flag) {
      continue;
    }

    if (flag === 262144) flags[flag] = 'DM_BITSPERPEL';
    if (flag === 32768) flags[flag] = 'DM_COLLATE';
    if (flag === 2048) flags[flag] = 'DM_COLOR';
    if (flag === 256) flags[flag] = 'DM_COPIES';
    if (flag === 2) flags[flag] = 'DM_COPY';
    if (flag === 512) flags[flag] = 'DM_DEFAULTSOURCE';
    if (flag === 536870912) flags[flag] = 'DM_DISPLAYFIXEDOUTPUT';
    if (flag === 2097152) flags[flag] = 'DM_DISPLAYFLAGS';
    if (flag === 4194304) flags[flag] = 'DM_DISPLAYFREQUENCY';
    if (flag === 128) flags[flag] = 'DM_DISPLAYORIENTATION';
    if (flag === 67108864) flags[flag] = 'DM_DITHERTYPE';
    if (flag === 4096) flags[flag] = 'DM_DUPLEX';
    if (flag === 1124) flags[flag] = 'DM_FIRST';
    if (flag === 65536) flags[flag] = 'DM_FORMNAME';
    if (flag === 1024) flags[flag] = 'DM_GETDEFID';
    if (flag === 1125) flags[flag] = 'DM_GETFILEPATH';
    if (flag === 1127) flags[flag] = 'DM_GETFOLDERIDLIST';
    if (flag === 1126) flags[flag] = 'DM_GETFOLDERPATH';
    if (flag === 1124) flags[flag] = 'DM_GETSPEC';
    if (flag === 1129) flags[flag] = 'DM_HIDECONTROL';
    if (flag === 16777216) flags[flag] = 'DM_ICMINTENT';
    if (flag === 8388608) flags[flag] = 'DM_ICMMETHOD';
    if (flag === 1224) flags[flag] = 'DM_LAST';
    if (flag === 131072) flags[flag] = 'DM_LOGPIXELS';
    if (flag === 33554432) flags[flag] = 'DM_MEDIATYPE';
    if (flag === 8) flags[flag] = 'DM_MODIFY';
    if (flag === 64) flags[flag] = 'DM_NUP';
    if (flag === 1) flags[flag] = 'DM_ORIENTATION';
    if (flag === 268435456) flags[flag] = 'DM_PANNINGHEIGHT';
    if (flag === 134217728) flags[flag] = 'DM_PANNINGWIDTH';
    if (flag === 4) flags[flag] = 'DM_PAPERLENGTH';
    if (flag === 2) flags[flag] = 'DM_PAPERSIZE';
    if (flag === 8) flags[flag] = 'DM_PAPERWIDTH';
    if (flag === 1048576) flags[flag] = 'DM_PELSHEIGHT';
    if (flag === 524288) flags[flag] = 'DM_PELSWIDTH';
    if (flag === 32) flags[flag] = 'DM_POSITION';
    if (flag === 1024) flags[flag] = 'DM_PRINTQUALITY';
    if (flag === 4) flags[flag] = 'DM_PROMPT';
    if (flag === 1026) flags[flag] = 'DM_REPOSITION';
    if (flag === 16) flags[flag] = 'DM_SCALE';
    if (flag === 1128) flags[flag] = 'DM_SETCONTROLTEXT';
    if (flag === 1130) flags[flag] = 'DM_SETDEFEXT';
    if (flag === 1025) flags[flag] = 'DM_SETDEFID';
    if (flag === 1025) flags[flag] = 'DM_SPECVERSION';
    if (flag === 16384) flags[flag] = 'DM_TTOPTION';
    if (flag === 1) flags[flag] = 'DM_UPDATE';
    if (flag === 8192) flags[flag] = 'DM_YRESOLUTION';
  }
  return flags;
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
    dmFields: extractDWORD(raw_data, 40),
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
    dmFields: extractDWORD(raw_data, 72),
    dmFormName: extractWString(raw_data, 102, 32),
  };
  if (struct.dmSize + struct.dmDriverExtra != raw_data.length) {
    return;
  }

  // TODO: apply sorting order of DEVMODEW

  return struct;
}
