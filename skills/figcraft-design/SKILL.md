---
name: figcraft-design
description: Use when designing screens, UI mockups or design systems with the FigCraft editor through its MCP server instead of Figma.
---

# Designing with FigCraft over MCP

FigCraft is an offline, open-source design editor (alpha). Files are `.figcraft`. Its MCP server is started with `figcraft-cli mcp` (headless) or `figcraft-cli mcp --attach <port>` (drives the running app started with `figcraft --control <port>`).

1. Confirm the `figcraft` MCP tools exist (`list_commands`, `create_node`, `batch`...). If not, say the server is not connected and point to `docs/mcp.md` in the FigCraft repository; do not invent output.
2. Prefer a starter template over an empty page: `run_command` with `template.list`, then `file.newFromTemplate {template}` (`mobile-app`, `landing-page`, `dashboard`, `design-system`, `wireframe-kit`, `social-posts`, `slides`, `icon-set`).
3. Coordinates are page units, x right and y down. `x`/`y` in `create_node` and `set_properties` are relative to the parent frame.
4. Lay out with auto layout, not coordinates: set `layout`, `gap`, `padding`, `mainAlign`, `crossAlign` and `sizingH`/`sizingV` (`fixed`, `hug`, `fill`). A child cannot `fill` an axis its parent hugs.
5. Colours are `"#RRGGBB"` or `"#RRGGBBAA"`. Gradients: `{"type":"linearGradient","stops":["#7048E8","#1098AD"]}`.
6. Build reusable pieces as components and variants (`component.create`), and put colours and sizes in styles and variables (`style.create`, `variable.bind`) instead of repeating raw values.
7. Group related edits in `batch` so they are one undo step. A later step can reuse an earlier id with `{"$step": n}`. A failed command leaves the document unchanged.
8. Find exact command names and parameters with `list_commands {filter}` before guessing.
9. Verify every change: `get_node` or `inspect_document` for numbers, `screenshot` for pixels. Do not report a design as done without a screenshot.
10. Hand off with `export` (png, jpg, svg, webp, pdf) or `inspect.code` (CSS, HTML, React, SwiftUI, Compose). Save with `save_file`.
11. Restrict file access when asked: start the server with `--automation-read-root DIR` and `--automation-write-root DIR`.

FigCraft is alpha and has not been tested on real Figma files. Say so when importing `.fig` files, and report anything that fails instead of working around it silently.
