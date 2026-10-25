---
name: roblox-game-growth
description: Use when planning or reviewing a Roblox game's onboarding, retention, friend co-play, store page and update plan to improve discovery.
---

# Roblox growth and retention

Discovery rules change. Treat specific numbers from creator reports (evaluation windows, thresholds, percentages) as hints, and check Roblox's official Creator documentation and the game's own analytics before relying on them. Never claim an algorithm result; only post-launch analytics can show one.

1. Plan retention in three windows: day 1 (first session), days 2-7 (return loop) and days 8-28 (long-term content). For each, write down why the player comes back.
2. Reduce first-play bounce. Give control within seconds of spawning, avoid long loading screens or cutscenes before play, set one clear first goal, and give a first reward within the first minute. Teach by playing, not by text walls.
3. Extend sessions with chained short goals, visible progress and an upgrade just within reach. Avoid dead ends where the player has nothing to do.
4. Support playing with friends: easy joining, shared goals, duo or party modes, and bonuses for playing together. Keep social features safe and within Roblox policy; do not force chat.
5. Plan day 8 and beyond before launch: a dated list of updates, daily or weekly rewards, events and new content. Content that ends after a week loses players.
6. Store page: use real gameplay footage and screenshots, not misleading cinematics. Make the icon, thumbnail and name original. Do not copy other games' names, thumbnails or assets.
7. Monetization must not hurt the first session. Sell convenience and cosmetics; never block core progress behind a purchase. Follow Roblox's monetization and content-maturity rules.
8. Instrument the game with `AnalyticsService` funnel and economy events, such as first spawn, tutorial done, first purchase and return visits. Decide the question and metric before adding an event, and log no personal data.
9. When proposing a change, name the window and metric it targets (for example, "reduces day-1 bounce"), and how it will be measured after launch.
10. For gameplay and server code, also apply `roblox-remote-security` and `roblox-data-persistence`; retention features such as streaks and rewards must be saved and validated on the server.
