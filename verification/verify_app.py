from playwright.sync_api import Page, expect, sync_playwright

def take_screenshots(page: Page):
    page.goto("http://localhost:4173")
    page.wait_for_selector("text=Aggiungi Ristorante")

    # Take home screenshot
    page.screenshot(path="verification/home.png")

    # Add a restaurant
    page.click("text=Aggiungi Ristorante")
    page.fill("input[placeholder*='Nome']", "Sushi Zen")
    page.click("button:has-text('Aggiungi'), button:has-text('Salva')")

    # Wait for restaurant to be added and navigate to it
    page.click("text=Sushi Zen")

    # Take restaurant detail screenshot
    page.wait_for_timeout(1000)
    page.screenshot(path="verification/restaurant.png")

    # Add a dish
    page.click("button:has-text('Aggiungi'), [aria-label*='piatto']")
    page.fill("input[placeholder*='nome']", "Nigiri Salmone")
    page.fill("input[placeholder*='numero']", "24")
    page.click("button:has-text('Aggiungi'), button:has-text('Salva')")

    # Take dish list screenshot
    page.wait_for_timeout(1000)
    page.screenshot(path="verification/dishes.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 375, 'height': 812}, is_mobile=True)
        page = context.new_page()
        try:
            take_screenshots(page)
        finally:
            browser.close()
