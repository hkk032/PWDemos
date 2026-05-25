// 3 types
// 1. Add trace option in config file
// trace options - 'on', 'off', 
// 'on-first-retry' : will capture trace info only on first retry, 
// 'retain-on-failure' : it will ignore preivous passed test, will capture trace on every retry failure and remove older one, 
// 'on-all-retries' : will capture trace info on all retries, 
// 'retry-with-trace' : will capture trace on all retries, 
// 'retain-on-first-failure' : will capture trace on first failure and remove older one

import {test, expect} from "@playwright/test";

test ("Capturing Trace", async ({page}) => {
    await page.goto("https://demowebshop.tricentis.com/");
    const timestamp = Date.now();
    // Capturing Trace
    // This will save trace in test-results folder
    await page.locator("#small-searchterms").fill("Computer");
    await expect(page.locator("#small-searchterms")).not.toBeVisible(); // This will fail
});

// To view trace, we need to open the report using npx playwright show-report
// Or we can use npx playwright show-trace <trace-file-name along with path> to view specific trace file, this will open trace viewer in browser

// OR goto trace.playwright.dev and upload trace file to view trace info, this is useful when we want to share trace info with someone else, 
// we can share trace file and they can view it in their browser without needing to open report

// ***** Imp: To triger trace only for a specific test, then when running test
// use npx playwright test <test-file-name> --trace on, this will override the trace option in config file and capture trace for that specific test

