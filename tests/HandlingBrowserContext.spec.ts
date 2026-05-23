import {test, expect, firefox} from "@playwright/test";

// Browser ---> Context ---> Page

// Creating page from context, context from browser
test ("Browser Context - creating page from browser", async ({browser}) => {
    // by default it will use the default browser specified in config file
    const context = await browser.newContext();
    const page = await context.newPage();     // creating a new page from the context
    await page.goto("https://testautomationpractice.blogspot.com/");
});

// Creating page from context, context from browser
test.only ("Browser Context - creating page from browser but own browser", async ({}) => {
    // we can create and launch our own browser from here only - so no need to pass browser in async
    const browser = await firefox.launch();
    const context = await browser.newContext();
    const firstPage = await context.newPage();     // creating a new page from the context
    await firstPage.goto("https://testautomationpractice.blogspot.com/");
    const secondPage = await context.newPage();
    await secondPage.goto("https://google.com/");
    console.log("No of pages created: ", context.pages().length);

    await firstPage.waitForTimeout(3000);
    await secondPage.waitForTimeout(2000);
});

// Creating page from context
test ("Browser Context - creating page from context", async ({context}) => {
    const page = await context.newPage();     // creating a new page from the context
    await page.goto("https://testautomationpractice.blogspot.com/");

});