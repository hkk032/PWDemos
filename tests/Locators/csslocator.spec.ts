import {test, expect, Locator} from "@playwright/test";

test ("Css Locator", async ({page}) => {
    await page.goto("https://demowebshop.tricentis.com/");

    // 1. tag and id -> tag#id
    const searchBox:Locator = page.locator("input#small-searchterms");
    await searchBox.fill("T-shirts");

    // 2. tag and class -> tag.class
    await page.locator("input.search-box-text").fill("T-shirts");
    
    // 3. tag and attribute -> tag[attribute='value']
    await page.locator("input[name=q]").fill("T-shirts");
    //or
    await page.locator("[name=q]").fill("T-shirts");

    // 4. tag.class and attribute -> tag.class[attribute='value']
    await page.locator(".search-box-text[value='Search Store']").fill("T-shirts");
});