import { describe, expect, test } from '@jest/globals';

import { convertToDWORD, extractDWORD } from '../src/binary-data-parser';

describe('handling data structures', () => {
  test('convert number into DWORD', () => {
    // 1 + (2 << 8) + (4 << 16) + (8 << 24) = 134480385
    expect(convertToDWORD(134480385)).toEqual([1, 2, 4, 8]);
  });

  test('convert max number into DWORD', () => {
    expect(convertToDWORD(4294967295)).toEqual([255, 255, 255, 255]);
  });

  test('extract number from DWORD', () => {
    // 1 + (2 << 8) + (4 << 16) + (8 << 24) = 134480385
    expect(extractDWORD([1, 2, 4, 8], 0)).toEqual(134480385);
  });

  test('extract max number from DWORD', () => {
    expect(extractDWORD([255, 255, 255, 255], 0)).toEqual(4294967295);
  });
});
