import {test, expect, firefox} from "@playwright/test";

test ("Handling Tabs", async ({}) => {
    const browser = await firefox.launch();
    const context = await browser.newContext();
    const firstPage = await context.newPage();

    await firstPage.goto("https://testautomationpractice.blogspot.com/");
    // on clicking button, it will trigger an event
    // so we need to listen to that event and get the page object of the newly opened tab
    // needs to be placed before click, so when click happens, it will listen to event
    // and the click also needs to be triggered parallely using Promise.all - commented will not work
    /* context.waitForEvent("page");
    await firstPage.locator('button:has-text("New Tab")').click();
    OR
    await firstPage.locator('button:has-text("New Tab")').click();
    context.waitForEvent("page"); */
    // kept the childPage in square brackets, as it can be void also. If void actions cannot be performed
    const [childPage] = await Promise.all([context.waitForEvent("page"), await firstPage.locator('button:has-text("New Tab")').click()]);

    // Approach 1 - switch between pages and get titles
    const allPages = context.pages();
    console.log("First page title: ", await allPages[0].title());
    console.log("Second page title: ", await allPages[1].title());

    // Approach 2 - directly from created pages
    console.log("First page title: ", await firstPage.title());
    console.log("Second page title: ", await childPage.title());

});