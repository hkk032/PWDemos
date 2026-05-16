import {test, expect, Locator} from "@playwright/test";

test ("Handling Static Web Tables", async({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    const table:Locator = page.locator("table[name='BookTable'] tbody");
    await expect(table).toBeVisible();

    // count number of rows in the table
    const rows:Locator = table.locator("tr");    // chaining of locator - locate another child element within the parent element
    // approach 1
    await expect(rows).toHaveCount(7);
    // approach 2
    const rowCount:number = await rows.count();
    expect(rowCount).toBe(7);

    // count number of columns in the table
    const columns:Locator = rows.locator("th");
    await expect(columns).toHaveCount(4);

    // read all data from 3nd row, including header
    const secondRowCells:Locator = rows.nth(1).locator("td");
    console.log("Data from 2nd row:", await secondRowCells.allInnerTexts());

    // printing all row data
    const allRow = await rows.all();
    for (let row of allRow.slice(1)) {    // slice(1) to skip the header row
        const rowText = await row.locator("td").allInnerTexts();
        console.log("Row Data: " + rowText);
    }

    // conditional based data/row retrieval - get all books written by Mukesh
    for (let row of allRow.slice(1)) {    // slice(1) to skip the header row
        const cell = await row.locator("td").allInnerTexts();
        console.log("Row Data: " + cell[1]);
        if (cell[1] === "Mukesh") {
            console.log("Book written by Mukesh: " + cell[0]);
        }
    }

    // calculate total price of all books in the table
    let totalPrice:number = 0;
    for (let row of allRow.slice(1)) {    // slice(1) to skip the header row
        const cell = await row.locator("td").allInnerTexts();
        totalPrice += parseInt(cell[3]);
    }
    console.log("Total Price of all books: " + totalPrice);
    expect(totalPrice).toBe(7100);
});