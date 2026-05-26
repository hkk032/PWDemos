import {test} from "@playwright/test";

// Creating a group in playwright, we use describe block
// test.describe("Group Name", async () => {all the tests inside this});

test.describe("Group 1", async () => {
    test ("Test 1", async () => {
        console.log("Test 1");
    });

    test ("Test 2", async () => {
        console.log("Test 2");
    });
});

test.describe("Group 2", async () => {
    test ("Test 3", async () => {
        console.log("Test 3");
    });

    test ("Test 4", async () => {
        console.log("Test 4");
    });
});

// To run only specific group we use --grep "Group Name" after fileName in command