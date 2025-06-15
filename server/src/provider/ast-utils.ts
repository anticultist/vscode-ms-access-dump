import Parser = require('web-tree-sitter');

export function getPropertyValuesFromAST(
  root: Parser.Node,
  propertyNames: string[],
): Parser.Node[] {
  const properties: Parser.Node[] = [];

  scanBlock(root, properties, propertyNames);

  return properties;
}

function scanTopLevelStructure(
  node: Parser.Node,
  properties: Parser.Node[],
  propertyNames: string[],
) {
  switch (node.type) {
    case 'assignment':
      scanAssignment(node, properties, propertyNames);
      break;
    case 'block':
      scanBlock(node, properties, propertyNames);
      break;
  }
}

function scanBlock(node: Parser.Node, properties: Parser.Node[], propertyNames: string[]) {
  for (const syntax_node of node.namedChildren) {
    if (syntax_node === null) {
      continue;
    }
    scanTopLevelStructure(syntax_node, properties, propertyNames);
  }
}

function scanAssignment(
  assignment_node: Parser.Node,
  properties: Parser.Node[],
  propertyNames: string[],
) {
  if (
    !assignment_node.firstNamedChild ||
    !propertyNames.includes(assignment_node.firstNamedChild.text)
  ) {
    return;
  }

  const valueNode = assignment_node.firstNamedChild.nextNamedSibling;
  if (
    valueNode === undefined ||
    valueNode?.startPosition === undefined ||
    valueNode?.endPosition === undefined
  ) {
    return;
  }

  properties.push(valueNode);
}
