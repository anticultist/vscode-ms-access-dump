# VS Code Extension: Analyze and Fix MS Access Dump Files

This project is a Visual Studio Code extension designed to enhance the developer experience when working with Microsoft Access dump files. It provides advanced language tooling, syntax highlighting, and automated analysis to help users understand, navigate, and fix issues in Access dump files directly within VS Code.

## Features

- **Syntax Highlighting:** Uses a custom TextMate grammar for clear, accurate highlighting of MS Access dump file syntax.
- **Language Intelligence:** Employs a Language Server (LSP) powered by Tree-sitter and WebAssembly for fast, robust parsing and code analysis.
- **Automated Fixes:** Detects and suggests fixes for common issues found in Access dump files.
- **Code Navigation:** Offers symbol search, code lens, hover information, and color highlighting for easier exploration.
- **Binary Data Support:** Parses and visualizes embedded binary data, such as images and device mode settings.
- **Testing and Reliability:** Includes a comprehensive test suite for both the extension and the parser.

## Architecture & Technologies

- **VS Code API:** For extension integration and UI features.
- **TypeScript:** Main language for extension and server code.
- **TextMate Grammar:** For syntax highlighting (`syntaxes/access-dump.tmLanguage.json`).
- **Language Server Protocol (LSP):** For advanced language features (`server/src/server.ts`).
- **Tree-sitter:** Custom parser for MS Access dump files (`tree-sitter-ms-access-dump/grammar.js`).
- **WebAssembly:** Runs the Tree-sitter parser efficiently in the extension.
- **Docker:** Used to build the Tree-sitter parser on Windows for cross-platform compatibility.
- **Jest:** For unit and integration testing.
- **Webpack:** Bundles the extension for distribution.

## Key Components

- `server/src/server.ts`: Language server entry point.
- `tree-sitter-ms-access-dump/grammar.js`: Tree-sitter grammar definition.
- `tree-sitter-ms-access-dump/test/corpus/`: Parser test cases.
- `client/src/extension.ts`: Extension activation and client logic.
- `syntaxes/access-dump.tmLanguage.json`: TextMate grammar for highlighting.

## Coding Standards

- Use 2 spaces for indentation.
- Use single quotes for strings.
- Follow TypeScript best practices and VS Code extension guidelines.
