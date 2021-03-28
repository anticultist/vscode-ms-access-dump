Extension Development
=====================

Brief Description
-----------------

This is a [VS Code language extension](https://code.visualstudio.com/api/language-extensions/overview).
It provides syntax highlighting through a [TextMate grammar](https://macromates.com/manual/en/language_grammars) file which is located in `syntaxes/access-dump.tmLanguage.json`.
In addition this extension has some [language server](https://code.visualstudio.com/api/language-extensions/language-server-extension-guide) features implemented.

Structure
---------

```
.
├── .vscode
│   ├── launch.json                  // Config for launching and debugging the extension
│   └── tasks.json                   // Config for build task that compiles TypeScript
├── client                           // Language Client
│   └── src
│       └── extension.ts             // Language Client entry point
├── server                           // Language Server
│   └── src
│       └── server.ts                // Language Server entry point
├── syntaxes
│   └── access-dump.tmLanguage.json  // TextMate grammar
├── tree-sitter-ms-access-dump       // Tree-sitter parser module
│   ├── test
│   │   └── corpus                   // Tree-sitter parser tests
│   └── grammar.js                   // Tree-sitter definition
├── package.json                     // Extension manifest
└── tsconfig.json                    // TypeScript configuration
```

Building the Extension
----------------------

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

VS Code Extension
-----------------

- [Article: Writing Your Own Debugger and Language Extensions with Visual Studio Code](https://www.codemag.com/article/1809051/Writing-Your-Own-Debugger-and-Language-Extensions-with-Visual-Studio-Code)
- [Language Server (LSP)](https://microsoft.github.io/language-server-protocol/)

Syntax Highlighting
-------------------

- [TextMate grammar](https://macromates.com/manual/en/language_grammars)
- [Scope Naming](https://www.sublimetext.com/docs/3/scope_naming.html)
- [Online RegEx tester](https://rubular.com/)
- [Article: About writing a TextMate grammar](https://www.apeth.com/nonblog/stories/textmatebundle.html)

Tree-sitter
-----------

- [Website](https://tree-sitter.github.io/)
- [Article: Guide to your first Tree-sitter grammar](https://gist.github.com/Aerijo/df27228d70c633e088b0591b8857eeef)
- Building a WASM file on Windows (without Docker) [currently doesn't work](https://github.com/tree-sitter/tree-sitter/issues/434)

```sh
cd tree-sitter-ms-access-dump
npm install

npx tree-sitter generate
npx tree-sitter test
npx tree-sitter build-wasm
```

WebAssembly
-----------

- [WebAssembly bindings for Tree-sitter](https://github.com/tree-sitter/tree-sitter/blob/master/lib/binding_web/README.md)
- [Emscripten](https://emscripten.org/): This tool converts a C/C++ project into a WASM file.
- [The WebAssembly Binary Toolkit](https://github.com/WebAssembly/wabt)

Package
-------

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
