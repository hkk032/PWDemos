import {test, expect} from "@playwright/test";

test ("Handling Popup Windows - Injecting creds in URL", async ({browser}) => {
    test.setTimeout(30000);  // 30 seconds timeout for all the steps in this test case - -similar to implicit wait in Selenium
    const context = await browser.newContext();
    const parentPage = await context.newPage();

    // Approach 1 - Injecting creds along with URL
    // https://username:password@the-internet.herokuapp.com/basic_auth
    await parentPage.goto("http://admin:admin@the-internet.herokuapp.com/basic_auth");
    // without explicit wait/timwout
    await expect (parentPage.locator("text=error")).toBeVisible();
    // with explicit wait/timeout
    await expect (parentPage.locator("text=error")).toBeVisible({timeout: 10000}); // 10 seconds timeout for this step only - similar to explicit wait in Selenium

    await parentPage.waitForTimeout(5000);

});

test ("Handling Popup Windows - Passing creds in browser context", async ({browser}) => {
    // adding creds in newContext using httpCredentials
    const context = await browser.newContext({httpCredentials:{username:'admin', password:'admin'}});
    const parentPage = await context.newPage();

    // Approach 2 - Passing creds in browserContext - preferred approach
    await parentPage.goto("https://the-internet.herokuapp.com/basic_auth");
    await expect (parentPage.locator("text=error")).toBeVisible();

    await parentPage.waitForTimeout(5000);

});