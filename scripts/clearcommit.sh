
if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
  echo "no es un repo git! abortando..."
  exit 1
fi

file1="./src/environments/environment.ts"
file2="./src/environments/environment.prod.ts"

echo "Checking file: $(realpath $file1)"
echo "Checking file: $(realpath $file2)"

if [ -f "$file1" ]; then
  echo "DEV Environment file exists. Deleting it before commit..."
  rm "$file1"
  echo "File deleted."
else
  echo "File do not exist. Aborting."
fi
if [ -f "$file1" ]; then
  echo "PROD Environment file exists. Deleting it before commit..."
  rm "$file2"
  echo "File deleted."
else
  echo "File do not exist. Aborting."
fi
# If the above git rm commands are successful, then commit
if git commit -m "clear commit"; then
  echo "CLEAN!!!"
else
  echo "Commit failed"
fi



