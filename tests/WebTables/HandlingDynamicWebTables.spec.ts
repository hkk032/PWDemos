import {test, expect, Locator} from "@playwright/test";

test ("Handling Dynamic Web Tables", async ({page}) => {
    await page.goto("https://practice.expandtesting.com/dynamic-table");
    const dynamiTable:Locator = page.locator(".table-striped tbody");

    let cpuLoad:string = '';

    // 1. Capture the chrome process
    const tableRows:Locator[] = await dynamiTable.locator("tr").all();
    for (let row of tableRows) {
        // for the first entire row, going to td tag as it have the value
        // then capturing the first column value that contains the process name
        const processName:string = await row.locator("td").nth(0).innerText();
        console.log("Process Name: " + processName);
        // 2. Once process name is found, capture the CPU percentage
        if(processName === "Chrome") {
            // Approach 1 : using css method :has-text to capture the td tag that contains the text '%'
            const cpuLoad:string = await row.locator("td:has-text('%')").innerText();
            console.log("Chrome CPU: " + cpuLoad);
            // Approach 2 : using playwright specific method to capture the td tag that contains the text '%'
            /* const chromeCPUA2:string = await row.locator("td",{hasText:'%'}).innerText();
            console.log("Chrome CPU: " + chromeCPUA2); */
            break;
        }
    }
    const expChromUsage:string = await page.locator("#chrome-cpu").innerText();
    console.log("Expected Chrome CPU: " + expChromUsage);
    expect(cpuLoad).toBe(expChromUsage.split(":")[1].trim());
});