import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(viewport={'width': 1280, 'height': 800})
        page = await context.new_page()

        print("Navigating to http://localhost:3003...")
        await page.goto("http://localhost:3003")
        await page.wait_for_timeout(2000)
        await page.screenshot(path="full_page_debug.png", full_page=True)

        # List all buttons
        buttons = await page.evaluate('''() => {
            return Array.from(document.querySelectorAll('button')).map(b => ({
                text: b.innerText,
                ariaLabel: b.getAttribute('aria-label'),
                className: b.className,
                visible: b.offsetWidth > 0 && b.offsetHeight > 0
            }));
        }''')
        print("Buttons found:", buttons)

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
