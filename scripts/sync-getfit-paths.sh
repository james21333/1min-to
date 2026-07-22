#!/usr/bin/env bash
# Writes thin identical shells for every GetFit quiz path.
# Mass content edits: change public/shared/getfit-quiz.css and public/shared/getfit-quiz.js
# Add a new URL: append the slug to scripts/getfit-paths.txt, then run this script.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PATHS_FILE="$ROOT/scripts/getfit-paths.txt"
SHELL_TEMPLATE="$ROOT/scripts/getfit-shell.html"

while IFS= read -r slug || [[ -n "${slug:-}" ]]; do
  [[ -z "$slug" || "$slug" =~ ^# ]] && continue
  dir="$ROOT/public/$slug"
  mkdir -p "$dir"
  sed "s/__PATH_SLUG__/$slug/g" "$SHELL_TEMPLATE" > "$dir/index.html"
  echo "ok /$slug/"
done < "$PATHS_FILE"
