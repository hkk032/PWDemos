import {test, expect, Locator} from "@playwright/test";

test ("Extract Text From Page", async ({page}) => {
    await page.goto("https://demowebshop.tricentis.com/");
    const products:Locator = page.locator(".product-title");

    // 1. Inner Text VS Text Content
    console.log("Inner Text First: " + await products.first().innerText());
    console.log("Inner Text Nth: " + await products.nth(2).innerText());
    // innerText will return only the text. Eliminates leading/trailing spaces, line breaks, hidden text, etc. 
    // It will return the text as it is visible on the page to the user.
    // Return only string
    console.log("Text Content First: " + await products.first().textContent());
    console.log("Text Content Nth: " + await products.nth(2).textContent());
    // textContent will reurn text with leading/trailing spaces, line breaks, hidden text, etc. as it is in the HTML source code
    // can return string or null if the element does not contain any text content

    // single vs all difference - single will get single element text and need to use for loop to get all element text
    // all will get all element text in one go and return an array of text content for all the elements
    // 2. allInnerTexts VS allTextContents
    console.log("All Inner Text: " + await products.allInnerTexts());
    // allInnerText will return an array of text content for all the elements as it is visible on the page to the user. No spaces/line breaks
    console.log("All Text Content: " + await products.allTextContents());
    // allTextContent will return an array of text content for all the elements as it is in the HTML source code. Includes spaces/line breaks.

    // 3. all
    // all returns an array of locators for all the elements matching the selector. 
    // converts Locator to an array of locators
    // We can perform actions on these locators like click, hover, etc. or we can extract text from these locators using innerText or textContent.
    const productLocators:Locator[] = await products.all();
    console.log("All Product Locators: " + productLocators);
    for (let productLocator of productLocators) {
        console.log("Product Name: " + await productLocator.innerText());
    }
    // can use for in loop also, but that requires index to access the element in the array
});

// If Locator format, can use normal for loop only.
// If array format, can use for of loop or for in loop.