---
name: roblox-remote-security
description: Use when adding or reviewing RemoteEvents, RemoteFunctions or any client-to-server communication in a Roblox game.
---

# Roblox remote security

1. Treat every argument received in `OnServerEvent` or `OnServerInvoke` as hostile. Check types with `typeof`, check numeric ranges, and cap string and table sizes before use.
2. Let the server decide outcomes. Clients send intent (for example, "buy item X"), never results such as gold, damage, position or inventory contents.
3. Check the sender's rights against server state: ownership, cooldowns, currency, distance to the target. Never trust a player or user ID that the client supplies.
4. Rate-limit each remote per player with a timestamp or token bucket. Drop or reject excess calls.
5. Do not call `RemoteFunction:InvokeClient` from server code. A stalled or malicious client can block the server thread. Use RemoteEvents for server-to-client messages.
6. Reject unexpected keys in received tables instead of iterating over them blindly.
7. Keep all remotes in one folder, such as `ReplicatedStorage/Remotes`, created by Rojo or once by server code. Reference them with `WaitForChild`.
8. Keep security-sensitive logic (DataStore writes, currency, admin checks) in `ServerScriptService`, where clients cannot read or change it.
