import http.server
import socketserver
import threading
import time
import os
from playwright.sync_api import sync_playwright

PORT = 8765
DIST_DIR = os.path.join(os.path.dirname(__file__), "..", "dist")
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "screenshots")

os.makedirs(OUTPUT_DIR, exist_ok=True)

# Start HTTP server in background
handler = http.server.SimpleHTTPRequestHandler
os.chdir(DIST_DIR)
httpd = socketserver.TCPServer(("", PORT), handler)
server_thread = threading.Thread(target=httpd.serve_forever, daemon=True)
server_thread.start()
time.sleep(1)

BASE_URL = f"http://localhost:{PORT}"

# Pages to screenshot (use .html files since static export puts them at root)
pages = [
    ("/index.html", "01-landing"),
    ("/login.html", "02-login"),
    ("/signup.html", "03-signup"),
    ("/onboarding.html", "04-onboarding"),
    ("/upgrade.html", "05-upgrade"),
    ("/home.html", "06-dashboard"),
    ("/analyzer.html", "07-analyzer"),
    ("/wingman.html", "08-wingman"),
    ("/screenshots.html", "09-screenshots"),
    ("/bio.html", "10-bio"),
    ("/viral.html", "11-viral"),
    ("/profiles.html", "12-profiles"),
    ("/history.html", "13-history"),
    ("/settings.html", "14-settings"),
]

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context(viewport={"width": 390, "height": 844})
    page = context.new_page()

    for path, name in pages:
        url = f"{BASE_URL}{path}"
        print(f"Capturing {name}...")
        try:
            page.goto(url, wait_until="networkidle", timeout=15000)
            time.sleep(1)
            page.screenshot(
                path=os.path.join(OUTPUT_DIR, f"{name}.png"),
                full_page=True
            )
            print(f"  [OK] Saved {name}.png")
        except Exception as e:
            print(f"  [FAIL] {name}: {e}")

    browser.close()

httpd.shutdown()
print(f"\nAll screenshots saved to: {OUTPUT_DIR}")
