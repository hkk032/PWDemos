import {test, expect, Locator} from "@playwright/test";

// Text Input
test ('Text Input Actions', async({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    const name:Locator = page.locator('#name');
    await expect(name).toBeVisible();
    await expect(name).toBeEnabled();
    const nameNaxLength:any = await name.getAttribute("maxlength");
    console.log("Max length of the input box is: " + nameNaxLength);
    expect(nameNaxLength).toBe("15");
    await name.fill("John Doe");
    //get text if input field (textContent return empty)
    console.log(await name.inputValue());
    //similar to Java Thread.sleep we have below to hold execution for some time
    await page.waitForTimeout(3000);
});

// Radio Button
test ('Radio Button Actions', async({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    const maleRadioButton:Locator = page.locator('#male');
    await expect(maleRadioButton).toBeVisible();
    await maleRadioButton.check();
    await expect(maleRadioButton).toBeChecked();
    //OR
    await expect(maleRadioButton.isChecked()).toBe(true);
    // uncheck cannot be used with radio button, it will throw error
    // Error: locator.uncheck: Cannot uncheck radio button. Radio buttons can be selected at a time, 
    // so if we want to uncheck the radio button then we need to check the other radio button in the same group
    const femaleRadioButton:Locator = page.locator('#female');
    await femaleRadioButton.check();
    // validating male radio button is not selected when female radio button is selected
    await expect(maleRadioButton).not.toBeChecked();
    await expect(femaleRadioButton).toBeChecked();
    await page.waitForTimeout(3000);
});

// Checkbox
test.only ('Checkbox Actions', async({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    const sundayCheckbox:Locator = page.getByLabel("Sunday");
    await sundayCheckbox.check();
    await expect(sundayCheckbox).toBeChecked();
    await sundayCheckbox.uncheck();
    await expect(sundayCheckbox).not.toBeChecked();

    // select all weekday checkboxes
    // the below code will create a checkbox variable in loop each time it runs
    /*
    let weekdays:string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    for (let day of weekdays) {
        const checkbox:Locator = page.getByLabel(day);
        await checkbox.check();
        await expect(checkbox).toBeChecked();
    }*/
    // we can use below approach using map to avoid creating multiple variables
    let weekdays:string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    // below will return an array of locators for all the weekday checkboxes
    const weekdayCheckboxes:Locator[] = weekdays.map(day => page.getByLabel(day));
    for (let checkbox of weekdayCheckboxes) {
        await checkbox.check();
        await expect(checkbox).toBeChecked();
    }

    await page.waitForTimeout(3000);
});