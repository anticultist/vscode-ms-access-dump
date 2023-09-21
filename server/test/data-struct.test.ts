import { describe, expect, test } from '@jest/globals';

import { convertToDWORD, extractDWORD } from '../src/binary-data-parser';

describe('handling data structures', () => {
  test('convert number into DWORD', () => {
    // 1 + (2 << 8) + (4 << 16) + (8 << 24) = 134480385
    expect(convertToDWORD(134480385)).toEqual([1, 2, 4, 8]);
  });

  test('extract number from DWORD', () => {
    // 1 + (2 << 8) + (4 << 16) + (8 << 24) = 134480385
    expect(extractDWORD([1, 2, 4, 8], 0)).toEqual(134480385);
  });
});
