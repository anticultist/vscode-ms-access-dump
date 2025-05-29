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
