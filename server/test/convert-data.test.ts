import { describe, expect, test } from '@jest/globals';

import {
  convertToDWORD,
  convertToWORD,
  convertToString,
  convertToWString,
  convertToShort,
} from '../src/binary-data/convert-data';

describe('convertToDWORD', () => {
  test('convert number into DWORD', () => {
    // 1 + (2 << 8) + (4 << 16) + (8 << 24) = 134480385
    expect(convertToDWORD(134480385)).toEqual([1, 2, 4, 8]);
  });

  test('convert max number into DWORD', () => {
    expect(convertToDWORD(4294967295)).toEqual([255, 255, 255, 255]);
  });
});

describe('convertToString', () => {
  test('convert ansi string into number array', () => {
    expect(convertToString('test', 10)).toEqual([116, 101, 115, 116, 0, 0, 0, 0, 0, 0]);
  });
});

describe('convertToWString', () => {
  test('convert wide string into number array', () => {
    expect(convertToWString('test', 5)).toEqual([116, 0, 101, 0, 115, 0, 116, 0, 0, 0]);
  });
});
