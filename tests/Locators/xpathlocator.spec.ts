import {test, expect, Locator} from "@playwright/test";

test("Xpath Locator", async ({page}) => {
    await page.goto("https://demowebshop.tricentis.com/");

    //Absolute Xpath
    //For code to recognize it to be cpath either we can give xpath= or // before html tag
    // const logoAbsolute:Locator = page.locator("xpath = //html[1]/body[1]/div[4]/div[1]/div[1]/div[1]/a[1]/img[1]");
    const logoAbsolute:Locator = page.locator("xpath = /html[1]/body[1]/div[4]/div[1]/div[1]/div[1]/a[1]/img[1]");
    await expect(logoAbsolute).toBeVisible();

    //Relative Xpath
    const logoRelative:Locator = page.locator("//img[@alt='Tricentis Demo Web Shop']");
    await expect(logoRelative).toBeVisible();

    //Xpath methods
    //1 - contains()
    //In TS, even if it is returning a list of elements, we'll use page.locator and store in Locator variable, not array
    const products:Locator = page.locator("//h2//a[contains(@href, 'computer')]");
    await expect(await products.count()).toBeGreaterThan(0);
    //Single line action
    products.count().then(count => console.log("Total products are ", count));
    //Extract text value
    //Below will return error - strict mode violation error because there are multiple elements and playwright does not know which one to extract text from, so we need to specify which element we want to extract text from
    //products.textContent();
    //Below will work
    console.log("First product is ", await products.first().textContent());
    console.log("Last product using last() TS inbuilt Locator method is ", await products.last().textContent());
    console.log("Second product is ", await products.nth(1).textContent());
    //But we can use below to get text of all the products
    console.log("All products are ", await products.allTextContents());

    //2 - starts-with()
    const productsWithBuild:Locator = page.locator("//h2//a[starts-with(@href, '/build')]");
    await expect(await productsWithBuild.count()).toBeGreaterThan(0);

    //3 - text()
    //This method will identify element based on the exact inline text, so we need to provide whole text - but it won't work if there is extra space or new line in the text, so we can use normalize-space() to ignore extra spaces and new lines
    ////a[normalize-space()='Register'] - this will ignore extra spaces and new lines and identify the element based on the text
    //we can use //a[.='Register'] also, dot represents text menthod
    const productWithText:Locator = page.locator("//a[text()='Register']");
    await expect(productWithText).toBeVisible();

    //4 - last()
    //It will get the last element in the set of matching elements
    const lastProduct:Locator = page.locator("//h2//a[last()]");
    console.log("Last product using xpath last method is ", await lastProduct.textContent());

    //5 - position()
    //It will get the element based on the position we provide in the set of matching elements
    const secondProduct:Locator = page.locator("//h2//a[position()=2]");
    console.log("Second product using xpath position method is ", await secondProduct.textContent());

    //6 - Dynamic Xpath
    //Scenario -> There's a button with test Start, when clicked the text changes to Stop and vice-versa
    //Let's take along with text, name, class attribute also changes to start or stop accordingly
    //We can use below xpaths to identify both the buttons without changing the locator
    //button[@name='start' or @name='stop']
    //button[contains(@name, 'start') or contains(@name, 'stop')]
    //button[starts-with(@name, 'st')]
    //button[contains(@name, 'st')]
    //button[text()='Start' or text()='Stop']

});

test ("Xpath axes", async ({page}) => {
    await page.goto("https://www.w3schools.com/html/html_tables.asp");

    // 1. self
    // actually not needed to use, as we can directly identify the element without using self, but just for understanding purpose
    const tdSelf:Locator = page.locator("//td[text()='Germany']/self::td");
    console.log(await tdSelf.textContent());
    await expect(tdSelf).toHaveText("Germany");

    // 2. parent
    const trParent:Locator = page.locator("//td[text()='Germany']/parent::tr");
    console.log(await trParent.textContent());
    await expect(trParent).toContainText("Maria");

    // 3. child
    const trChild:Locator = page.locator("//table[@id='customers']//tr[2]/child::td");
    console.log(await trChild.allTextContents());
    await expect(trChild).toHaveCount(3);

    // 4. ancestor
    const trAncestor:Locator = page.locator("//td[text()='Germany']/ancestor::table");
    //td[text()='Germany']/ancestor::*  ->  * means it will return all the ancestor elements of td, which are tr, tbody, table, body, html
    console.log(await trAncestor.textContent());
    await expect(trAncestor).toHaveAttribute("id", "customers");

    // 5. descendant
    const trDescendant:Locator = page.locator("//table[@id='customers']/descendant::tr[3]");
    //table[@id='customers']/descendant::*  ->  * means it will return all the descendant elements of table, which are tr, td, etc.
    console.log(await trDescendant.textContent());
    await expect(trDescendant).toContainText("Mexico");

    /* following VS following-sibling
    following will return all the elements that are present after the current element in the document, regardless of their level in the hierarchy
    following-sibling will return only the sibling elements that are present after the current element in the same level of hierarchy
    */

    // 6. following
    const tdFollowing:Locator = page.locator("//td[text()='Germany']/following::td");
    //td[text()='Germany']/following::*  ->  * means it will return all the following elements of td, which are td, tr, etc.
    console.log(await tdFollowing.allTextContents());

    // 7. following-sibling
    const tdFollowingSibling:Locator = page.locator("//td[text()='Maria Anders']/following-sibling::td");
    console.log(await tdFollowingSibling.allTextContents());

    /* preceding VS preceding-sibling
    preceding will return all the elements that are present before the current element in the document, 1 level above
    preceding-sibling will return only the sibling elements that are present before the current element in the same level of hierarchy
    */

    // 8. preceding (means parent and its siblings)
    const tdPreceding:Locator = page.locator("//td[text()='Germany']/preceding::td");
    //td[text()='Germany']/preceding::*  ->  * means it will return all the preceding elements of td, which are td, tr, etc.
    //td[text()='Germany']/preceding::tbody -> its not returning anything because tbody is not preceding element of td, it is ancestor element of td, so it will return empty
    console.log(await tdPreceding.allTextContents());

    // 7. prceding-sibling (its siblings only that are present before the current element in the same level of hierarchy)
    const tdPrecedingSibling:Locator = page.locator("//td[text()='Germany']/preceding-sibling::td");
    console.log(await tdPrecedingSibling.allTextContents());
});