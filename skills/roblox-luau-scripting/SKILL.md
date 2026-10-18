---
name: roblox-luau-scripting
description: Use when writing or reviewing Luau code for Roblox server scripts, client scripts or ModuleScripts.
---

# Luau scripting for Roblox

1. Use the `task` library: `task.wait`, `task.spawn`, `task.defer`, `task.delay`. Do not use the deprecated global `wait`, `spawn` or `delay`. Use `RunService.Heartbeat` or `RenderStepped` for per-frame logic.
2. Get services with `game:GetService("ServiceName")`, not `game.ServiceName`.
3. Connect events with `:Connect`. Store connections that must be disconnected later, and clean them up on `PlayerRemoving`, `CharacterRemoving` or `Destroying` to avoid leaks.
4. Handle players already in the server at startup as well as `Players.PlayerAdded`: `for _, player in Players:GetPlayers() do`.
5. Wait for objects explicitly with `WaitForChild("Name")`. Use `CharacterAdded` for respawns and `Players.LocalPlayer` only in client code.
6. Put shared logic in ModuleScripts under `src/shared`. Keep server-only state out of client-reachable locations.
7. Annotate public functions and module tables with types, and use `export type` for shared shapes. Use `local` everywhere and `table.freeze` for constant config.
8. Wrap failure-prone calls (DataStore, HTTP, MarketplaceService) in `pcall` or `xpcall` and handle the error path. Never swallow errors silently.
9. Check results of `FindFirstChild` before indexing. Avoid long chains of unchecked lookups.
10. Keep hot loops free of avoidable allocations and `Clone()` calls. Reuse instances or pool them when the code runs every frame.
