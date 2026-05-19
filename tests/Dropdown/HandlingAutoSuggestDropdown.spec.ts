import {test, expect, Locator} from "@playwright/test";

// Auto-suggest Dropdown: Dropdown that provides suggestions to users as they type in an input field. 
// The options in the dropdown are dynamically generated based on user input and can change in real-time. 
// Ex. When enter something in google search box, it shows suggestions based on what we have entered.

test ("Handling Auto-suggest Dropdown", async ({page}) => {
    await page.goto("https://www.google.com/");
    await page.locator("textarea[name='q']").fill("playwright");

    // auto suggesttion happens with a dynamic ajax call, resulting in options delay
    // so auto wait won't work here, we need to use explicit wait to wait for the options to appear
    await page.waitForTimeout(5000);
    const suggestedOptions:Locator = page.locator("ul[class='G43f7e'] li div[class~='wM6W7d'] span");
    console.log("Number of suggestions: " + await suggestedOptions.count());
    (await suggestedOptions.allTextContents()).forEach(option => console.log(option.trim()));

    // select an option from the auto-suggest dropdown
    const optionToSelect:string = "playwright mcp";
    await suggestedOptions.filter({hasText: optionToSelect}).first().click();
});