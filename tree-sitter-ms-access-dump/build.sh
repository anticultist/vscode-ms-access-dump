#!/usr/bin/bash

# make emscripten environment variables available in the terminal
cd /home/emsdk
source ./emsdk_env.sh

cd /home/node/app
npx tree-sitter build-wasm
