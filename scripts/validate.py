#!/usr/bin/env python3
"""Check the bundled skill metadata and a conservative source-size budget."""
from pathlib import Path
import re
import sys


def main():
    root = Path(__file__).resolve().parent.parent
    files = sorted((root / "skills").glob("*/SKILL.md"))
    errors = []
    if not files:
        errors.append("No skills found")
    for path in files:
        text = path.read_text(encoding="utf-8")
        match = re.match(r"\A---\nname: ([a-z0-9-]+)\ndescription: ([^\n]+)\n---\n(.+)\Z", text, re.S)
        if not match:
            errors.append(f"{path.parent.name}: invalid metadata or empty body")
            continue
        if match.group(1) != path.parent.name:
            errors.append(f"{path.parent.name}: directory/name mismatch")
        if len(text.encode("utf-8")) > 4096:
            errors.append(f"{path.parent.name}: exceeds 4096-byte source budget")
        print(f"{path.parent.name}: {len(text.encode('utf-8'))} bytes (not a token count)")
    for error in errors:
        print(error, file=sys.stderr)
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
