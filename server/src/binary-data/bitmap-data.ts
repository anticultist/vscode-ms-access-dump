import { StructMember, extractStruct } from './utils';
import { convertToDWORD } from './convert-data';

export function bitmapInfoFromRawData(raw_data?: number[]) {
  // TODO: add length check
  if (!raw_data) {
    return;
  }

  // https://learn.microsoft.com/en-us/office/vba/api/access.image.picturedata
  // https://learn.microsoft.com/en-us/windows/win32/api/wingdi/ns-wingdi-bitmapinfoheader
  // https://stackoverflow.com/questions/10792426/access-export-images-from-image-controls-in-forms
  const structDef: StructMember[] = [
    // BITMAPINFOHEADER
    ['biSize', 'DWORD'],
    ['biWidth', 'LONG'],
    ['biHeight', 'LONG'],
    ['biPlanes', 'WORD'],
    ['biBitCount', 'WORD'],
    ['biCompression', 'DWORD'],
    ['biSizeImage', 'DWORD'],
    ['biXPelsPerMeter', 'LONG'],
    ['biYPelsPerMeter', 'LONG'],
    ['biClrUsed', 'DWORD'],
    ['biClrImportant', 'DWORD'],
  ];

  const struct = extractStruct(raw_data, structDef);
  if (struct['__size__'] !== struct['biSize']) {
    return;
  }

  return struct;
}
export function bitmapAsBase64EncodedString(bitmapInfo: { [id: string]: any }, raw_data: number[]) {
  // TODO: add more checks
  if (!raw_data || !bitmapInfo || bitmapInfo['biSize'] !== 40) {
    return;
  }

  // https://en.wikipedia.org/wiki/BMP_file_format
  let bmpHeader: number[] = [];
  bmpHeader.push(...[66, 77]); // bfType: ascii string 'BM'
  bmpHeader.push(...convertToDWORD(raw_data.length)); // bfSize
  bmpHeader.push(...convertToDWORD(0)); // bfReserved
  bmpHeader.push(...convertToDWORD(14 + bitmapInfo['biSize'])); //bfOffBits
  const u8 = new Uint8Array(bmpHeader.concat(raw_data));
  const b64 = Buffer.from(u8).toString('base64');

  return b64;
}
