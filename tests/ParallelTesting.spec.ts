import {test} from "@playwright/test";

// set parallel to false in config file to run the tests sequentially, otherwise by default it will run in parallel
// if not parallel then set workers to 1 in config file to run the tests sequentially, 
// otherwise by default it will run in parallel with number of workers equal to number of cores in machine
// or can specify number of workers to run in parallel

// if parallel is true, but for specific file test we need to run sequentially then
// test.describe.configure({ mode: 'serial' });  ->  all the tests in that file will run sequentially, but rest of the files will run in parallel
// if parallel is false, but for specific file test we need to run parallely then
// test.describe.configure({ mode: 'parallel' });  ->  all the tests in that file will run paralelly, but rest of the files will run in sequence

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


// can speicfy workers in command also
// npx playwright test testFile --workers 4   -> this will run the tests with 4 workers in parallel
// npx playwright test testFile --workers=4   -> this will run the tests with 4 workers in parallel