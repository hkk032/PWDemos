import {test, expect, Locator} from "@playwright/test";

test ("Verify playwright locator", async ({page}) => {
    await page.goto("https://demo.nopcommerce.com/");

    // 1 - page.getByAltText()
    // page.getByAltText() - identifies images (and similar elements) based on the alt attribute
    // use this locator when your element supports alt text such as img and area elements
    // page.getByAltText() returns a locator
    // locator is also a fixture similar to page
    // as below is not returning promise or we are not performing any action on it, so we need to use await
    // const logo:Locator = await page.getByAltText("nopCommerce demo store");
    const logo:Locator = page.getByAltText("nopCommerce demo store");
    await expect(logo).toBeVisible();

    // 2 - page.getByText()
    // page.getByText() - identifies elements based on their text content
    // use this locator when your element contains text such as div, span, p, etc (not the interactive elements like button, link, etc)
    // we can also provide substring of the text, it is not necessary to provide whole text
    await expect(page.getByText("Welcome to our store")).toBeVisible();
    // to ignore case sensitivity we can use below regex syntax
    await expect(page.getByText(/welcome to our store/i)).toBeVisible();

    // 3 - page.getByRole()
    // page.getByRole() - identifies elements based on their ARIA role (implicit and explicit accessibility attributes)
    // role is not an attribute
    await page.getByRole("link", {name: "Register"}).click();
    await expect(page.getByRole("heading", {name: "Register"})).toBeVisible();

    // 4 - page.getByLabel()
    // page.getByLabel() - identifies form elements based on their associated label text
    // use this locator when your element is associated with a label such as input, select, textarea, etc
    // we can use getByRole if directly interacting with the input field
    await page.getByLabel("First name:").fill("Hemant");
    await page.getByLabel("Last name:").fill("Kushwaha");
    await page.getByLabel("Email:").fill("abc@gmail.com");

    // 5 - page.getByPlaceholder()
    // page.getByPlaceholder() - identifies input elements based on their placeholder text
    await page.getByPlaceholder("Search store").fill("Apple MacBook Pro");

    // 6 - page.getByTitle()
    // page.getByTitle() - identifies elements based on their title attribute
    await expect(page.getByTitle("My account")).toHaveText("My account");

    // 7 - page.getByTestId()
    // page.getByTestId() - identifies elements based on their data-testid attribute
    // when to use : when text or role based locators are unstable or not suitable
    await expect(page.getByTestId("newsletter-email")).toBeVisible();

});