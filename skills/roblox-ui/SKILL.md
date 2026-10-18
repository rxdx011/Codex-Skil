---
name: roblox-ui
description: Use when building Roblox GUI (ScreenGui, frames, buttons, HUDs) that must work on PC, mobile and console.
---

# Roblox UI

1. Define each screen in one place: Rojo-managed Instances under `StarterGui`, or code built by one helper. Do not maintain the same screen in both code and Studio.
2. Use `UDim2.fromScale` for layout and `UDim2.fromOffset` for small fixed details. Prefer `UIListLayout`, `UIPadding`, `UIAspectRatioConstraint` and `UIScale` over hard-coded pixel positions.
3. Set `ScreenGui.ResetOnSpawn = false` for persistent HUDs. Change `IgnoreGuiInset` only when intended.
4. Handle input with `ContextActionService` or `UserInputService`. Bind one action for keyboard, gamepad and touch, and provide on-screen buttons for touch.
5. Keep text readable: use `TextScaled` with a `UITextSizeConstraint`, and check that labels fit their `TextBounds`. Use localization if the game ships in several languages.
6. Keep UI as presentation. Send requests through remotes (see `roblox-remote-security`). The UI must not be the authority for currency or inventory.
7. Disconnect UI connections when a screen closes. Show and hide screens consistently with `Enabled` or by destroying them.
8. Check layouts at phone and PC sizes with Studio's device preview before calling a UI change done. If that check was not possible, say so.
