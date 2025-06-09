export function convertToShort(value: number): number[] {
  const int16 = value & 0xffff;
  return [int16 & 0xff, (int16 >> 8) & 0xff];
}

export function convertToDWORD(value: number, num_bytes: number = 4): number[] {
  let data: number[] = [];

  for (let idx = 0; idx < num_bytes; idx++) {
    data.push(value & 0xff);
    value = value >> 8;
  }

  return data;
}

export function convertToWORD(value: number): number[] {
  return convertToDWORD(value, 2);
}

export function convertToString(value: string, wstring: boolean, strLength: number = 32): number[] {
  const raw_data: number[] = [];
  if (wstring) {
    for (let i = 0; i < value.length; i++) {
      const charCode = value.charCodeAt(i);
      raw_data.push(charCode & 0xff);
      raw_data.push((charCode >> 8) & 0xff);
    }
    // Pad with (strLength - value.length) * 2 zero bytes for wide strings
    raw_data.push(...new Array((strLength - value.length) * 2).fill(0));
  } else {
    raw_data.push(...value.split('').map((c) => c.charCodeAt(0)));
    // Pad with strLength - value.length zero bytes for regular strings
    raw_data.push(...new Array(strLength - value.length).fill(0));
  }
  return raw_data;
}
