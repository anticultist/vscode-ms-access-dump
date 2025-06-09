import {
  extractString,
  extractWORD,
  extractDWORD,
  extractShort,
  extractPOINTL,
  extractWString,
} from './extract-data';
import { convertToDWORD, convertToWORD, convertToShort, convertToString } from './convert-data';

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

export const devModeConstants: { [id: string]: { [id: number | string]: string } } = {
  dmCollate: {
    0: 'DMCOLLATE_FALSE',
    1: 'DMCOLLATE_TRUE',
  },
  dmColor: {
    1: 'DMCOLOR_MONOCHROME',
    2: 'DMCOLOR_COLOR',
  },
  dmDefaultSource: {
    // 1: 'DMBIN_ONLYONE',
    1: 'DMBIN_UPPER',
    2: 'DMBIN_LOWER',
    3: 'DMBIN_MIDDLE',
    4: 'DMBIN_MANUAL',
    5: 'DMBIN_ENVELOPE',
    6: 'DMBIN_ENVMANUAL',
    7: 'DMBIN_AUTO',
    8: 'DMBIN_TRACTOR',
    9: 'DMBIN_SMALLFMT',
    10: 'DMBIN_LARGEFMT',
    11: 'DMBIN_LARGECAPACITY',
    14: 'DMBIN_CASSETTE',
    15: 'DMBIN_FORMSOURCE',
    256: 'DMBIN_USER',
  },
  dmDisplayOrientation: {
    0: 'DMDO_DEFAULT',
    1: 'DMDO_90',
    2: 'DMDO_180',
    3: 'DMDO_270',
  },
  dmDitherType: {
    1: 'DMDITHER_NONE',
    2: 'DMDITHER_COARSE',
    3: 'DMDITHER_FINE',
    4: 'DMDITHER_LINEART',
    5: 'DMDITHER_ERRORDIFFUSION',
    6: 'DMDITHER_RESERVED6',
    7: 'DMDITHER_RESERVED7',
    8: 'DMDITHER_RESERVED8',
    9: 'DMDITHER_RESERVED9',
    10: 'DMDITHER_GRAYSCALE',
    256: 'DMDITHER_USER',
  },
  dmDuplex: {
    1: 'DMDUP_SIMPLEX',
    2: 'DMDUP_VERTICAL',
    3: 'DMDUP_HORIZONTAL',
  },
  dmICMIntent: {
    1: 'DMICM_SATURATE',
    2: 'DMICM_CONTRAST',
    3: 'DMICM_COLORIMETRIC',
    4: 'DMICM_ABS_COLORIMETRIC',
    256: 'DMICM_USER',
  },
  dmICMMethod: {
    1: 'DMICMMETHOD_NONE',
    2: 'DMICMMETHOD_SYSTEM',
    3: 'DMICMMETHOD_DRIVER',
    4: 'DMICMMETHOD_DEVICE',
    256: 'DMICMMETHOD_USER',
  },
  dmMediaType: {
    1: 'DMMEDIA_STANDARD',
    2: 'DMMEDIA_TRANSPARENCY',
    3: 'DMMEDIA_GLOSSY',
    256: 'DMMEDIA_USER',
  },
  dmNup: {
    1: 'DMNUP_SYSTEM',
    2: 'DMNUP_ONEUP',
  },
  dmOrientation: {
    1: 'DMORIENT_PORTRAIT',
    2: 'DMORIENT_LANDSCAPE',
  },
  dmPaperSize: {
    1: 'DMPAPER_LETTER',
    2: 'DMPAPER_LETTERSMALL',
    3: 'DMPAPER_TABLOID',
    4: 'DMPAPER_LEDGER',
    5: 'DMPAPER_LEGAL',
    6: 'DMPAPER_STATEMENT',
    7: 'DMPAPER_EXECUTIVE',
    8: 'DMPAPER_A3',
    9: 'DMPAPER_A4',
    10: 'DMPAPER_A4SMALL',
    11: 'DMPAPER_A5',
    12: 'DMPAPER_B4',
    13: 'DMPAPER_B5',
    14: 'DMPAPER_FOLIO',
    15: 'DMPAPER_QUARTO',
    16: 'DMPAPER_10X14',
    17: 'DMPAPER_11X17',
    18: 'DMPAPER_NOTE',
    19: 'DMPAPER_ENV_9',
    20: 'DMPAPER_ENV_10',
    21: 'DMPAPER_ENV_11',
    22: 'DMPAPER_ENV_12',
    23: 'DMPAPER_ENV_14',
    24: 'DMPAPER_CSHEET',
    25: 'DMPAPER_DSHEET',
    26: 'DMPAPER_ESHEET',
    27: 'DMPAPER_ENV_DL',
    28: 'DMPAPER_ENV_C5',
    29: 'DMPAPER_ENV_C3',
    30: 'DMPAPER_ENV_C4',
    31: 'DMPAPER_ENV_C6',
    32: 'DMPAPER_ENV_C65',
    33: 'DMPAPER_ENV_B4',
    34: 'DMPAPER_ENV_B5',
    35: 'DMPAPER_ENV_B6',
    36: 'DMPAPER_ENV_ITALY',
    37: 'DMPAPER_ENV_MONARCH',
    38: 'DMPAPER_ENV_PERSONAL',
    39: 'DMPAPER_FANFOLD_US',
    40: 'DMPAPER_FANFOLD_STD_GERMAN',
    41: 'DMPAPER_FANFOLD_LGL_GERMAN',
    42: 'DMPAPER_ISO_B4',
    43: 'DMPAPER_JAPANESE_POSTCARD',
    44: 'DMPAPER_9X11',
    45: 'DMPAPER_10X11',
    46: 'DMPAPER_15X11',
    47: 'DMPAPER_ENV_INVITE',
    48: 'DMPAPER_RESERVED_48',
    49: 'DMPAPER_RESERVED_49',
    50: 'DMPAPER_LETTER_EXTRA',
    51: 'DMPAPER_LEGAL_EXTRA',
    52: 'DMPAPER_TABLOID_EXTRA',
    53: 'DMPAPER_A4_EXTRA',
    54: 'DMPAPER_LETTER_TRANSVERSE',
    55: 'DMPAPER_A4_TRANSVERSE',
    56: 'DMPAPER_LETTER_EXTRA_TRANSVERSE',
    57: 'DMPAPER_A_PLUS',
    58: 'DMPAPER_B_PLUS',
    59: 'DMPAPER_LETTER_PLUS',
    60: 'DMPAPER_A4_PLUS',
    61: 'DMPAPER_A5_TRANSVERSE',
    62: 'DMPAPER_B5_TRANSVERSE',
    63: 'DMPAPER_A3_EXTRA',
    64: 'DMPAPER_A5_EXTRA',
    65: 'DMPAPER_B5_EXTRA',
    66: 'DMPAPER_A2',
    67: 'DMPAPER_A3_TRANSVERSE',
    68: 'DMPAPER_A3_EXTRA_TRANSVERSE',
    69: 'DMPAPER_DBL_JAPANESE_POSTCARD',
    70: 'DMPAPER_A6',
    71: 'DMPAPER_JENV_KAKU2',
    72: 'DMPAPER_JENV_KAKU3',
    73: 'DMPAPER_JENV_CHOU3',
    74: 'DMPAPER_JENV_CHOU4',
    75: 'DMPAPER_LETTER_ROTATED',
    76: 'DMPAPER_A3_ROTATED',
    77: 'DMPAPER_A4_ROTATED',
    78: 'DMPAPER_A5_ROTATED',
    79: 'DMPAPER_B4_JIS_ROTATED',
    80: 'DMPAPER_B5_JIS_ROTATED',
    81: 'DMPAPER_JAPANESE_POSTCARD_ROTATED',
    82: 'DMPAPER_DBL_JAPANESE_POSTCARD_ROTATED',
    83: 'DMPAPER_A6_ROTATED',
    84: 'DMPAPER_JENV_KAKU2_ROTATED',
    85: 'DMPAPER_JENV_KAKU3_ROTATED',
    86: 'DMPAPER_JENV_CHOU3_ROTATED',
    87: 'DMPAPER_JENV_CHOU4_ROTATED',
    88: 'DMPAPER_B6_JIS',
    89: 'DMPAPER_B6_JIS_ROTATED',
    90: 'DMPAPER_12X11',
    91: 'DMPAPER_JENV_YOU4',
    92: 'DMPAPER_JENV_YOU4_ROTATED',
    93: 'DMPAPER_P16K',
    94: 'DMPAPER_P32K',
    95: 'DMPAPER_P32KBIG',
    96: 'DMPAPER_PENV_1',
    97: 'DMPAPER_PENV_2',
    98: 'DMPAPER_PENV_3',
    99: 'DMPAPER_PENV_4',
    100: 'DMPAPER_PENV_5',
    101: 'DMPAPER_PENV_6',
    102: 'DMPAPER_PENV_7',
    103: 'DMPAPER_PENV_8',
    104: 'DMPAPER_PENV_9',
    105: 'DMPAPER_PENV_10',
    106: 'DMPAPER_P16K_ROTATED',
    107: 'DMPAPER_P32K_ROTATED',
    108: 'DMPAPER_P32KBIG_ROTATED',
    109: 'DMPAPER_PENV_1_ROTATED',
    110: 'DMPAPER_PENV_2_ROTATED',
    111: 'DMPAPER_PENV_3_ROTATED',
    112: 'DMPAPER_PENV_4_ROTATED',
    113: 'DMPAPER_PENV_5_ROTATED',
    114: 'DMPAPER_PENV_6_ROTATED',
    115: 'DMPAPER_PENV_7_ROTATED',
    116: 'DMPAPER_PENV_8_ROTATED',
    117: 'DMPAPER_PENV_9_ROTATED',
    118: 'DMPAPER_PENV_10_ROTATED',
    256: 'DMPAPER_USER',
  },
  dmPrintQuality: {
    '-1': 'DMRES_DRAFT',
    '-4': 'DMRES_HIGH',
    '-2': 'DMRES_LOW',
    '-3': 'DMRES_MEDIUM',
  },
  dmTTOption: {
    1: 'DMTT_BITMAP',
    2: 'DMTT_DOWNLOAD',
    4: 'DMTT_DOWNLOAD_OUTLINE',
    3: 'DMTT_SUBDEV',
  },
};

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
  _driverData: number[] | undefined;
};

/**
 * - [DEVMODEA](https://learn.microsoft.com/en-us/windows/win32/api/wingdi/ns-wingdi-devmodea)
 */
export function prtDevModeFromRawData(raw_data?: number[]): DevMode | undefined {
  if (!raw_data || raw_data.length < 156) {
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
    dmCollate: extractShort(raw_data, 68),
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
    _driverData: raw_data.slice(156),
  };
  if (struct.dmSize + struct.dmDriverExtra !== raw_data.length) {
    return;
  }

  return struct;
}

/**
 * - [DEVMODEW](https://learn.microsoft.com/en-us/windows/win32/api/wingdi/ns-wingdi-devmodew)
 */
export function prtDevModeWFromRawData(raw_data?: number[]): DevMode | undefined {
  if (!raw_data || raw_data.length < 220) {
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
    _driverData: raw_data.slice(220),
  };
  if (struct.dmSize + struct.dmDriverExtra !== raw_data.length) {
    return;
  }

  return struct;
}

export function prtDevModeToRawData(struct: DevMode, wstring: boolean): number[] {
  const raw_data: number[] = [];

  raw_data.push(...convertToString(struct.dmDeviceName, wstring));
  raw_data.push(...convertToWORD(struct.dmSpecVersion));
  raw_data.push(...convertToWORD(struct.dmDriverVersion));
  raw_data.push(...convertToWORD(struct.dmSize));
  raw_data.push(...convertToWORD(struct.dmDriverExtra));
  raw_data.push(...convertToDWORD(struct.dmFields));
  raw_data.push(...convertToShort(struct.DUMMYUNIONNAME.DUMMYSTRUCTNAME.dmOrientation));
  raw_data.push(...convertToShort(struct.DUMMYUNIONNAME.DUMMYSTRUCTNAME.dmPaperSize));
  raw_data.push(...convertToShort(struct.DUMMYUNIONNAME.DUMMYSTRUCTNAME.dmPaperLength));
  raw_data.push(...convertToShort(struct.DUMMYUNIONNAME.DUMMYSTRUCTNAME.dmPaperWidth));
  raw_data.push(...convertToShort(struct.DUMMYUNIONNAME.DUMMYSTRUCTNAME.dmScale));
  raw_data.push(...convertToShort(struct.DUMMYUNIONNAME.DUMMYSTRUCTNAME.dmCopies));
  raw_data.push(...convertToShort(struct.DUMMYUNIONNAME.DUMMYSTRUCTNAME.dmDefaultSource));
  raw_data.push(...convertToShort(struct.DUMMYUNIONNAME.DUMMYSTRUCTNAME.dmPrintQuality));
  raw_data.push(...convertToShort(struct.dmColor));
  raw_data.push(...convertToShort(struct.dmDuplex));
  raw_data.push(...convertToShort(struct.dmYResolution));
  raw_data.push(...convertToShort(struct.dmTTOption));
  raw_data.push(...convertToShort(struct.dmCollate));
  raw_data.push(...convertToString(struct.dmFormName, wstring));
  raw_data.push(...convertToWORD(struct.dmLogPixels));
  raw_data.push(...convertToDWORD(struct.dmBitsPerPel));
  raw_data.push(...convertToDWORD(struct.dmPelsWidth));
  raw_data.push(...convertToDWORD(struct.dmPelsHeight));
  raw_data.push(...convertToDWORD(struct.DUMMYUNIONNAME2.dmDisplayFlags));
  raw_data.push(...convertToDWORD(struct.dmDisplayFrequency));
  raw_data.push(...convertToDWORD(struct.dmICMMethod));
  raw_data.push(...convertToDWORD(struct.dmICMIntent));
  raw_data.push(...convertToDWORD(struct.dmMediaType));
  raw_data.push(...convertToDWORD(struct.dmDitherType));
  raw_data.push(...convertToDWORD(struct.dmReserved1));
  raw_data.push(...convertToDWORD(struct.dmReserved2));
  raw_data.push(...convertToDWORD(struct.dmPanningWidth));
  raw_data.push(...convertToDWORD(struct.dmPanningHeight));

  if (struct._driverData) {
    raw_data.push(...struct._driverData);
  }

  return raw_data;
}
