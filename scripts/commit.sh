#!/bin/bash

if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
  echo "no es un repo git! abortando..."
  exit 1
fi

git add .

git commit -m 'limpiando env vars!'

echo "CLEAN!!"
