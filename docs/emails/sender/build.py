"""Generate Sender.net-ready HTML from the emails exported from MailerLite.

Sender needs absolute image URLs. The images live in public/emails/, so the
website publishes them at https://pycamp.es/<year>/emails/. Each yearly version
of the site stays online, so those URLs keep working in later years.

Usage (from the repository root):

    python3 docs/emails/sender/build.py [year]

The year defaults to 2027: use the edition whose site version publishes the
images.
"""

import sys
from pathlib import Path

from bs4 import BeautifulSoup

HERE = Path(__file__).parent
EMAILS = HERE.parent
BASE_URL = "https://pycamp.es/{year}/emails/"
DEFAULT_YEAR = "2027"

# source email -> output file
EMAILS_TO_BUILD = {
    "automations/email-de-bienvenida-bienvenida.html": "bienvenida.html",
}

# original image (as exported) -> optimized copy in public/emails/
IMAGES = {
    "ef80f3d45167.png": "logo-pycamp.png",
    "3a1a827cb3af.png": "bienvenida-foto-grupal.jpg",
    "ml-white-email.png": "social-email.png",
    "ml-white-telegram.png": "social-telegram.png",
    "ml-white-x.png": "social-x.png",
    "ml-white-github.png": "social-github.png",
    "ml-white-linkedin.png": "social-linkedin.png",
}


# Links that changed with the new website.
LINKS = {
    "https://pycamp.es/faq.html": "https://pycamp.es/faqs",
}


def convert(html, base):
    soup = BeautifulSoup(html, "html.parser")

    # MailerLite-only links: "view in browser" and the "Sent by MailerLite" badge.
    for a in soup.select('a[data-link-type="webview"]'):
        a.decompose()
    for tr in soup.select("tr.ml-hide-branding"):
        tr.decompose()

    # Unsubscribe link: Sender's merge tag.
    for a in soup.select('a[data-link-type="unsubscribe"]'):
        a["href"] = "{$unsubscribe_link}"

    for a in soup.find_all("a", href=True):
        a["href"] = LINKS.get(a["href"], a["href"])

    # MailerLite builder/tracking attributes.
    for tag in soup.find_all(True):
        for attr in ("builder-link-id", "data-link-id", "data-link-type"):
            tag.attrs.pop(attr, None)

    # Images: absolute URLs to the optimized copies.
    for img in soup.find_all("img"):
        name = Path(img["src"]).name
        if name not in IMAGES:
            raise SystemExit(f"No optimized copy for image {name}")
        img["src"] = base + IMAGES[name]

    return str(soup)


def main():
    if len(sys.argv) > 2:
        raise SystemExit(__doc__)
    year = sys.argv[1] if len(sys.argv) == 2 else DEFAULT_YEAR
    base = BASE_URL.format(year=year)
    for source, target in EMAILS_TO_BUILD.items():
        html = (EMAILS / source).read_text(encoding="utf-8")
        (HERE / target).write_text(convert(html, base), encoding="utf-8")
        print(f"{source} -> {HERE / target}")


if __name__ == "__main__":
    main()
