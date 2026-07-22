# Agent notes — 1min.to

## GetFit quiz multi-path (mass edit)

Same quiz at `/getfit`, `/getstarted`, `/signup`, `/startnow`, `/getyourplan`, `/findyourfit`, `/getresults`, `/takethequiz`, `/seeoptions`, `/findout`.

**Always edit the shared files, not individual path HTML:**

| Edit this | Purpose |
|-----------|---------|
| `public/shared/getfit-quiz.js` | Copy, screens, logic, `redirect_url` |
| `public/shared/getfit-quiz.css` | Styles |

Path folders under `public/<slug>/` are thin shells only. Path list: `scripts/getfit-paths.txt`. New path → append slug → `./scripts/sync-getfit-paths.sh` → push.

See also `.cursor/rules/getfit-quiz-mass-edit.mdc`.
