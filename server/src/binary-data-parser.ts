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
  const unsigned = extractWORD(raw_data, start_pos);
  const [signed] = new Int16Array([unsigned]);
  return signed;
}

/** signed, 4 bytes */
function extractLong(raw_data: number[], start_pos: number): number {
  const unsigned = extractDWORD(raw_data, start_pos);
  const [signed] = new Int32Array([unsigned]);
  return signed;
}

/** maps to unsigned short, 2 bytes */
function extractWORD(raw_data: number[], start_pos: number): number {
  const data = raw_data.slice(start_pos, start_pos + 2);
  return data[0] + (data[1] << 8);
}

/** maps to unsigned short, 4 bytes */
function extractDWORD(raw_data: number[], start_pos: number): number {
  const data = raw_data.slice(start_pos, start_pos + 4);
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

function extractPOINTL(raw_data: number[], start_pos: number) {
  return {
    x: extractLong(raw_data, start_pos),
    y: extractLong(raw_data, start_pos + 4),
  };
}

export function extractDmFieldsFlags(dmFields: number): {} {
  const flags: { [id: number]: string } = {};

  for (let bit_position = 0; bit_position < 32; ++bit_position) {
    const flag: number = 1 << bit_position;
    if ((dmFields & flag) !== flag) {
      continue;
    }

    switch (flag) {
      case 1:
        flags[flag] = 'DM_ORIENTATION';
        break;
      case 2:
        flags[flag] = 'DM_PAPERSIZE';
        break;
      case 4:
        flags[flag] = 'DM_PAPERLENGTH';
        break;
      case 8:
        flags[flag] = 'DM_PAPERWIDTH';
        break;
      case 16:
        flags[flag] = 'DM_SCALE';
        break;
      case 32:
        flags[flag] = 'DM_POSITION'; // ?
        break;
      case 64:
        flags[flag] = 'DM_NUP'; // ?
        break;
      case 128:
        flags[flag] = 'DM_DISPLAYORIENTATION'; // ?
        break;
      case 256:
        flags[flag] = 'DM_COPIES';
        break;
      case 512:
        flags[flag] = 'DM_DEFAULTSOURCE';
        break;
      case 1024:
        flags[flag] = 'DM_PRINTQUALITY';
        break;
      case 2048:
        flags[flag] = 'DM_COLOR';
        break;
      case 4096:
        flags[flag] = 'DM_DUPLEX';
        break;
      case 8192:
        flags[flag] = 'DM_YRESOLUTION';
        break;
      case 16384:
        flags[flag] = 'DM_TTOPTION';
        break;
      case 32768:
        flags[flag] = 'DM_COLLATE';
        break;
      case 65536:
        flags[flag] = 'DM_FORMNAME';
        break;
      case 131072:
        flags[flag] = 'DM_LOGPIXELS';
        break;
      case 262144:
        flags[flag] = 'DM_BITSPERPEL';
        break;
      case 524288:
        flags[flag] = 'DM_PELSWIDTH';
        break;
      case 1048576:
        flags[flag] = 'DM_PELSHEIGHT';
        break;
      case 2097152:
        flags[flag] = 'DM_DISPLAYFLAGS';
        break;
      case 4194304:
        flags[flag] = 'DM_DISPLAYFREQUENCY';
        break;
      case 8388608:
        flags[flag] = 'DM_ICMMETHOD';
        break;
      case 16777216:
        flags[flag] = 'DM_ICMINTENT';
        break;
      case 33554432:
        flags[flag] = 'DM_MEDIATYPE';
        break;
      case 67108864:
        flags[flag] = 'DM_DITHERTYPE';
        break;
      case 134217728:
        flags[flag] = 'DM_PANNINGWIDTH';
        break;
      case 268435456:
        flags[flag] = 'DM_PANNINGHEIGHT';
        break;
      case 536870912:
        flags[flag] = 'DM_DISPLAYFIXEDOUTPUT'; // ?
        break;
      default:
        flags[flag] = '???';
    }
  }
  return flags;
}

export type DevMode = {
  dmDeviceName: string;
  dmSpecVersion: number;
  dmDriverVersion: number;
  dmSize: number;
  dmDriverExtra: number;
  dmFields: number;
  DUMMYUNIONNAME: {
    DUMMYSTRUCTNAME: {
      dmOrientation: number;
      dmPaperSize: number;
      dmPaperLength: number;
      dmPaperWidth: number;
      dmScale: number;
      dmCopies: number;
      dmDefaultSource: number;
      dmPrintQuality: number;
    };
    DUMMYSTRUCTNAME2: {
      dmPosition: {
        x: number;
        y: number;
      };
      dmDisplayOrientation: number;
      dmDisplayFixedOutput: number;
    };
  };
  dmColor: number;
  dmDuplex: number;
  dmYResolution: number;
  dmTTOption: number;
  dmCollate: number;
  dmFormName: string;
  dmLogPixels: number;
  dmBitsPerPel: number;
  dmPelsWidth: number;
  dmPelsHeight: number;
  DUMMYUNIONNAME2: {
    dmDisplayFlags: number;
    dmNup: number;
  };
  dmDisplayFrequency: number;
  dmICMMethod: number;
  dmICMIntent: number;
  dmMediaType: number;
  dmDitherType: number;
  dmReserved1: number;
  dmReserved2: number;
  dmPanningWidth: number;
  dmPanningHeight: number;
};

/**
 * - [DEVMODEA](https://learn.microsoft.com/en-us/windows/win32/api/wingdi/ns-wingdi-devmodea)
 */
export function prtDevModeFromHexValues(hex_values: string[]): DevMode | undefined {
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
    DUMMYUNIONNAME: {
      DUMMYSTRUCTNAME: {
        dmOrientation: extractShort(raw_data, 44),
        dmPaperSize: extractShort(raw_data, 46),
        dmPaperLength: extractShort(raw_data, 48),
        dmPaperWidth: extractShort(raw_data, 50),
        dmScale: extractShort(raw_data, 52),
        dmCopies: extractShort(raw_data, 54),
        dmDefaultSource: extractShort(raw_data, 56),
        dmPrintQuality: extractShort(raw_data, 58),
      },
      DUMMYSTRUCTNAME2: {
        dmPosition: extractPOINTL(raw_data, 44),
        dmDisplayOrientation: extractDWORD(raw_data, 52),
        dmDisplayFixedOutput: extractDWORD(raw_data, 56),
      },
    },
    dmColor: extractShort(raw_data, 60),
    dmDuplex: extractShort(raw_data, 62),
    dmYResolution: extractShort(raw_data, 64),
    dmTTOption: extractShort(raw_data, 66),
    dmCollate: extractShort(raw_data, 78),
    dmFormName: extractString(raw_data, 70, 32),
    dmLogPixels: extractWORD(raw_data, 102),
    dmBitsPerPel: extractDWORD(raw_data, 104),
    dmPelsWidth: extractDWORD(raw_data, 108),
    dmPelsHeight: extractDWORD(raw_data, 112),
    DUMMYUNIONNAME2: {
      dmDisplayFlags: extractDWORD(raw_data, 116),
      dmNup: extractDWORD(raw_data, 116),
    },
    dmDisplayFrequency: extractDWORD(raw_data, 120),
    dmICMMethod: extractDWORD(raw_data, 124),
    dmICMIntent: extractDWORD(raw_data, 128),
    dmMediaType: extractDWORD(raw_data, 132),
    dmDitherType: extractDWORD(raw_data, 136),
    dmReserved1: extractDWORD(raw_data, 140),
    dmReserved2: extractDWORD(raw_data, 144),
    dmPanningWidth: extractDWORD(raw_data, 148),
    dmPanningHeight: extractDWORD(raw_data, 152),
  };
  if (struct.dmSize + struct.dmDriverExtra != raw_data.length) {
    return;
  }

  return struct;
}

/**
 * - [DEVMODEW](https://learn.microsoft.com/en-us/windows/win32/api/wingdi/ns-wingdi-devmodew)
 */
export function prtDevModeWFromHexValues(hex_values: string[]): DevMode | undefined {
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
    DUMMYUNIONNAME: {
      DUMMYSTRUCTNAME: {
        dmOrientation: extractShort(raw_data, 76),
        dmPaperSize: extractShort(raw_data, 78),
        dmPaperLength: extractShort(raw_data, 80),
        dmPaperWidth: extractShort(raw_data, 82),
        dmScale: extractShort(raw_data, 84),
        dmCopies: extractShort(raw_data, 86),
        dmDefaultSource: extractShort(raw_data, 88),
        dmPrintQuality: extractShort(raw_data, 90),
      },
      DUMMYSTRUCTNAME2: {
        dmPosition: extractPOINTL(raw_data, 76),
        dmDisplayOrientation: extractDWORD(raw_data, 84),
        dmDisplayFixedOutput: extractDWORD(raw_data, 88),
      },
    },
    dmColor: extractShort(raw_data, 92),
    dmDuplex: extractShort(raw_data, 94),
    dmYResolution: extractShort(raw_data, 96),
    dmTTOption: extractShort(raw_data, 98),
    dmCollate: extractShort(raw_data, 100),
    dmFormName: extractWString(raw_data, 102, 32),
    dmLogPixels: extractWORD(raw_data, 166),
    dmBitsPerPel: extractDWORD(raw_data, 168),
    dmPelsWidth: extractDWORD(raw_data, 172),
    dmPelsHeight: extractDWORD(raw_data, 176),
    DUMMYUNIONNAME2: {
      dmDisplayFlags: extractDWORD(raw_data, 180),
      dmNup: extractDWORD(raw_data, 180),
    },
    dmDisplayFrequency: extractDWORD(raw_data, 184),
    dmICMMethod: extractDWORD(raw_data, 188),
    dmICMIntent: extractDWORD(raw_data, 192),
    dmMediaType: extractDWORD(raw_data, 196),
    dmDitherType: extractDWORD(raw_data, 200),
    dmReserved1: extractDWORD(raw_data, 204),
    dmReserved2: extractDWORD(raw_data, 208),
    dmPanningWidth: extractDWORD(raw_data, 212),
    dmPanningHeight: extractDWORD(raw_data, 216),
  };
  if (struct.dmSize + struct.dmDriverExtra != raw_data.length) {
    return;
  }

  return struct;
}
