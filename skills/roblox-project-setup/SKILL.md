---
name: roblox-project-setup
description: Use when creating or organizing a Roblox game project developed with Rojo, Wally and Luau outside Roblox Studio.
---

# Roblox project setup

1. Read the repository's agent instructions (AGENTS.md, CLAUDE.md) and any existing `default.project.json`, `wally.toml` and tool config before creating files.
2. Treat Rojo as the source of truth. Keep code in `src/` and map it in `default.project.json`:
   - `src/server` → `ServerScriptService`
   - `src/client` → `StarterPlayer/StarterPlayerScripts`
   - `src/shared` → `ReplicatedStorage`
   Never place server-only code or secrets in `ReplicatedStorage`; clients can read it.
3. File names set the Instance type: `*.server.luau` → Script, `*.client.luau` → LocalScript, `*.luau` → ModuleScript. A folder containing `init.server.luau` (or `init.luau`) becomes a script with children.
4. Pin tools (Rojo, Wally, StyLua, Selene, luau-lsp) in a toolchain file such as `rokit.toml` or `aftman.toml`. Do not rely on globally installed versions.
5. Add third-party packages with Wally and `wally.toml`. Do not copy library source into the project by hand.
6. Follow the repository's convention for committing `Packages/`. Ignore built places (`*.rbxl`, `*.rbxlx`) unless the project tracks them.
7. After changing the project structure, `default.project.json`, `wally.toml` or file names, run `rojo build default.project.json -o build.rbxlx` to confirm the tree maps correctly.
8. Studio cannot run in a cloud sandbox. Say when a change needs a Studio playtest.
