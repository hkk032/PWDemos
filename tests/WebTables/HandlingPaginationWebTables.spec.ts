import {test, expect, Locator} from "@playwright/test";

test ("Handling Pagination Web Tables", async ({page}) => {
    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");

    // 1. Read table data from all the pages
    let hasMorePage = true;

    while (hasMorePage) {
        // storing all row data
        const rows: Locator[] = await page.locator("#example tbody tr").all();
        for (let row of rows) {
            // printing all rows from a page
            console.log(row.innerText());
        }

        // checking if next page exist - if yes click the next button else break the loop
        const nextButton = page.locator(".next");
        if (await nextButton.isEnabled()) {
            await nextButton.click();
        } else {
            hasMorePage = false;
        }
        await page.waitForTimeout(3000); // wait for the next page to load
    }


    // 2. CHange entries per page and validate if number of rows are displayed as per the selection
    const rowsPerPage: Locator = page.locator("#dt-length-0");
    await rowsPerPage.selectOption("25");
    expect((await page.locator("#example tbody tr").all()).length).toBe(25);


    // 3. Search for a specific record and validate the search result
    const searchBox: Locator = page.locator("#dt-search-0");
    await searchBox.fill("Paul Byrd");
    const searchResults: Locator[] = await page.locator("#example tbody tr").all();
    if (searchResults.length > 0) {
        for (let row of searchResults) {
            await row.innerText().then((text) => text.includes("Paul Byrd") ? console.log("Record found: " + text) : console.log("Record not found in this row."));
        }
    } else {
        console.log("No records found for the search query.");
    }
});