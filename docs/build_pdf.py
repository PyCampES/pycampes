"""Generate the PDF of the organizers guide from its Markdown source.

Usage (from the repository root, needs uv: https://docs.astral.sh/uv/):

    uv run --with markdown --with weasyprint python docs/build_pdf.py

Writes docs/guia-organizadores-pycamp.pdf next to the Markdown file.
"""

import re
from pathlib import Path

import markdown
from weasyprint import HTML

HERE = Path(__file__).parent
SOURCE = HERE / "guia-organizadores-pycamp.md"
TARGET = SOURCE.with_suffix(".pdf")

CSS = """
@page { size: A4; margin: 2cm 1.8cm; @bottom-center { content: counter(page); font-size: 9pt; color: #756657; } }
body { font-family: "Nunito", "DejaVu Sans", sans-serif; font-size: 10.5pt; line-height: 1.5; color: #30261d; }
h1, h2, h3 { color: #2d5c23; line-height: 1.25; }
h1 { font-size: 22pt; }
h2 { font-size: 16pt; border-bottom: 2px solid #eee7dd; padding-bottom: 4px; margin-top: 1.6em; }
h3 { font-size: 12.5pt; margin-top: 1.3em; }
a { color: #417d36; text-decoration: none; }
code { background: #f7f5ed; padding: 1px 4px; border-radius: 3px; font-size: 9.5pt; }
table { border-collapse: collapse; width: 100%; margin: 1em 0; font-size: 9.5pt; }
th, td { border: 1px solid #e2dacf; padding: 5px 7px; vertical-align: top; text-align: left; }
th { background: #e8f3e2; }
blockquote { margin: 1em 0; padding: 0.5em 1em; background: #f7f5ed; border-left: 4px solid #edbf59; }
li { margin: 0.15em 0; }
"""


def nest_lists(text):
    # GitHub nests list items indented by 2 spaces; Python-Markdown needs 4.
    return re.sub(
        r"^((?:  )+)(?=(?:[-*+]|\d+\.) )",
        lambda m: m.group(1) * 2,
        text,
        flags=re.MULTILINE,
    )


def main():
    body = markdown.markdown(
        nest_lists(SOURCE.read_text(encoding="utf-8")),
        extensions=["tables", "fenced_code", "sane_lists", "toc"],
    )
    html = (
        '<!doctype html><html lang="es"><head><meta charset="utf-8">'
        f"<style>{CSS}</style></head><body>{body}</body></html>"
    )
    HTML(string=html, base_url=str(HERE)).write_pdf(TARGET)
    print(f"{SOURCE.name} -> {TARGET}")


if __name__ == "__main__":
    main()
