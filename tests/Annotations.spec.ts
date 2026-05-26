import {test} from "@playwright/test";

/*
only - whichever test has this annotation, only that test will be executed and rest of the tests will be skipped
    If this is used for multiple tests, then only those tests will be executed and rest of the tests will be skipped
    test.only('focus this test', async ({ page }) => {
        // Run only focused tests in the entire project.
    });
skip - marks the test as irrelevant. Playwright does not run such a test. 
    Use this annotation when the test is not applicable in some configuration.
    test.skip('skip this test', async ({ page }) => {
    // This test is not run
    });
    can conditionally skip the test
    test('skip this test', async ({ page, browserName }) => {
        test.skip(browserName === 'firefox', 'Still working on it');
    });
fail - marks the test as failing. 
    Playwright will run this test and ensure it does indeed fail. 
    If the test does not fail, Playwright will complain.
fixme - marks the test as failing. 
    Playwright will not run this test, as opposed to the fail annotation. 
    Use fixme when running the test is slow or crashes.
slow - marks the test as slow and triples the test timeout.
    default timeout is 30 seconds, so with this annotation the timeout will be 90 seconds.
*/

