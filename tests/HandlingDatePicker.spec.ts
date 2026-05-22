import {test, expect, Locator, Page} from "@playwright/test";

async function selectDateFromDatePicker(page:Page, year:string, month:string, date:string, isDateFuture:boolean) {
    const datePickerIcon: Locator = page.locator("#datepicker");
    await datePickerIcon.click();
    while (true) {
        const selectedMonth: string|null = await page.locator("ui-datepicker-month").textContent();
        const selectedYear: string|null = await page.locator("ui-datepicker-year").textContent();
        if (selectedMonth === month && selectedYear === year) {
            break;
        } 
        if (isDateFuture) {
            await page.locator("a[title=Next]").click();
        } else {
            await page.locator("a[title=Prev]").click();
        }
        
    }
    
    // selecting the date - once month and year are selected
    const allDates: Locator[] = await page.locator(".ui-datepicker-calendar td").all();
    for (let dateL of allDates) {
        const dateText: string|null = await dateL.innerText();
        if (dateText === date) {
            await dateL.click();
            break;
        }
    }
}

// jQuery Date Picker
test ("Handling jQuery Date Picker", async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    // using fill method
    const inputDatePicker: Locator = page.locator("#txtDate");
    expect(inputDatePicker).toBeVisible();
    inputDatePicker.fill("05/19/2025");     // MM/DD/YYYY
    await page.waitForTimeout(3000);

    // using the date picker widget
    // storing date to be selected
    selectDateFromDatePicker(page, "2025", "Feb", "19", false);
    await page.waitForTimeout(3000);
    selectDateFromDatePicker(page, "2025", "May", "25", false);
    await page.waitForTimeout(3000);
    selectDateFromDatePicker(page, "2027", "Feb", "19", true);
    await page.waitForTimeout(3000);

});


// Bootstrap Date Picker
test ("Handling Bootstrap Date Picker", async ({page}) => {
    //Booking.com date picker
});