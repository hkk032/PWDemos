import {test, expect, Locator} from "@playwright/test";

test ("Handling Simple Dialog", async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    // Enable dialog handler before opening the alert dialog
    page.on("dialog", (dialog) => {
        console.log("Printing the type of dialog/alert: ", dialog.type());
        console.log("Printing the dialog message: ", dialog.message());
        dialog.accept();
    });
    await page.locator("#alertBtn").click();
    await page.waitForTimeout(3000);
    
});


test ("Handling Confirmation Dialog", async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    // Enable dialog handler before opening the alert dialog
    // Accepting
    page.on("dialog", (dialog) => {
        console.log("Printing the type of dialog/alert: ", dialog.type());
        console.log("Printing the dialog message: ", dialog.message());
        dialog.accept();
    });
    await page.locator("#confirmBtn").click();
    await expect(page.locator("#demo")).toHaveText("You pressed OK!");
    await page.waitForTimeout(3000);

    // Dismissing
    page.on("dialog", (dialog) => {
        console.log("Printing the type of dialog/alert: ", dialog.type());
        console.log("Printing the dialog message: ", dialog.message());
        dialog.dismiss();
    });
    await page.locator("#confirmBtn").click();
    expect(await page.locator("#demo").innerText()).toContain("You pressed Cancel!");
    await page.waitForTimeout(3000);
    
});


test ("Handling Confirmation Dialog", async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    // Enable dialog handler before opening the alert dialog
    // Accepting
    const name:string = "Hemant Kumar";
    page.on("dialog", (dialog) => {
        console.log("Printing the type of dialog/alert: ", dialog.type());
        console.log("Printing the dialog message: ", dialog.message());
        expect(dialog.message()).toBe("Please enter your name:");
        // capturing default value of the dialog input field
        console.log("Printing the default value of the dialog input field: ", dialog.defaultValue());
        // if want to pass value to input field of the dialog, we can use accept method and pass the value as argument to it
        dialog.accept(name);
    });
    await page.locator("#promptBtn").click();
    await expect(page.locator("#demo")).toHaveText(`Hello ${name}! How are you today?`);
    await page.waitForTimeout(3000);

    // Dismissing
    page.on("dialog", (dialog) => {
        console.log("Printing the type of dialog/alert: ", dialog.type());
        console.log("Printing the dialog message: ", dialog.message());
        dialog.dismiss();
    });
    await page.locator("#promptBtn").click();
    expect(await page.locator("#demo").innerText()).toContain("User cancelled the prompt.");
    await page.waitForTimeout(3000);
    
});