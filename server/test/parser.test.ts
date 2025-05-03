import { describe, expect, test } from '@jest/globals';

import { Parser, Language } from 'web-tree-sitter';
import * as path from 'path';
import { readFileSync } from 'fs';

describe('convert text to color', () => {
  test('test parser', async () => {
    // read the WebAssembly module as a buffer
    const wasmBuffer = readFileSync(
      path.resolve(__dirname, '..', 'tree-sitter-ms_access_dump.wasm'),
    );

    await Parser.init();
    const parser = new Parser();
    const MyLang = await Language.load(wasmBuffer);
    parser.setLanguage(MyLang);

    const exampleForm = readFileSync(
      path.resolve(__dirname, '..', '..', 'sample_project', 'source', 'forms', 'Example.form'),
      'utf8',
    );
    const tree = parser.parse(exampleForm);
    expect(tree?.rootNode.type).toEqual('dump');
  });
});
