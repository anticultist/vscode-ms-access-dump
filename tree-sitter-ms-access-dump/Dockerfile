FROM debian:bookworm

RUN apt-get update \
    && apt-get install -y --no-install-recommends build-essential nodejs npm git

# https://emscripten.org/docs/getting_started/downloads.html
WORKDIR /home
RUN git clone https://github.com/emscripten-core/emsdk.git
WORKDIR /home/emsdk
RUN git pull
RUN ./emsdk install latest
RUN ./emsdk activate latest

RUN npm install -g tree-sitter-cli@0.20.8

WORKDIR /home/node/app
CMD ["./build-inside-docker.sh"]

