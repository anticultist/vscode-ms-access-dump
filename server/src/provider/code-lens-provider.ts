import { CodeLens, Range, Position } from 'vscode-languageserver/node';
import { getPropertyValuesFromAST } from './ast-utils';

import Parser = require('web-tree-sitter');

export function codeLensesFromAST(uri: string, root: Parser.Tree) {
  const codeLenses: CodeLens[] = [];

  getPropertyValuesFromAST(root.rootNode, PRT_DEV_PROPERTIES).forEach((node) => {
    codeLenses.push({
      range: Range.create(
        Position.create(node.startPosition.row, node.startPosition.column),
        Position.create(node.endPosition.row, node.endPosition.column),
      ),
      command: {
        title: 'Edit structure',
        command: 'access-dump.edit-prt-dev-mode',
        arguments: [uri],
      },
    });
  });

  return codeLenses;
}

export const PRT_DEV_PROPERTIES = ['PrtDevMode', 'PrtDevModeW'];
