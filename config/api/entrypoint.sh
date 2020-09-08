#!/bin/sh

if ! [ -d NeteaseCloudMusicApi ]; then git clone https://github.com/Binaryify/NeteaseCloudMusicApi.git; fi

cd NeteaseCloudMusicApi || return

npm install

exec "$@"