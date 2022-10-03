import * as assert from 'assert';
import * as path from 'path';
import * as vscode from 'vscode';

const timeout = async (ms = 200) => new Promise((resolve) => setTimeout(resolve, ms));

suite('Extension Test Suite', () => {
  test('Document symbols', async () => {
    const docUri = getExampleFileDocUri('MyForm.form');
    assert.notStrictEqual(docUri, undefined);

    await vscode.commands.executeCommand('vscode.open', docUri);

    const extension = vscode.extensions.getExtension(
      'anticultist.ms-access-dump-format',
    ) as vscode.Extension<any>;
    await extension.activate();
    assert.strictEqual(extension.isActive, true);

    await timeout(1500); // TODO: replace this

    const symbols: vscode.DocumentSymbol[] = await vscode.commands.executeCommand(
      'vscode.executeDocumentSymbolProvider',
      docUri,
    );
    assert.notStrictEqual(symbols, undefined);
    assert.notStrictEqual(symbols.length, 0);
    assert.strictEqual(symbols.length, 4); // top level symbols
    assert.strictEqual(countOverallSymbols(symbols), 11);
  });
});

function countOverallSymbols(symbols: vscode.DocumentSymbol[]) {
  var count: number = 0;
  symbols.forEach((symbol) => {
    count++;
    count += countOverallSymbols(symbol.children);
  });

  return count;
}

function getExampleFileDocUri(p: string) {
  return vscode.Uri.file(
    path.resolve(__dirname, '../../../tree-sitter-ms-access-dump/examples', p),
  );
}
