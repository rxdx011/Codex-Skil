#!/usr/bin/env python3
"""Install bundled Codex skills without overwriting existing directories."""
import argparse
from pathlib import Path
import shutil


def main():
    source = Path(__file__).resolve().parent.parent / "skills"
    names = sorted(p.name for p in source.iterdir() if p.is_dir())
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--skill", choices=names, action="append", help="Install only this skill (repeatable)")
    parser.add_argument("--dest", type=Path, default=Path.home() / ".agents" / "skills")
    args = parser.parse_args()
    selected = sorted(set(args.skill or names))
    destination = args.dest.expanduser().resolve()
    for name in selected:
        target = destination / name
        if target.exists() or target.is_symlink():
            parser.error(f"Refusing to overwrite: {target}")
    destination.mkdir(parents=True, exist_ok=True)
    for name in selected:
        shutil.copytree(source / name, destination / name)
        print(f"Installed {name} -> {destination / name}")


if __name__ == "__main__":
    main()
