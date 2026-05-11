import {test, expect, Locator} from "@playwright/test";

// Bootstrap Dropdown: Dropdown that is created using the Bootstrap framework.
// We don't have select tag in bootstrap dropdown, instead we have div or ul tag to create dropdown and options are created using li tag.

test ("Handling hidden bootstrap dropdown", async ({page}) => {
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await page.locator("input[name='username']").fill("Admin");
    await page.locator("input[name='password']").fill("admin123");
    await page.locator("button[type='submit']").click();

    // Navigating to PIM
    await page.getByText("PIM").click();

    // Capturing the dropdown icon for all and clicking on the required one
    await page.locator("form i").nth(2).click();
    await page.waitForTimeout(5000);
    // Capturing dropdown options
    const dropdownOptions:Locator = page.locator("div[role='listbox'] span");
    console.log("Number of options in the dropdown: " + await dropdownOptions.count());
    for (let i=0; i< await dropdownOptions.count(); i++) {
        const optionText:string = await dropdownOptions.nth(i).innerText();
        if (optionText.trim() === "Automation Tester") {
            await dropdownOptions.nth(i).click();
            break;
        }
    }

});