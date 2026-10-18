---
name: roblox-data-persistence
description: Use when saving player or game data with DataStoreService, including player profiles, session locking and autosave.
---

# Roblox data persistence

1. Use one DataStore per data type and a versioned name, such as `PlayerData_v1`, with keys like `"Player_" .. userId`. The version lets you migrate later.
2. Load profiles in `PlayerAdded` before the player spawns. If loading fails, hold or kick the player. Never give a default profile that could overwrite real saved data.
3. Use `UpdateAsync` for read-modify-write. Use `SetAsync` only for first writes or data with no contention.
4. Wrap every DataStore call in `pcall` and retry with exponential backoff (for example 3 attempts, waiting 1, 2 and 4 seconds). Do not spam requests.
5. Use session locking, or a library such as ProfileStore, so two servers cannot write the same profile at the same time.
6. Autosave periodically and on `PlayerRemoving`. In `game:BindToClose`, save every loaded profile and wait until the saves finish.
7. Store only plain tables of strings, numbers and booleans. Never store Instances or functions. When loading, fill missing keys from defaults and validate types.
8. Keep serialization and migration logic in pure Luau so it can be checked without Studio. Say which persistence behavior still needs a live Studio test.
