"""Checks site copy for punctuation and words the house style does not allow.

Scans string literals and JSX text in the given folders for em and en dashes,
semicolons inside quoted prose, and a list of banned filler words.
Usage: python scripts/copy_lint.py src/content src/components src/app
"""

import pathlib
import re
import sys

BANNED = [
    "leverage", "leveraged", "utilize", "utilized", "spearheaded", "harnessed", "robust",
    "seamless", "seamlessly", "cutting-edge", "state-of-the-art", "innovative", "transformative",
    "synergy", "empower", "delve", "pivotal", "meticulous", "comprehensive", "showcasing",
    "fostering", "navigating", "landscape", "realm", "elevate", "unlock", "supercharge",
    "game-changing", "passionate", "results-driven", "proven track record", "worked on",
    "responsible for", "helped", "llmops", "enterprise-grade", "end-to-end solution", "ensuring",
    "strictly", "$8m", "1.5m",
]

# Prose lives in double-quoted strings and in JSX text between tags.
STRING = re.compile(r'"((?:[^"\\\n]|\\.){12,})"')
JSX_TEXT = re.compile(r">\s*([A-Za-z][^<>{}\n]{12,})\s*<")


def prose(text: str):
    for m in STRING.finditer(text):
        s = m.group(1)
        if " " in s and not s.startswith(("http", "/", "@", "M", "rgba")) and "className" not in s:
            yield m.start(), s
    for m in JSX_TEXT.finditer(text):
        yield m.start(), m.group(1)


def main(dirs):
    problems = 0
    for d in dirs:
        for path in sorted(pathlib.Path(d).rglob("*")):
            if path.suffix not in {".ts", ".tsx"}:
                continue
            text = path.read_text(encoding="utf-8")
            for ch, name in (("—", "em dash"), ("–", "en dash")):
                for m in re.finditer(ch, text):
                    line = text.count("\n", 0, m.start()) + 1
                    print(f"{path}:{line}: {name}")
                    problems += 1
            for pos, s in prose(text):
                line = text.count("\n", 0, pos) + 1
                low = s.lower()
                if ";" in s and "&" not in s:
                    print(f"{path}:{line}: semicolon in copy: {s[:70]}")
                    problems += 1
                for w in BANNED:
                    if re.search(rf"(?<![a-z]){re.escape(w)}(?![a-z])", low):
                        print(f"{path}:{line}: banned word '{w}': {s[:70]}")
                        problems += 1
    print(f"{problems} problem(s)")
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:] or ["src"]))
