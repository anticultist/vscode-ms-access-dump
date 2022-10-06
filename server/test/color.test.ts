import { describe, expect, test } from '@jest/globals';

import { Color } from 'vscode-languageserver/node';

import { convertTextToColor } from '../src/color-provider';

describe('convert text to color', () => {
  test('test fake values', () => {
    expect(convertTextToColor('')).toEqual(Color.create(1, 0, 0, 1));
  });
});
