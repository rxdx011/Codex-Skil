---
name: targeted-validation
description: Use after a code change to select meaningful checks and keep diagnostic output focused while honoring required validation.
---

# Targeted validation

1. Identify affected behavior and mandatory checks from project instructions and CI configuration.
2. Start with existing focused tests or a direct verification that exercises the changed behavior. Add a regression test when it catches a meaningful failure.
3. Run broader checks when shared interfaces, configuration, dependencies or cross-cutting behavior changed, or when required by the project.
4. Keep full diagnostic logs locally when output is large. Surface exit status, failed test names and the relevant error excerpt; never hide failures behind a successful pipe command.
5. On failure, inspect the first actionable cause and rerun affected checks after fixing it. Do not repeatedly run an unchanged passing suite without a reason.
6. Report what passed, what failed and what could not run. State remaining uncertainty.

Do not add tests that merely restate the implementation. Never replace necessary validation with a token limit or truncate away evidence needed to debug a failure.
