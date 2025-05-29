import { describe, expect, test } from '@jest/globals';

import {
  extractDWORD,
  extractLong,
  extractPOINTL,
  extractRGBQUAD,
  extractShort,
  extractString,
  extractWORD,
  extractWString,
} from '../src/extract-data';

describe('extractDWORD', () => {
  test('extract number from DWORD', () => {
    // 1 + (2 << 8) + (4 << 16) + (8 << 24) = 134480385
    expect(extractDWORD([1, 2, 4, 8], 0)).toEqual(134480385);
  });

  test('extract max number from DWORD', () => {
    expect(extractDWORD([255, 255, 255, 255], 0)).toEqual(4294967295);
  });
});

describe('extractShort', () => {
  test('extracts positive short', () => {
    // 0x1234 = 4660
    expect(extractShort([0x34, 0x12], 0)).toBe(4660);
  });

  test('extracts zero', () => {
    expect(extractShort([0x00, 0x00], 0)).toBe(0);
  });

  test('extracts negative short', () => {
    // 0xFFFF = -1 in signed 16-bit
    expect(extractShort([0xff, 0xff], 0)).toBe(-1);
  });

  test('extracts minimum 16-bit signed value', () => {
    // 0x8000 = -32768
    expect(extractShort([0x00, 0x80], 0)).toBe(-32768);
  });

  test('extracts maximum 16-bit signed value', () => {
    // 0x7FFF = 32767
    expect(extractShort([0xff, 0x7f], 0)).toBe(32767);
  });
});

describe('extractLong', () => {
  test('extracts positive long', () => {
    // 0x12345678 = 305419896
    expect(extractLong([0x78, 0x56, 0x34, 0x12], 0)).toBe(305419896);
  });

  test('extracts zero', () => {
    expect(extractLong([0x00, 0x00, 0x00, 0x00], 0)).toBe(0);
  });

  test('extracts negative long', () => {
    // 0xFFFFFFFF = -1 in signed 32-bit
    expect(extractLong([0xff, 0xff, 0xff, 0xff], 0)).toBe(-1);
  });

  test('extracts minimum 32-bit signed value', () => {
    // 0x80000000 = -2147483648
    expect(extractLong([0x00, 0x00, 0x00, 0x80], 0)).toBe(-2147483648);
  });

  test('extracts maximum 32-bit signed value', () => {
    // 0x7FFFFFFF = 2147483647
    expect(extractLong([0xff, 0xff, 0xff, 0x7f], 0)).toBe(2147483647);
  });
});

describe('extractWORD', () => {
  test('extracts positive word', () => {
    // 0x1234 = 4660
    expect(extractWORD([0x34, 0x12], 0)).toBe(4660);
  });

  test('extracts zero', () => {
    expect(extractWORD([0x00, 0x00], 0)).toBe(0);
  });

  test('extracts max unsigned word', () => {
    // 0xFFFF = 65535
    expect(extractWORD([0xff, 0xff], 0)).toBe(65535);
  });
});

describe('extractString', () => {
  test('extracts ASCII string with no null terminator', () => {
    // 'ABC' = [65, 66, 67]
    expect(extractString([65, 66, 67], 0, 3)).toBe('ABC');
  });

  test('extracts string with null terminator in middle', () => {
    // 'A\0BC' = [65, 0, 66, 67]
    expect(extractString([65, 0, 66, 67], 0, 4)).toBe('A');
  });

  test('extracts string with null terminator at end', () => {
    // 'ABC\0' = [65, 66, 67, 0]
    expect(extractString([65, 66, 67, 0], 0, 4)).toBe('ABC');
  });

  test('extracts empty string if first is null', () => {
    expect(extractString([0, 66, 67], 0, 3)).toBe('');
  });

  test('extracts substring from offset', () => {
    // [0, 0, 65, 66, 67, 0] offset 2, len 4 => 'ABC'
    expect(extractString([0, 0, 65, 66, 67, 0], 2, 4)).toBe('ABC');
  });
});

describe('extractWString', () => {
  test('extracts wide string with no null terminator', () => {
    // 'ABC' = [65,0, 66,0, 67,0]
    expect(extractWString([65, 0, 66, 0, 67, 0], 0, 3)).toBe('ABC');
  });

  test('extracts wide string with null terminator in middle', () => {
    // 'A\0BC' = [65,0, 0,0, 66,0, 67,0]
    expect(extractWString([65, 0, 0, 0, 66, 0, 67, 0], 0, 4)).toBe('A');
  });

  test('extracts wide string with null terminator at end', () => {
    // 'ABC\0' = [65,0, 66,0, 67,0, 0,0]
    expect(extractWString([65, 0, 66, 0, 67, 0, 0, 0], 0, 4)).toBe('ABC');
  });

  test('extracts empty string if first is null', () => {
    expect(extractWString([0, 0, 66, 0, 67, 0], 0, 3)).toBe('');
  });

  test('extracts substring from offset', () => {
    // [0,0, 0,0, 65,0, 66,0, 67,0, 0,0] offset 4, len 4 => 'ABC'
    expect(extractWString([0, 0, 0, 0, 65, 0, 66, 0, 67, 0, 0, 0], 4, 4)).toBe('ABC');
  });
});
