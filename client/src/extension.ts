// Based on Microsoft LSP example
// https://github.com/microsoft/vscode-extension-samples/tree/main/lsp-sample

import * as path from 'path';
import { workspace, ExtensionContext, commands, window } from 'vscode';

import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind,
} from 'vscode-languageclient/node';

let client: LanguageClient;

export function activate(context: ExtensionContext) {
  // The server is implemented in node
  let serverModule = context.asAbsolutePath(path.join('server', 'out', 'server.js'));
  // The debug options for the server
  // --inspect=6009: runs the server in Node's Inspector mode so VS Code can attach to the server for debugging
  let debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] };

  // If the extension is launched in debug mode then the debug server options are used
  // Otherwise the run options are used
  let serverOptions: ServerOptions = {
    run: { module: serverModule, transport: TransportKind.ipc },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: debugOptions,
    },
  };

  // Options to control the language client
  let clientOptions: LanguageClientOptions = {
    // Register the server for MS Access dump format
    documentSelector: [{ scheme: 'file', language: 'access-dump' }],
    synchronize: {
      // Notify the server about file changes to '.clientrc files contained in the workspace
      fileEvents: workspace.createFileSystemWatcher('**/.clientrc'),
    },
  };

  // Create the language client and start the client.
  client = new LanguageClient(
    'msAccessDumpFormatLanguageServer',
    'MS Access Dump Format LSP',
    serverOptions,
    clientOptions,
  );

  // Start the client. This will also launch the server
  client.start();

  // Register the command and send a request to the server
  context.subscriptions.push(
    commands.registerCommand('access-dump.edit-prt-dev-mode', async (uri: string | undefined) => {
      const editOption = await window.showQuickPick(
        ['Cleanup strings', 'Change orientation', 'Change paper size', 'Remove driver data'],
        {
          placeHolder: 'Select an edit option',
          canPickMany: false,
        },
      );
      if (!editOption) {
        return;
      }

      const editor = window.activeTextEditor;
      if (!editor) {
        // window.showWarningMessage('No active editor.');
        return;
      }

      if (!uri) {
        uri = editor.document.uri.toString();
      }

      try {
        if (editOption === 'Cleanup strings') {
          await client.sendRequest('access-dump/cleanup-strings', {
            uri,
          });
        } else if (editOption === 'Remove driver data') {
          await client.sendRequest('access-dump/remove-driver-data', {
            uri,
          });
        } else if (editOption === 'Change orientation') {
          const paperOrientation = await window.showQuickPick(['Portrait', 'Landscape'], {
            placeHolder: 'Select paper orientation',
            canPickMany: false,
          });
          if (!paperOrientation) {
            return;
          }
          await client.sendRequest('access-dump/select-paper-orientation', {
            uri,
            paperOrientation,
          });
        } else if (editOption === 'Change paper size') {
          const paperSize = await window.showQuickPick(
            [
              'A4',
              'A5',
              'A6',
              'B5 (JIS)',
              'B6 (JIS)',
              'Envelope C6',
              'Executive',
              'Legal',
              'Letter',
              'RA4',
              'Statement',
            ],
            {
              placeHolder: 'Select paper size',
              canPickMany: false,
            },
          );
          if (!paperSize) {
            return;
          }
          await client.sendRequest('access-dump/select-paper-size', {
            uri,
            paperSize,
          });
        }
      } catch (err) {
        window.showErrorMessage('Failed to perform edit operation: ' + err);
      }
    }),
  );
}

export function deactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined;
  }
  return client.stop();
}
