// Based on Microsoft LSP example
// https://github.com/microsoft/vscode-extension-samples/tree/main/lsp-sample

import {
	createConnection,
	TextDocuments,
	ProposedFeatures,
	InitializeParams,
	DidChangeConfigurationNotification,
	Location,
	Range,
	Position,
	DocumentSymbolParams,
	SymbolInformation,
	TextDocumentSyncKind,
	InitializeResult
} from 'vscode-languageserver/node';

import {
	TextDocument
} from 'vscode-languageserver-textdocument';

import * as Parser from 'web-tree-sitter';
import * as path from "path";

async function loadParser() {
	await Parser.init();
	parser = new Parser;
	const MyLang = await Parser.Language.load(path.resolve(__dirname, '..', 'tree-sitter-ms_access_dump.wasm'));
	parser.setLanguage(MyLang);
}

// Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.
let connection = createConnection(ProposedFeatures.all);

// Create a simple text document manager.
let documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

var parser: Parser;

let hasConfigurationCapability: boolean = false;
let hasWorkspaceFolderCapability: boolean = false;
let hasDiagnosticRelatedInformationCapability: boolean = false;

connection.onInitialize(async (params: InitializeParams) => {	
	let capabilities = params.capabilities;

	// Does the client support the `workspace/configuration` request?
	// If not, we fall back using global settings.
	hasConfigurationCapability = !!(
		capabilities.workspace && !!capabilities.workspace.configuration
	);
	hasWorkspaceFolderCapability = !!(
		capabilities.workspace && !!capabilities.workspace.workspaceFolders
	);
	hasDiagnosticRelatedInformationCapability = !!(
		capabilities.textDocument &&
		capabilities.textDocument.publishDiagnostics &&
		capabilities.textDocument.publishDiagnostics.relatedInformation
	);

	const result: InitializeResult = {
		capabilities: {
			textDocumentSync: TextDocumentSyncKind.Incremental,
			documentSymbolProvider: true
		}
	};
	if (hasWorkspaceFolderCapability) {
		result.capabilities.workspace = {
			workspaceFolders: {
				supported: true
			}
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
		connection.workspace.onDidChangeWorkspaceFolders(_event => {
		});
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

connection.onDidChangeConfiguration(change => {
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
			section: 'msAccessDumpFormatLanguageServer'
		});
		documentSettings.set(resource, result);
	}
	return result;
}

// Only keep settings for open documents
documents.onDidClose(e => {
	documentSettings.delete(e.document.uri);
});

// The content of a text document has changed. This event is emitted
// when the text document first opened or when its content has changed.
documents.onDidChangeContent(change => {
	validateTextDocument(change.document);
});

async function validateTextDocument(textDocument: TextDocument): Promise<void> {
}

connection.onDidChangeWatchedFiles(_change => {
});

function symbolsFromAST(uri:string, root: Parser.Tree): SymbolInformation[] {
	const symbols:SymbolInformation[] = [];

	function scanTopLevelStructure(x: Parser.SyntaxNode) {
		switch (x.type) {
			case 'assignment':
				scanAssignment(x);
				break;
			case 'block':
				scanBlock(x);
				break;
			case 'code_section':
				scanCodeSection(x);
				break;
		}
	}

	function removeQuotes(text:string): string {
		if (text.charAt(0) != '"' || text.charAt(text.length-1) != '"')
			return text;
		return text.substring(1, text.length-1);
	}

	function scanAssignment(assignment_node: Parser.SyntaxNode) {
		if (assignment_node.firstNamedChild?.text == "Name") {
			const name_node = assignment_node.firstNamedChild.nextNamedSibling;
			if (name_node === undefined ||
				name_node?.startPosition === undefined ||
				name_node?.endPosition === undefined)
			{
				return
			}

			const parent_node = assignment_node.parent;
			if (parent_node === undefined ||
				parent_node?.startPosition === undefined ||
				parent_node?.endPosition === undefined)
			{
				return
			}

			const stripped_name_node = removeQuotes(name_node.text);
			if (stripped_name_node.length == 0)
				return;

			symbols.push({
				name: stripped_name_node,
				// https://code.visualstudio.com/api/references/vscode-api#SymbolKind
				kind: 22,  // 22=Structure
				location: Location.create(uri, Range.create(Position.create(parent_node.startPosition.row, parent_node.startPosition.column),
															Position.create(parent_node.endPosition.row, parent_node.endPosition.column)))
			});
		}
	}

	function scanBlock(x: Parser.SyntaxNode) {
		if (x.firstNamedChild?.type == "identifier") {
			if (x.firstNamedChild.text == "Form" || x.firstNamedChild.text == "Report") {
				symbols.push({
					name: x.firstNamedChild.text,
					// https://code.visualstudio.com/api/references/vscode-api#SymbolKind
					kind: 22,  // 22=Structure
					location: Location.create(uri, Range.create(Position.create(x.startPosition.row, x.startPosition.column),
																Position.create(x.endPosition.row, x.endPosition.column)))
				});
			}
		}
		
		for (const syntax_node of x.namedChildren) {
			scanTopLevelStructure(syntax_node)
		}
	}

	function scanCodeSection(x: Parser.SyntaxNode) {
		symbols.push({
			name: "CodeBehindForm",
			kind: 2,  // 2=Namespace
			location: Location.create(uri, Range.create(Position.create(x.startPosition.row, x.startPosition.column),
														Position.create(x.endPosition.row, x.endPosition.column)))
		});
	}

	for (const syntax_node of root.rootNode.namedChildren) {
		scanTopLevelStructure(syntax_node)
	}

	return symbols;
}

connection.onDocumentSymbol(
	(params: DocumentSymbolParams): SymbolInformation[] => {
		if (parser === undefined) {
			connection.console.log('Could not provide symbol information: parser is not available');
			return [];
		}
		
		const document_text = documents.get(params.textDocument.uri)?.getText();
		if (document_text === undefined) {
			connection.console.log('Could not provide symbol information: failed to get document text');
			return [];
		}
		
		const tree = parser.parse(document_text);
		return symbolsFromAST(params.textDocument.uri, tree);
	}
);

// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);

// Listen on the connection
connection.listen();
