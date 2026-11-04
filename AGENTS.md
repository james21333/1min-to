# Agent notes — 1min.to

## Live deploys (mandatory)

**https://1min.to** is Cloudflare Pages from GitHub **`main`**. Local edits are not live.

For any change that should affect production (quiz, money hop `/go702…`, `functions/`, paths, offers): **commit → `git push origin main` → verify live with cache-bust** before calling it done. Do not leave offer URL swaps sitting only in the working tree.

### Money / offer URLs

**Never** put offer URLs or filter vendor strings in `public/`.  
Quiz `alt` → `/go702…` (referrer strip hops) → `/api/go`.  
`/api/s` + `/api/go` use Pages secrets `CHECK_ID`, `CHECK_USER_ID`, `CHECK_UPSTREAM`. Offer URL only from the remote response on the final redirect, with `Referrer-Policy: no-referrer`.

## GetFit quiz multi-path (mass edit)

Same quiz at `/getfit`, `/getstarted`, `/signup`, `/startnow`, `/getyourplan`, `/findyourfit`, `/getresults`, `/takethequiz`, `/seeoptions`, `/findout`.

**Always edit the shared files, not individual path HTML:**

| Edit this | Purpose |
|-----------|---------|
| `public/shared/getfit-quiz.js` | Copy, screens, logic, `redirect_url` |
| `public/shared/getfit-quiz.css` | Styles |

Path folders under `public/<slug>/` are thin shells only. Path list: `scripts/getfit-paths.txt`. New path → append slug → `./scripts/sync-getfit-paths.sh` → push.

See also `.cursor/rules/getfit-quiz-mass-edit.mdc`.
