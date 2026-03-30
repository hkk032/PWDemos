import {test, expect, Locator} from "@playwright/test";

test("Xpath Locator", async ({page}) => {
    await page.goto("https://demowebshop.tricentis.com/");

    //Absolute Xpath
    //For code to recognize it to be cpath either we can give xpath= or // before html tag
    // const logoAbsolute:Locator = page.locator("xpath = //html[1]/body[1]/div[4]/div[1]/div[1]/div[1]/a[1]/img[1]");
    const logoAbsolute:Locator = page.locator("xpath = /html[1]/body[1]/div[4]/div[1]/div[1]/div[1]/a[1]/img[1]");
    await expect(logoAbsolute).toBeVisible();

    //Relative Xpath
    const logoRelative:Locator = page.locator("//img[@alt='Tricentis Demo Web Shop']");
    await expect(logoRelative).toBeVisible();

    //Xpath methods
    //1 - contains()
    //In TS, even if it is returning a list of elements, we'll use page.locator and store in Locator variable, not array
    const products:Locator = page.locator("//h2//a[contains(@href, 'computer')]");
});