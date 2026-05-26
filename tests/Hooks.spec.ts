import {test} from "@playwright/test";

// BeforeEach - this method will execute before each test in the file
// AfterEach - this method will execute after each test in the file
// BeforeAll - will execute only once before starting the tests in the file
// AfterAll - will execute only once after finishing the tests in the file

// If hooks are defined inside the group, then they will execute only for the tests inside that group

test.beforeEach("Login", async () => {
    console.log("Login to the application");
});

test.afterEach("Logout", async () => {
    console.log("Logout from the application");
});

test.beforeAll("Before All", async () => {
    console.log("Before All");
});

test.afterAll("After All", async () => {
    console.log("After All");
});

test ("Test 1", async () => {
    console.log("Test 1");
});

test ("Test 2", async () => {
    console.log("Test 2");
});

test ("Test 3", async () => {
    console.log("Test 3");
});

test ("Test 4", async () => {
    console.log("Test 4");
});


// In real testing framework, we need to use a single page instance for all the tests
// So we need to create a global page instance an use it
// Sample code below
/*
import {test, Page} from "@playwright/test";

let page: Page;
test.beforeAll("Open App", async ({browser}) => {
    page = await browser.newPage();
    // other actions to open the application
});

// In other tests then no need to pass page as arg in async
test.afterAll("Close App", async () => {
    // action to be performed
});
*/