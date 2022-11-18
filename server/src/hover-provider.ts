import { Hover, Range, Position } from 'vscode-languageserver/node';

import Parser = require('web-tree-sitter');

import { prtDevModeFromAST } from './binary-data-parser';

export function hoverFromAST(root: Parser.Tree, line: number, character: number) {
  return scanBlock(root.rootNode, line, character);
}

function scanTopLevelStructure(
  node: Parser.SyntaxNode,
  line: number,
  character: number,
): Hover | null {
  switch (node.type) {
    case 'assignment':
      return scanAssignment(node, line, character);
    case 'block':
      return scanBlock(node, line, character);
  }
  return null;
}

function scanBlock(node: Parser.SyntaxNode, line: number, character: number): Hover | null {
  for (const syntax_node of node.namedChildren) {
    let ret = scanTopLevelStructure(syntax_node, line, character);
    if (ret !== null) return ret;
  }
  return null;
}

function positionInNode(line: number, character: number, node: Parser.SyntaxNode): boolean {
  return (
    (node.startPosition.row < line ||
      (node.startPosition.row == line && node.startPosition.column <= character)) &&
    (line < node.endPosition.row ||
      (line == node.endPosition.row && character <= node.endPosition.column))
  );
}

function scanAssignment(
  assignment_node: Parser.SyntaxNode,
  line: number,
  character: number,
): Hover | null {
  if (!positionInNode(line, character, assignment_node)) return null;

  let range = Range.create(
    Position.create(assignment_node.startPosition.row, assignment_node.startPosition.column),
    Position.create(assignment_node.endPosition.row, assignment_node.endPosition.column),
  );

  if (assignment_node.firstNamedChild?.type == 'identifier') {
    if (assignment_node.firstNamedChild.text == 'PrtDevMode') {
      // let content_node = assignment_node.firstNamedChild.nextNamedSibling;
      // let contents = '';
      // if (content_node) {
      //   contents += content_node.firstChild?.nextNamedSibling?.text;
      // }
      return {
        contents: prtDevModeFromAST(assignment_node),
        range: range,
      };
    }
  }

  //   return {
  //     contents: assignment_node.text,
  //     range: range,
  //   };
  return null;
}
