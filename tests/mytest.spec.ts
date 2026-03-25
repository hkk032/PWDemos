import {test, expect} from '@playwright/test';

// there are multiple inbuild fixtures (global variables) in playwright we can use for testing : page, browser, context

// page is a fixture we are passing as arg to the function
// whatever fixture we want to use have to be passed as arg to the function inside curly braces

// if a task is successful we call it as promise is resolved and if it is failed we call it as promise is rejected
// promise is a background task which is going to be completed in future and it can be either resolved or rejected
// if a promise is rejected then it'll wait for 30 seconds before it fails the test

// we use await as statements are asynchronous and we want to wait for the promise to be resolved before moving to next line of code
// but we need to make sure whole function is following async nature, so we need to add async keyword before the function
// both async and await go hand in hand, we can't use await without async and vice versa. If not using don't use either of them

// ***** when we run any test in console we see running N tests using N workers, workers are browsers here, 
// so if we have 3 tests and 3 workers then each test will run in separate browser, if we have 3 tests and 1 worker then all tests will run in same browser one by one

test ("Verify the title of the page", async ({page}) => {
    await page.goto("https://the-internet.herokuapp.com/");

    // printing page title
    console.log("Page title is ", await page.title());

    // expect is like assert - it will validate during runtime but won't capture or print value
    await expect(page).toHaveTitle("The Internet");
});