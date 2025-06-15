import {
  Location,
  Range,
  Position,
  SymbolInformation,
  SymbolKind,
} from 'vscode-languageserver/node';

import * as Parser from 'web-tree-sitter';

export function symbolsFromAST(uri: string, root: Parser.Tree): SymbolInformation[] {
  const symbols: SymbolInformation[] = [];

  for (const syntax_node of root.rootNode.namedChildren) {
    if (syntax_node === null) {
      continue;
    }
    scanTopLevelStructure(uri, syntax_node, symbols);
  }

  return symbols;
}

function scanTopLevelStructure(uri: string, node: Parser.Node, symbols: SymbolInformation[]) {
  switch (node.type) {
    case 'assignment':
      scanAssignment(uri, node, symbols);
      break;
    case 'block':
      scanBlock(uri, node, symbols);
      break;
    case 'code_section':
      scanCodeSection(uri, node, symbols);
      break;
  }
}

function removeQuotes(text: string): string {
  if (!text.startsWith('"') || !text.endsWith('"')) {
    return text;
  }
  return text.substring(1, text.length - 1);
}

function scanAssignment(uri: string, assignment_node: Parser.Node, symbols: SymbolInformation[]) {
  if (assignment_node.firstNamedChild?.text === 'Name') {
    const name_node = assignment_node.firstNamedChild.nextNamedSibling;
    if (
      name_node === undefined ||
      name_node?.startPosition === undefined ||
      name_node?.endPosition === undefined
    ) {
      return;
    }

    const parent_node = assignment_node.parent;
    if (
      parent_node === undefined ||
      parent_node?.startPosition === undefined ||
      parent_node?.endPosition === undefined
    ) {
      return;
    }

    const stripped_name_node = removeQuotes(name_node.text);
    if (stripped_name_node.length === 0) {
      return;
    }

    symbols.push({
      name: stripped_name_node,
      kind: SymbolKind.Struct,
      location: Location.create(
        uri,
        Range.create(
          Position.create(parent_node.startPosition.row, parent_node.startPosition.column),
          Position.create(parent_node.endPosition.row, parent_node.endPosition.column),
        ),
      ),
    });
  }
}

function scanBlock(uri: string, node: Parser.Node, symbols: SymbolInformation[]) {
  if (node.firstNamedChild?.type === 'identifier') {
    if (node.firstNamedChild.text === 'Form' || node.firstNamedChild.text === 'Report') {
      symbols.push({
        name: node.firstNamedChild.text,
        kind: SymbolKind.Struct,
        location: Location.create(
          uri,
          Range.create(
            Position.create(node.startPosition.row, node.startPosition.column),
            Position.create(node.endPosition.row, node.endPosition.column),
          ),
        ),
      });
    }
  }

  for (const syntax_node of node.namedChildren) {
    if (syntax_node === null) {
      continue;
    }
    scanTopLevelStructure(uri, syntax_node, symbols);
  }
}

function scanCodeSection(uri: string, node: Parser.Node, symbols: SymbolInformation[]) {
  symbols.push({
    name: 'CodeBehindForm',
    kind: SymbolKind.Namespace,
    location: Location.create(
      uri,
      Range.create(
        Position.create(node.startPosition.row, node.startPosition.column),
        Position.create(node.endPosition.row, node.endPosition.column),
      ),
    ),
  });
}
