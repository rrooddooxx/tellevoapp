#!/bin/bash

if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
  echo "no es un repo git! abortando..."
  exit 1
fi

git checkout origin/main -- ./src/environments/environment.ts

echo "CLEAN!!"



