import asyncio
from playwright.async_api import async_playwright
import time

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(viewport={'width': 1280, 'height': 800})
        page = await context.new_page()

        print("Navigating to http://localhost:3003...")
        try:
            await page.goto("http://localhost:3003", timeout=30000)
        except Exception as e:
            print(f"Failed to load page: {e}")
            await browser.close()
            return

        # Wait for content to load
        await page.wait_for_selector('text=PROOFCHAINS', timeout=10000)

        # Test Language Selector
        print("Testing language selector...")
        lang_btn = page.locator('button[aria-label="Switch language"]')
        await lang_btn.click()
        await page.wait_for_selector('button:has-text("Français")', state="visible")
        await page.screenshot(path="screenshot_lang_dropdown.png")

        fr_btn = page.locator('button:has-text("Français")')
        await fr_btn.click()
        await page.wait_for_timeout(1000)

        # Test Theme Toggle
        print("Testing theme toggle...")
        theme_btn = page.locator('button[aria-label="Toggle theme"]')
        await theme_btn.click()
        await page.wait_for_selector('button:has-text("Sombre")', state="visible")
        await page.screenshot(path="screenshot_theme_dropdown.png")

        dark_btn = page.locator('button:has-text("Sombre")')
        await dark_btn.click()
        await page.wait_for_timeout(1000)
        await page.screenshot(path="screenshot_landing_dark.png")

        print("Verification complete. Screenshots saved.")
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
