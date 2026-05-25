import {test, expect} from "@playwright/test";

test ("Capturing Screenshot", async ({page}) => {
    await page.goto("https://demowebshop.tricentis.com/");
    const timestamp = Date.now();
    // If running script again and again and screenshot name is same then it will override the previous screenshot, 
    // so to avoid that we are using timestamp in screenshot name
    // Full Visible Page Screenshot
    await page.screenshot({path: `screenshots/fullVisiblePageScreenshot_${timestamp}.png`});

    // Full Page Screenshot - Top to Bottom
    await page.screenshot({path: `screenshots/fullPageScreenshot_${timestamp}.png`, fullPage: true});

    // Capturing Screenshot of Specific Element
    const elementToCapture = page.locator("img[alt='Tricentis Demo Web Shop']");
    await elementToCapture.screenshot({path: `screenshots/elementScreenshot_${timestamp}.png`});
    // Alternate way to capture element screenshot
    await page.locator(".product-grid").screenshot({path: `screenshots/productsScreenshot_${timestamp}.png`});

    // Capturing Screenshot on Failure
    // This is configured in playwright.config.ts file, we have set screenshot to only-on-failure, 
    // so if any test case fails then it will automatically capture screenshot and save it in screenshots folder with test name and timestamp
    // screenshot: 'only-on-failure', 'on' - will capture screenshot everytime, 'off', 'on-first-failure'
    // This will save screenshot in test-results folder
    await page.locator("#small-searchterms").fill("Computer");
    await expect(page.locator("#small-searchterms")).not.toBeVisible(); // This will fail and capture screenshot
});

test.only ("Capturing Video", async ({page}) => {
    await page.goto("https://demowebshop.tricentis.com/");
    const timestamp = Date.now();
    // Capturing Video
    // This is configured in playwright.config.ts file, we have set video property, 
    // video: 
    // 'on' - will capture video everytime, 
    // 'off' - won't capture video, 
    // 'on-first-retry', 
    // 'retain-on-failure' - will create video only on failure, if it passes in retry video won't be there, and will remove older video 
    // 'retry-with-video'
    // This will save video in test-results folder
    await page.locator("#small-searchterms").fill("Computer");
    await expect(page.locator("#small-searchterms")).not.toBeVisible(); // This will fail and capture video
});