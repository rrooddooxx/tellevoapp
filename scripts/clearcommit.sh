
if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
  echo "no es un repo git! abortando..."
  exit 1
fi

file1="/src/environments/environment.ts"
file2="/src/environments/environment.prod.ts"
file3="/src/environments/environment.hmr.ts"

if [ -f "$file1" ] || [ -f "$file2" ] || [ -f "$file3" ]; then
  echo "Environment files exist. Deleting them now before commit..."
  git rm "$file1"
  git rm "$file2"
  git rm "$file3"
  echo "Files deleted."
else
  pwd
  echo "$file1" "$file2"
  echo "One or more files do not exist. Aborting."
fi
# If the above git rm commands are successful, then commit
if git commit -m "clear commit"; then
  echo "CLEAN!!!"
else
  echo "Commit failed"
fi



