import {test, expect, Locator} from "@playwright/test";

test ("Handling Single Select Dropdown", async ({page}) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    // 4 different ways to handle single select dropdown in Playwright
    // 1. Visible Text
    await page.locator("#country").selectOption("India");
    await page.waitForTimeout(5000);
    // 2. Value Attribute
    await page.locator("#country").selectOption({value: "uk"});
    await page.waitForTimeout(5000);
    // 3. Index
    await page.locator("#country").selectOption({index: 7});
    await page.waitForTimeout(5000);
    // 4. Label (Inner/Visible Text)
    await page.locator("#country").selectOption({label: "United States"});
    await page.waitForTimeout(5000);

    // Number of elements in dropdown
    // using CSS selector to get all the options in the dropdown
    const dropdownOptions:Locator = page.locator("#country option");
    console.log("Number of options in the dropdown: " + await dropdownOptions.count());

    // Check an option is present in the dropdown or not
    const optionToCheck:string = "India";
    const allOptions:string[] = (await dropdownOptions.allTextContents()).map(option => option.trim());
    // as above string list not just onctains string, it returns like '/n    India    ',, so used map to trim string
    allOptions.includes(optionToCheck) ? console.log(`${optionToCheck} is present in the dropdown`) : console.log(`${optionToCheck} is not present in the dropdown`);
    //other way to do it
    expect(allOptions).toContain(optionToCheck);

    // Printing Options in the dropdown
    (await dropdownOptions.allTextContents()).forEach(option => console.log(option.trim()));

});


test ("Handling Multi Select Dropdown", async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    // 4 different ways to handle multi select dropdown in Playwright
    // 1. Visible Text
    await page.locator("#colors").selectOption(["Yellow", "Green"]);
    await page.waitForTimeout(5000);
    // 2. Value Attribute
    await page.locator("#colors").selectOption([{value: "red"}, {value: "blue"}]);
    await page.waitForTimeout(5000);
    // 3. Index
    await page.locator("#colors").selectOption([{index: 0}, {index: 4}]);
    await page.waitForTimeout(5000);
    // 4. Label (Inner/Visible Text)
    await page.locator("#colors").selectOption([{label: "Yellow"}, {label: "Green"}]);
    await page.waitForTimeout(5000);

    // Number of elements in dropdown
    // using CSS selector to get all the options in the dropdown
    const dropdownOptions:Locator = page.locator("#colors option");
    console.log("Number of options in the dropdown: " + await dropdownOptions.count());

    // Check an option is present in the dropdown or not
    const optionToCheck:string = "India";
    const allOptions:string[] = (await dropdownOptions.allTextContents()).map(option => option.trim());
    // as above string list not just onctains string, it returns like '/n    India    ',, so used map to trim string
    allOptions.includes(optionToCheck) ? console.log(`${optionToCheck} is present in the dropdown`) : console.log(`${optionToCheck} is not present in the dropdown`);
    //other way to do it
    expect(allOptions).toContain(optionToCheck);

    // Printing Options in the dropdown
    (await dropdownOptions.allTextContents()).forEach(option => console.log(option.trim()));

});


test ("Check dropdown is sorted", async ({page}) => {

    await page.goto("https://testautomationpractice.blogspot.com/");
    const colorsDropdown:string[] = (await page.locator("#colors option").allTextContents()).map(option => option.trim());
    // creating sorted array
    // sort is mutable method, it changes the original array, so we need to create a copy of the original array before sorting
    // below commented code will not work as it will sort the original array and then compare with the sorted array, which will always be true, as both arrays are same
    /* const originalArrayCopy:string[] = colorsDropdown;
    const sortedColorsDropdown:string[] = originalArrayCopy.sort();
    // comparing both arrays
    expect(colorsDropdown).toEqual(sortedColorsDropdown);*/


    // To avoid the mutability issue of sort method, we can use spread operator to create a copy of the original array before sorting
    // const colorsDuplicate:string[] = [...colorsDropdown];
    const sortedColorsDropdownWithSpread:string[] = [...colorsDropdown].sort();
    expect(colorsDropdown).toEqual(sortedColorsDropdownWithSpread);
    console.log("Original Array: " + colorsDropdown);
    console.log("Sorted Array: " + sortedColorsDropdownWithSpread);

});


test.only ("Check if duplicate values are present in dropdown", async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    // with duplicate values
    const colorsDropdown:string[] = (await page.locator("#colors option").allTextContents()).map(option => option.trim());
    // without duplicate values
    const animalsDropdown:string[] = (await page.locator("#animals option").allTextContents()).map(option => option.trim());

    const uniqueColorSet = new Set<string>();
    for (const color of colorsDropdown) {
        if (!uniqueColorSet.has(color)) {
            uniqueColorSet.add(color);
        }
    }
    if (uniqueColorSet.size === colorsDropdown.length) {
        console.log("No duplicate values are present in the colors dropdown");
    } else {
        console.log("Duplicate values are present in the colors dropdown");
    }

    const uniqueAnimalSet = new Set<string>();
    for (const animal of animalsDropdown) {
        if (!uniqueAnimalSet.has(animal)) {
            uniqueAnimalSet.add(animal);
        }
    }
    if (uniqueAnimalSet.size === animalsDropdown.length) {
        console.log("No duplicate values are present in the animals dropdown");
    } else {
        console.log("Duplicate values are present in the animals dropdown");
    }
    
});