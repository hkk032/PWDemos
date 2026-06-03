import { test, expect } from "@playwright/test";

test.beforeEach('launching app', async ({ page }) => {

    await page.goto("https://demowebshop.tricentis.com/")
});

test('logotest', async ({ page }) => {
    await expect(page.locator("img[alt='Tricentis Demo Web Shop']")).toBeVisible();
});

test('title test', async ({ page }) => {
    expect(await page.title()).toContain("Demo Web Shop1");

});

test('search test', async ({ page }) => {
    await page.locator('#small-searchterms').fill("laptop"); // fill teh text in search box
    await page.locator("input[value='Search']").click();
    await expect.soft(page.locator('h2 a').nth(0)).toContainText("laptop", { ignoreCase: true });
});

// to generate allure report intall
// npm install -D allure-playwright
// then in config file can specify reporter: 'allure-playwright'
// but this only generates allure results in json format, to generate the report we need to run the below command in terminal
// allure generate ./allure-results -o ./allure-report --clean 
// (here clean is optional - it will remove the previous report and generate new one, if not specified then it will keep the previous report and add the new results to it)
// and to see the allure report run allure open ./allure-report