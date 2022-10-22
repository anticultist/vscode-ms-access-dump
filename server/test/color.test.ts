import { describe, expect, test } from '@jest/globals';

import { Color } from 'vscode-languageserver/node';

import { convertTextToColor } from '../src/color-provider';

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
    expect(convertTextToColor('-2147483633')).toEqual(Color.create(15 / 255, 0, 0, 1));
  });
});
