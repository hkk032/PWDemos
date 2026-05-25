import {test, expect} from "@playwright/test";

test ("Handling Popup Windows", async ({browser}) => {
    const context = await browser.newContext();
    const parentPage = await context.newPage();

    await parentPage.goto("https://testautomationpractice.blogspot.com/");

    await Promise.all([parentPage.waitForEvent("popup"), await parentPage.locator("#PopUp").click()]);

    const allWindows = context.pages();

    for (const page of allWindows) {
        const title = await page.title();
        if (title.includes("playwright")) {
            await page.locator(".getStarted_Sjon").click();
            await parentPage.waitForTimeout(3000);
            await page.close();
        }
    }

    await parentPage.waitForTimeout(5000);

});