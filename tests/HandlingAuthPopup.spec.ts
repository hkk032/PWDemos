import {test, expect} from "@playwright/test";

test ("Handling Popup Windows - Injecting creds in URL", async ({browser}) => {
    const context = await browser.newContext();
    const parentPage = await context.newPage();

    // Approach 1 - Injecting creds along with URL
    // https://username:password@the-internet.herokuapp.com/basic_auth
    await parentPage.goto("http://admin:admin@the-internet.herokuapp.com/basic_auth");
    await expect (parentPage.locator("text=error")).toBeVisible();

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