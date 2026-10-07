---
name: context-efficient
description: Use when locating code or investigating a repository and selective reading can reduce unnecessary context.
---

# Context-efficient investigation

1. Define the question to answer. Read applicable AGENTS.md instructions before editing.
2. Locate candidate paths with `rg --files`; search symbols with scoped `rg -n`. Respect ignore rules; avoid dependency, generated, binary and secret files unless necessary.
3. Read the matching function and enough surrounding code to understand imports, callers and invariants. Expand only when the evidence requires it.
4. Batch independent searches or reads. Keep operations depending on earlier results sequential.
5. Bound tool output. If results are truncated, narrow the query or read the relevant remaining range; never treat a truncated result as complete.
6. Reuse findings within the session. Re-read when the file changed or the evidence is uncertain.
7. Report relevant paths and the conclusion briefly. If the first scoped search fails, widen deliberately; do not guess from missing evidence.

Do not dump the whole repository, repeatedly read unchanged files, or sacrifice necessary context to meet an arbitrary token budget.
