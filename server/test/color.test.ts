import { describe, expect, test } from '@jest/globals';

import { Color } from 'vscode-languageserver/node';

import { convertTextToColor, convertColorToNumber } from '../src/color-provider';

describe('convert text to color', () => {
  test('test red color', () => {
    // color = 0x000000FF
    expect(convertTextToColor('255')).toEqual(Color.create(1, 0, 0, 1));
  });

  test('test green color', () => {
    // color = 0x0000FF00
    expect(convertTextToColor('65280')).toEqual(Color.create(0, 1, 0, 1));
  });

  test('test blue color', () => {
    // color = 0x00FF0000
    expect(convertTextToColor('16711680')).toEqual(Color.create(0, 0, 1, 1));
  });

  test('test white color', () => {
    // color = 0x00FFFFFF
    expect(convertTextToColor('16777215')).toEqual(Color.create(1, 1, 1, 1));
  });

  test('test black color', () => {
    // color = 0x00000000
    expect(convertTextToColor('0')).toEqual(Color.create(0, 0, 0, 1));
  });

  test('test negative value', () => {
    expect(convertTextToColor('-2147483633')).toEqual(null);
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
