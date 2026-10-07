---
name: focused-change
description: Use for a bounded code change where preserving scope and reusing existing patterns can reduce retries and context consumption.
---

# Focused change

1. Identify the requested behavior, acceptance criteria and constraints. For a simple edit, skip a formal plan; for complex work, keep a short plan.
2. Inspect applicable project instructions, the target code and one relevant existing implementation or test.
3. Make the smallest coherent change that fully solves the request. Preserve user changes. Avoid unrelated formatting, refactors and dependencies.
4. Follow existing APIs and conventions. Verify uncertain contracts rather than inventing them.
5. Inspect the diff for accidental changes, missing callers and edge cases. Validate according to the change's risk and project requirements.
6. Stop after acceptance criteria and required checks pass. Broaden work only for new evidence or unresolved failures.
7. Summarize behavior changed, validation and material limitations without reproducing the patch.

Token economy never justifies skipping an essential fix, masking errors, or claiming checks were run when they were not.
