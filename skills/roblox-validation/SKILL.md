---
name: roblox-validation
description: Use to choose and run proportional checks (format, lint, type check, build) for a Roblox project before reporting a change as done.
---

# Roblox validation

1. Read the project's own check definitions (README, CI workflow, Makefile, scripts) and run those first.
2. Otherwise, use the usual Rojo and Wally order:
   - `stylua --check src` for formatting
   - `selene src` for linting
   - the project's type check, such as `luau-lsp analyze`
   - `rojo build default.project.json -o build.rbxlx` to confirm the place builds and the tree maps correctly
   - `wally install` only when dependencies changed
3. Run the checks that fit the change, but always run the build after editing `default.project.json`, `wally.toml` or file names.
4. Fix root causes. Do not hide real problems with `--!nocheck`, `--!nolint` or `-- selene: allow` comments.
5. Playtesting, multiplayer behavior, real DataStore behavior and performance cannot be verified in a cloud sandbox. List what the user should test in Studio.
6. Report the commands you ran with their results, the checks you could not run, and any remaining risk. Do not claim a playtest happened.
