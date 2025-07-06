# Extension Development

## Brief Description

This is a [VS Code language extension](https://code.visualstudio.com/api/language-extensions/overview).
It provides syntax highlighting through a [TextMate grammar](https://macromates.com/manual/en/language_grammars) file which is located in `syntaxes/access-dump.tmLanguage.json`.
In addition this extension has some [language server](https://code.visualstudio.com/api/language-extensions/language-server-extension-guide) features implemented.

## Structure

```text
.
├── .vscode/
│   ├── launch.json                  // Config for launching and debugging the extension
│   └── tasks.json                   // Config for build task that compiles TypeScript
├── client/                          // Language Client
│   └── src/
│       └── extension.ts             // Language Client entry point
├── server/                          // Language Server
│   └── src/
│       └── server.ts                // Language Server entry point
├── syntaxes/
│   └── access-dump.tmLanguage.json  // TextMate grammar
├── tree-sitter-ms-access-dump       // Tree-sitter parser module
│   ├── test/
│   │   └── corpus/                  // Tree-sitter parser tests
│   └── grammar.js                   // Tree-sitter definition
├── package.json                     // Extension manifest
└── tsconfig.json                    // TypeScript configuration
```

## Building the Extension

To initialize this extension you have to run the following command in the root folder

```sh
npm install
```

Afterwards open this extension as a VSCode workspace or just run the following command:

```sh
code .
```

To compile this extension press `Ctrl + Shift + B`.
Than switch to the debug viewlet and select `Launch Client`.

## Tech Stack

- [Language Server Protocol](https://microsoft.github.io/language-server-protocol/)
- [Tree-sitter](https://tree-sitter.github.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Webpack](https://webpack.js.org/)
- [WebAssembly](https://webassembly.org/)

## VS Code Extension

- [Article: Writing Your Own Debugger and Language Extensions with Visual Studio Code](https://www.codemag.com/article/1809051/Writing-Your-Own-Debugger-and-Language-Extensions-with-Visual-Studio-Code)
- [Language Server (LSP)](https://microsoft.github.io/language-server-protocol/)

## Syntax Highlighting

- [TextMate grammar](https://macromates.com/manual/en/language_grammars)
- [Scope Naming](https://www.sublimetext.com/docs/3/scope_naming.html)
- [Online RegEx tester](https://rubular.com/)
- [Article: About writing a TextMate grammar](https://www.apeth.com/nonblog/stories/textmatebundle.html)
- [NPM package to write TextMate grammar tests for VSCode](https://www.npmjs.com/package/vscode-tmgrammar-test)
- [TmLanguage-Syntax-Highlighter](https://github.com/RedCMD/TmLanguage-Syntax-Highlighter)
- [Extension README.md preview markdown codeblock language detection](https://github.com/microsoft/vscode/issues/205328)

## Tree-sitter

- [Website](https://tree-sitter.github.io/)
- [Article: Guide to your first Tree-sitter grammar](https://gist.github.com/Aerijo/df27228d70c633e088b0591b8857eeef)
- Building a WASM file on Windows (without Docker)

```sh
cd tree-sitter-ms-access-dump
npm install

npx tree-sitter generate
npx tree-sitter test
npx tree-sitter build-wasm
```

## WebAssembly

- [WebAssembly bindings for Tree-sitter](https://github.com/tree-sitter/tree-sitter/blob/master/lib/binding_web/README.md)
- [Emscripten](https://emscripten.org/): This tool converts a C/C++ project into a WASM file.
- [The WebAssembly Binary Toolkit](https://github.com/WebAssembly/wabt)
- [Wasm3](https://github.com/wasm3/wasm3): A WebAssembly interpreter
- [Wasmer](https://github.com/wasmerio/wasmer): A WebAssembly runtime
- [Awesome WebAssembly Tools](https://github.com/vshymanskyy/awesome-wasm-tools)

## Testing

```sh
npm run test
```

## Package

To [publish](https://code.visualstudio.com/api/working-with-extensions/publishing-extension) a new version you typically have to execute those commands:

```sh
vsce login username
vsce package
vsce publish
```

In addition you can install and test the new version with this command:

```sh
code --install-extension extension_filename.vsix
```

You may also need to use the following links:

- [Azure DevOps](https://dev.azure.com/)
- [Visual Studio Marketplace - Manage Publishers & Extensions](https://marketplace.visualstudio.com/manage)
