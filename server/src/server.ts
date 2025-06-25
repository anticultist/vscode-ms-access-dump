// Based on Microsoft LSP example
// https://github.com/microsoft/vscode-extension-samples/tree/main/lsp-sample

import {
  CancellationToken,
  Color,
  ColorPresentation,
  ColorPresentationParams,
  createConnection,
  DidChangeConfigurationNotification,
  DocumentColorParams,
  DocumentSymbolParams,
  HoverParams,
  InitializeParams,
  InitializeResult,
  ProposedFeatures,
  SymbolInformation,
  TextDocuments,
  TextDocumentSyncKind,
  CodeLensParams,
} from 'vscode-languageserver/node';

import { TextDocument } from 'vscode-languageserver-textdocument';

import { TextEdit } from 'vscode-languageserver-types';

import { colorsFromAST, convertColorToNumber } from './provider/color-provider';
import { hoverFromAST } from './provider/hover-provider';
import { symbolsFromAST } from './provider/symbol-information-provider';
import { codeLensesFromAST, PRT_DEV_PROPERTIES } from './provider/code-lens-provider';
import {
  getDevModeStructFromNode,
  getPropertyValuesFromAST,
  getParentPropertyName,
  devModeStructToString,
} from './provider/ast-utils';
import {
  DevMode,
  DM_ORIENTATION,
  DM_PAPERSIZE,
  DMORIENT_LANDSCAPE,
  DMORIENT_PORTRAIT,
  DMPAPER_A4,
  DMPAPER_A5,
  DMPAPER_A6,
  DMPAPER_B6_JIS,
  DMPAPER_ENV_C6,
  DMPAPER_EXECUTIVE,
  DMPAPER_LEGAL,
  DMPAPER_LETTER,
  DMPAPER_STATEMENT,
} from './binary-data/printing-device-mode';

import { Parser, Language, Tree } from 'web-tree-sitter';
import * as path from 'path';
import { readFileSync } from 'fs';

async function loadParser() {
  // read the WebAssembly module as a buffer
  const wasmBuffer = readFileSync(path.resolve(__dirname, '..', 'tree-sitter-ms_access_dump.wasm'));

  await Parser.init();
  parser = new Parser();
  language = await Language.load(wasmBuffer);
  parser.setLanguage(language);
}

// Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.
let connection = createConnection(ProposedFeatures.all);

// Create a simple text document manager.
let documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

let parser: Parser;
let language: Language;

let hasConfigurationCapability: boolean = false;
let hasWorkspaceFolderCapability: boolean = false;
let hasDiagnosticRelatedInformationCapability: boolean = false;

connection.onInitialize(async (params: InitializeParams) => {
  let capabilities = params.capabilities;

  // Does the client support the `workspace/configuration` request?
  // If not, we fall back using global settings.
  hasConfigurationCapability = !!capabilities?.workspace?.configuration;
  hasWorkspaceFolderCapability = !!capabilities?.workspace?.workspaceFolders;
  hasDiagnosticRelatedInformationCapability =
    !!capabilities?.textDocument?.publishDiagnostics?.relatedInformation;

  const result: InitializeResult = {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Incremental,
      documentSymbolProvider: true,
      colorProvider: true,
      hoverProvider: true,
      codeLensProvider: {
        resolveProvider: true,
      },
    },
  };
  if (hasWorkspaceFolderCapability) {
    result.capabilities.workspace = {
      workspaceFolders: {
        supported: true,
      },
    };
  }

  await loadParser();

  return result;
});

connection.onInitialized(() => {
  if (hasConfigurationCapability) {
    // Register for all configuration changes.
    connection.client.register(DidChangeConfigurationNotification.type, undefined);
  }
  if (hasWorkspaceFolderCapability) {
    connection.workspace.onDidChangeWorkspaceFolders((_event) => {});
  }
});

// The MS Access dump format settings
interface MSAccessDumpFormatSettings {
  maxNumberOfProblems: number;
}

// The global settings, used when the `workspace/configuration` request is not supported by the client.
// Please note that this is not the case when using this server with the client provided in this example
// but could happen with other clients.
const defaultSettings: MSAccessDumpFormatSettings = { maxNumberOfProblems: 1000 };
let globalSettings: MSAccessDumpFormatSettings = defaultSettings;

// Cache the settings of all open documents
let documentSettings: Map<string, Thenable<MSAccessDumpFormatSettings>> = new Map();

connection.onDidChangeConfiguration((change) => {
  if (hasConfigurationCapability) {
    // Reset all cached document settings
    documentSettings.clear();
  } else {
    globalSettings = <MSAccessDumpFormatSettings>(
      (change.settings.msAccessDumpFormatLanguageServer || defaultSettings)
    );
  }

  // Revalidate all open text documents
  documents.all().forEach(validateTextDocument);
});

function getDocumentSettings(resource: string): Thenable<MSAccessDumpFormatSettings> {
  if (!hasConfigurationCapability) {
    return Promise.resolve(globalSettings);
  }
  let result = documentSettings.get(resource);
  if (!result) {
    result = connection.workspace.getConfiguration({
      scopeUri: resource,
      section: 'msAccessDumpFormatLanguageServer',
    });
    documentSettings.set(resource, result);
  }
  return result;
}

// Only keep settings for open documents
documents.onDidClose((e) => {
  documentSettings.delete(e.document.uri);
});

// The content of a text document has changed. This event is emitted
// when the text document first opened or when its content has changed.
documents.onDidChangeContent((change) => {
  validateTextDocument(change.document);
});

async function validateTextDocument(textDocument: TextDocument): Promise<void> {
  /** TODO: implement */
}

connection.onDidChangeWatchedFiles((_change) => {});

function parseDocument(uri: string): Tree | null {
  if (parser === undefined) {
    connection.console.log('parser is not available');
    return null;
  }

  const document_text = documents.get(uri)?.getText();
  if (document_text === undefined) {
    connection.console.log('failed to get document text');
    return null;
  }

  return parser.parse(document_text);
}

connection.onDocumentSymbol(
  (params: DocumentSymbolParams, _token: CancellationToken): SymbolInformation[] => {
    const ast = parseDocument(params.textDocument.uri);
    if (ast === null) {
      return [];
    }

    return symbolsFromAST(params.textDocument.uri, ast);
  },
);

connection.onDocumentColor((params: DocumentColorParams, _token: CancellationToken) => {
  const ast = parseDocument(params.textDocument.uri);
  if (ast === null) {
    return [];
  }

  return colorsFromAST(ast);
});

function colorHexRepresentation(color: Color): string {
  function toHex(num: number): string {
    let hex = Math.trunc(num * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }

  return '#' + toHex(color.red) + toHex(color.green) + toHex(color.blue);
}

connection.onColorPresentation((params: ColorPresentationParams) => {
  const result: ColorPresentation[] = [];
  const representation = convertColorToNumber(params.color).toString();
  const title = colorHexRepresentation(params.color) + ' - ' + representation;

  result.push({
    label: title,
    textEdit: TextEdit.replace(params.range, representation),
  });

  return result;
});

connection.onHover(async (params: HoverParams) => {
  const ast = parseDocument(params.textDocument.uri);
  if (ast === null) {
    return null;
  }

  return await hoverFromAST(ast, params.position.line, params.position.character);
});

connection.onCodeLens((params: CodeLensParams) => {
  const ast = parseDocument(params.textDocument.uri);
  if (ast === null) {
    return [];
  }

  return codeLensesFromAST(params.textDocument.uri, ast);
});

connection.onCodeLensResolve((codeLens, _token) => {
  return codeLens;
});

connection.onRequest('access-dump/cleanup-strings', async (params: { uri: string }) => {
  modifyDevModeStructs(params, (struct, params) => {
    // NOTE: doing nothing here cleans up the strings as a side effect
  });
});

connection.onRequest('access-dump/remove-driver-data', async (params: { uri: string }) => {
  modifyDevModeStructs(params, (struct, params) => {
    if (struct?._driverData) {
      delete struct._driverData;
    }
    struct.dmDriverVersion = 0;
    struct.dmDriverExtra = 0;
  });
});

connection.onRequest(
  'access-dump/select-paper-orientation',
  async (params: { uri: string; paperOrientation: string }) => {
    modifyDevModeStructs(params, (struct, params) => {
      if (params.paperOrientation.toLowerCase() === 'portrait') {
        struct.DUMMYUNIONNAME.DUMMYSTRUCTNAME.dmOrientation = DMORIENT_PORTRAIT;
      } else if (params.paperOrientation.toLowerCase() === 'landscape') {
        struct.DUMMYUNIONNAME.DUMMYSTRUCTNAME.dmOrientation = DMORIENT_LANDSCAPE;
      } else {
        // TODO: show error message
      }

      struct.dmFields |= DM_ORIENTATION;
    });
  },
);

connection.onRequest(
  'access-dump/select-paper-size',
  async (params: { uri: string; paperSizeString: string }) => {
    modifyDevModeStructs(params, (struct, params) => {
      if (params.paperSizeString === 'A4') {
        struct.DUMMYUNIONNAME.DUMMYSTRUCTNAME.dmPaperSize = DMPAPER_A4;
        struct.dmFormName = 'A4';
      } else if (params.paperSizeString === 'A5') {
        struct.DUMMYUNIONNAME.DUMMYSTRUCTNAME.dmPaperSize = DMPAPER_A5;
        struct.dmFormName = 'A5';
      } else if (params.paperSizeString === 'A6') {
        struct.DUMMYUNIONNAME.DUMMYSTRUCTNAME.dmPaperSize = DMPAPER_A6;
        struct.dmFormName = 'A6';
      } else if (params.paperSizeString === 'B6 (JIS)') {
        struct.DUMMYUNIONNAME.DUMMYSTRUCTNAME.dmPaperSize = DMPAPER_B6_JIS;
        struct.dmFormName = 'B6 (JIS)';
      } else if (params.paperSizeString === 'Envelope C6') {
        struct.DUMMYUNIONNAME.DUMMYSTRUCTNAME.dmPaperSize = DMPAPER_ENV_C6;
        struct.dmFormName = 'Envelope C6';
      } else if (params.paperSizeString === 'Executive') {
        struct.DUMMYUNIONNAME.DUMMYSTRUCTNAME.dmPaperSize = DMPAPER_EXECUTIVE;
        struct.dmFormName = 'Executive';
      } else if (params.paperSizeString === 'Legal') {
        struct.DUMMYUNIONNAME.DUMMYSTRUCTNAME.dmPaperSize = DMPAPER_LEGAL;
        struct.dmFormName = 'Legal';
      } else if (params.paperSizeString === 'Letter') {
        struct.DUMMYUNIONNAME.DUMMYSTRUCTNAME.dmPaperSize = DMPAPER_LETTER;
        struct.dmFormName = 'Letter';
      } else if (params.paperSizeString === 'Statement') {
        struct.DUMMYUNIONNAME.DUMMYSTRUCTNAME.dmPaperSize = DMPAPER_STATEMENT;
        struct.dmFormName = 'Statement';
      } else {
        // TODO: show error message
        return;
      }

      struct.dmFields |= DM_PAPERSIZE;
    });
  },
);

function modifyDevModeStructs<T extends { uri: string }>(
  params: T,
  modifyCallbackStruct: (struct: DevMode, params: T) => void,
): void {
  const root = parseDocument(params.uri);
  if (root === null) {
    // TODO: show error message
    return;
  }

  const document = documents.get(params.uri);
  if (!document) {
    // TODO: show error message
    return;
  }

  const edits: TextEdit[] = [];
  getPropertyValuesFromAST(root.rootNode, PRT_DEV_PROPERTIES).forEach((valueNode) => {
    const isWString = getParentPropertyName(valueNode) === 'PrtDevModeW';
    const struct = getDevModeStructFromNode(valueNode, isWString);
    if (!struct) {
      // TODO: show error message
      return;
    }

    modifyCallbackStruct(struct, params);

    const newValue = devModeStructToString(struct, isWString);

    edits.push(
      TextEdit.replace(
        {
          start: { line: valueNode.startPosition.row, character: valueNode.startPosition.column },
          end: { line: valueNode.endPosition.row, character: valueNode.endPosition.column },
        },
        newValue,
      ),
    );
  });

  connection.workspace.applyEdit({
    documentChanges: [
      {
        textDocument: {
          uri: params.uri,
          version: document.version,
        },
        edits,
      },
    ],
  });
}

// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);

// Listen on the connection
connection.listen();
