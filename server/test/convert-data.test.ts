import { describe, expect, test } from '@jest/globals';

import { convertToDWORD, convertToWORD } from '../src/convert-data';

describe('convertToDWORD', () => {
  test('convert number into DWORD', () => {
    // 1 + (2 << 8) + (4 << 16) + (8 << 24) = 134480385
    expect(convertToDWORD(134480385)).toEqual([1, 2, 4, 8]);
  });

  test('convert max number into DWORD', () => {
    expect(convertToDWORD(4294967295)).toEqual([255, 255, 255, 255]);
  });
});
