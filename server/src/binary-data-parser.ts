import Parser = require('web-tree-sitter');

function hexValuesFromNode(node: Parser.SyntaxNode) {
  let hex_values: string[] = [];
  for (const child_node of node.namedChildren) {
    if (child_node.type !== 'hex_value') {
      continue;
    }
    hex_values.push(child_node.text);
  }
  return hex_values;
}

export function prtDevModeFromAST(assignment_node: Parser.SyntaxNode) {
  let content_node = assignment_node.firstNamedChild?.nextNamedSibling;
  if (content_node) {
    return hexValuesFromNode(content_node).join(' ,\n');
  }
  return 'PrtDevMode';
}

export function prtDevModeFromHexValues(hex_values: string[]): [] {
  return [];
}
