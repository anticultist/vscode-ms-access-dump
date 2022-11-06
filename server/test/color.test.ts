import { describe, expect, test } from '@jest/globals';

import { Color } from 'vscode-languageserver/node';

import { convertTextToColor, convertColorToNumber } from '../src/color-provider';

describe('convert text to color', () => {
  test('test red color', () => {
    expect(convertTextToColor((0x000000ff).toString())).toEqual(Color.create(1, 0, 0, 1));
  });

  test('test green color', () => {
    expect(convertTextToColor((0x0000ff00).toString())).toEqual(Color.create(0, 1, 0, 1));
  });

  test('test blue color', () => {
    expect(convertTextToColor((0x00ff0000).toString())).toEqual(Color.create(0, 0, 1, 1));
  });

  test('test white color', () => {
    expect(convertTextToColor((0x00ffffff).toString())).toEqual(Color.create(1, 1, 1, 1));
  });

  test('test black color', () => {
    expect(convertTextToColor((0x00000000).toString())).toEqual(Color.create(0, 0, 0, 1));
  });

  test('test big negative value', () => {
    expect(convertTextToColor('-2147483633')).toEqual(null);
  });

  test('test negative value', () => {
    expect(convertTextToColor('-1')).toEqual(null);
  });

  test('test value out of range', () => {
    expect(convertTextToColor((0x1000000).toString())).toEqual(null);
  });

  test('test invalid value', () => {
    expect(convertTextToColor('invalid')).toEqual(null);
  });

  test('test float number', () => {
    expect(convertTextToColor('1.0')).toEqual(null);
  });

  test('test number with text at the end', () => {
    expect(convertTextToColor('1abc')).toEqual(null);
  });
});

describe('convert color to number', () => {
  test('test red color', () => {
    expect(convertColorToNumber(Color.create(1, 0, 0, 1))).toEqual(0x000000ff);
  });

  test('test green color', () => {
    expect(convertColorToNumber(Color.create(0, 1, 0, 1))).toEqual(0x0000ff00);
  });

  test('test blue color', () => {
    expect(convertColorToNumber(Color.create(0, 0, 1, 1))).toEqual(0x00ff0000);
  });

  test('test white color', () => {
    expect(convertColorToNumber(Color.create(1, 1, 1, 1))).toEqual(0x00ffffff);
  });

  test('test black color', () => {
    expect(convertColorToNumber(Color.create(0, 0, 0, 1))).toEqual(0x00000000);
  });

  // test('circular test', () => {
  //   // const color = -2147483609;
  //   // const color = -2147483633;
  //   const color = -2147483643;
  //   expect(convertColorToNumber(convertTextToColor(color.toString()))).toEqual(color);
  // });
});
