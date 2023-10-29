
if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
  echo "no es un repo git! abortando..."
  exit 1
fi

git rm ./src/environments/environment.ts
git rm ./src/environments/environment.prod.ts
git rm ./src/environments/environment.hmr.ts
# If the above git rm commands are successful, then commit
if git commit -m "clear commit"; then
  echo "CLEAN!!"
else
  echo "Commit failed"
fi



