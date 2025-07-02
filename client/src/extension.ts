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
        [
          'Cleanup strings',
          'Change orientation',
          'Change paper size',
          'Change dmFields',
          'Remove driver data',
        ],
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
          const paperSizeString = await window.showQuickPick(
            [
              'A4',
              'A5',
              'A6',
              'B6 (JIS)',
              'Envelope C6',
              'Executive',
              'Legal',
              'Letter',
              'Statement',
            ],
            {
              placeHolder: 'Select paper size',
              canPickMany: false,
            },
          );
          if (!paperSizeString) {
            return;
          }
          await client.sendRequest('access-dump/select-paper-size', {
            uri,
            paperSizeString,
          });
        } else if (editOption === 'Change dmFields') {
          let currentDmFields: string[] = [];
          try {
            const response = await client.sendRequest('access-dump/get-dmfields', {
              uri,
            });
            currentDmFields = response as string[];
          } catch (err) {
            console.warn('Could not get current dmFields from server:', err);
            return;
          }

          const dmFields = await window.showQuickPick(
            [
              { label: 'DM_ORIENTATION', picked: currentDmFields.includes('DM_ORIENTATION') },
              { label: 'DM_PAPERSIZE', picked: currentDmFields.includes('DM_PAPERSIZE') },
              { label: 'DM_PAPERLENGTH', picked: currentDmFields.includes('DM_PAPERLENGTH') },
              { label: 'DM_PAPERWIDTH', picked: currentDmFields.includes('DM_PAPERWIDTH') },
              { label: 'DM_SCALE', picked: currentDmFields.includes('DM_SCALE') },
              { label: 'DM_POSITION', picked: currentDmFields.includes('DM_POSITION') },
              { label: 'DM_NUP', picked: currentDmFields.includes('DM_NUP') },
              {
                label: 'DM_DISPLAYORIENTATION',
                picked: currentDmFields.includes('DM_DISPLAYORIENTATION'),
              },
              { label: 'DM_COPIES', picked: currentDmFields.includes('DM_COPIES') },
              { label: 'DM_DEFAULTSOURCE', picked: currentDmFields.includes('DM_DEFAULTSOURCE') },
              { label: 'DM_PRINTQUALITY', picked: currentDmFields.includes('DM_PRINTQUALITY') },
              { label: 'DM_COLOR', picked: currentDmFields.includes('DM_COLOR') },
              { label: 'DM_DUPLEX', picked: currentDmFields.includes('DM_DUPLEX') },
              { label: 'DM_YRESOLUTION', picked: currentDmFields.includes('DM_YRESOLUTION') },
              { label: 'DM_TTOPTION', picked: currentDmFields.includes('DM_TTOPTION') },
              { label: 'DM_COLLATE', picked: currentDmFields.includes('DM_COLLATE') },
              { label: 'DM_FORMNAME', picked: currentDmFields.includes('DM_FORMNAME') },
              { label: 'DM_LOGPIXELS', picked: currentDmFields.includes('DM_LOGPIXELS') },
              { label: 'DM_BITSPERPEL', picked: currentDmFields.includes('DM_BITSPERPEL') },
              { label: 'DM_PELSWIDTH', picked: currentDmFields.includes('DM_PELSWIDTH') },
              { label: 'DM_PELSHEIGHT', picked: currentDmFields.includes('DM_PELSHEIGHT') },
              { label: 'DM_DISPLAYFLAGS', picked: currentDmFields.includes('DM_DISPLAYFLAGS') },
              {
                label: 'DM_DISPLAYFREQUENCY',
                picked: currentDmFields.includes('DM_DISPLAYFREQUENCY'),
              },
              { label: 'DM_ICMMETHOD', picked: currentDmFields.includes('DM_ICMMETHOD') },
              { label: 'DM_ICMINTENT', picked: currentDmFields.includes('DM_ICMINTENT') },
              { label: 'DM_MEDIATYPE', picked: currentDmFields.includes('DM_MEDIATYPE') },
              { label: 'DM_DITHERTYPE', picked: currentDmFields.includes('DM_DITHERTYPE') },
              { label: 'DM_PANNINGWIDTH', picked: currentDmFields.includes('DM_PANNINGWIDTH') },
              { label: 'DM_PANNINGHEIGHT', picked: currentDmFields.includes('DM_PANNINGHEIGHT') },
              {
                label: 'DM_DISPLAYFIXEDOUTPUT',
                picked: currentDmFields.includes('DM_DISPLAYFIXEDOUTPUT'),
              },
            ],
            {
              placeHolder: 'Select dmFields to change',
              canPickMany: true,
            },
          );

          if (!dmFields || dmFields.length === 0) {
            return;
          }

          const selectedFields = dmFields.map((item) => item.label);

          await client.sendRequest('access-dump/set-dmfields', {
            uri,
            dmFields: selectedFields,
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
