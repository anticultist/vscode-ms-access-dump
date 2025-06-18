import Parser = require('web-tree-sitter');

import {
  prtDevModeFromRawData,
  prtDevModeWFromRawData,
  prtDevModeToRawData,
  DevMode,
} from '../binary-data/printing-device-mode';
import { bin2hex, rawDataFromAST } from '../binary-data/utils';

// TODO: rethink splitting of ast-utils, utils and printing-device-mode

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

export function getParentPropertyName(node: Parser.Node): string | undefined {
  return node.parent?.children[0]?.text;
}

export function getDevModeStructFromNode(
  node: Parser.Node,
  isWString: boolean,
): DevMode | undefined {
  const assignment_node = node.parent!;

  if (isWString) {
    return prtDevModeWFromRawData(rawDataFromAST(assignment_node));
  } else {
    return prtDevModeFromRawData(rawDataFromAST(assignment_node));
  }
}

export function devModeStructToString(struct: DevMode, isWString: boolean): string {
  const hex_values = prtDevModeToRawData(struct, isWString);
  const newValue = 'Begin\n        ' + bin2hex(hex_values).join('\n        ') + '\n    End';
  return newValue;
}
