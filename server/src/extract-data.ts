/** signed, 2 bytes */
export function extractShort(raw_data: number[], start_pos: number): number {
  const unsigned = extractWORD(raw_data, start_pos);
  const [signed] = new Int16Array([unsigned]);
  return signed;
}

/** maps to unsigned short, 2 bytes */
export function extractWORD(raw_data: number[], start_pos: number): number {
  const data = raw_data.slice(start_pos, start_pos + 2);
  return data[0] + (data[1] << 8);
}

/** 1 byte */
export function extractBYTE(raw_data: number[], start_pos: number) {
  return raw_data[start_pos];
}

/** maps to unsigned short, 4 bytes */
export function extractDWORD(raw_data: number[], start_pos: number): number {
  const data = raw_data.slice(start_pos, start_pos + 4);
  // NOTE: `>>> 0` is the unsigned right shift by 0 bits,
  // which converts the signed integer to an unsigned integer.
  return (data[0] + (data[1] << 8) + (data[2] << 16) + (data[3] << 24)) >>> 0;
}

/** signed, 4 bytes */
export function extractLong(raw_data: number[], start_pos: number): number {
  const unsigned = extractDWORD(raw_data, start_pos);
  const [signed] = new Int32Array([unsigned]);
  return signed;
}

export function extractString(raw_data: number[], start_pos: number, num_char: number): string {
  const string_data = raw_data.slice(start_pos, start_pos + num_char);
  const end_idx = string_data.findIndex((elem) => elem === 0);
  return String.fromCharCode(...string_data.slice(0, end_idx !== -1 ? end_idx : undefined));
}

export function extractWString(raw_data: number[], start_pos: number, num_char: number): string {
  let string_data: number[] = [];
  for (let char_idx = 0; char_idx < num_char; ++char_idx) {
    string_data.push(extractWORD(raw_data, start_pos + char_idx * 2));
  }
  const end_idx = string_data.findIndex((elem) => elem === 0);
  return String.fromCharCode(...string_data.slice(0, end_idx !== -1 ? end_idx : undefined));
}

/** contains two long values, 8 bytes */
export function extractPOINTL(raw_data: number[], start_pos: number) {
  return {
    x: extractLong(raw_data, start_pos),
    y: extractLong(raw_data, start_pos + 4),
  };
}

/** 4 bytes */
export function extractRGBQUAD(raw_data: number[], start_pos: number) {
  return {
    rgbBlue: extractBYTE(raw_data, start_pos),
    rgbGreen: extractBYTE(raw_data, start_pos + 1),
    rgbRed: extractBYTE(raw_data, start_pos + 2),
    rgbReserved: extractBYTE(raw_data, start_pos + 3),
  };
}
