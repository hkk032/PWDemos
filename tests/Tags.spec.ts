import {test} from "@playwright/test";

// 2 ways to create tags

test ("@Sanity Test 1", async () => {
    console.log("Test 1");
});

test ("@Sanity @Regression Test 2", async () => {
    console.log("Test 2");
});

test ("Test 3", {tag: "@Smoke"}, async () => {
    console.log("Test 3");
});

test ("Test 4", {tag: ["@Smoke", "@Regression"]}, async () => {
    console.log("Test 4");
});

test ("Test 5", async () => {
    console.log("Test 4");
});

// To run the test
// npx playwright test --grep @Sanity
// OR - npx playwright test --grep "@Sanity|@Smoke"
// AND - npx playwright test --grep "(?=.*@Regression)(?=.*@Smoke)"
// NOT - npx playwright test --grep-invert "@Regression"   ->  Run all other tests other than Regression
// npx playwright test --grep "@Sanity" --grep-invert "@Regression"   ->  Run sanity test but not Regression

// Can provide which tags to run in config file also, but outside of use
// grep: /@tagName/,
// grep: /(?=.*@Regression)(?=.*@Smoke)/,
// grep: /@Sanity/,
// grepInvert: /@Regression/,
// grepInvert: /@Regression|@Sanity/,