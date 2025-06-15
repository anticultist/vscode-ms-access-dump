import * as vscode from 'vscode';

// vscode.UriHandler ...
// https://code.visualstudio.com/api/advanced-topics/remote-extensions#callbacks-and-uri-handlers
// https://code.visualstudio.com/api/extension-capabilities/common-capabilities#data-storage
export class ImageProvider implements vscode.TextDocumentContentProvider {
  public provideTextDocumentContent(
    uri: vscode.Uri,
    token: vscode.CancellationToken,
  ): vscode.ProviderResult<string> {
    return '';
  }
}
