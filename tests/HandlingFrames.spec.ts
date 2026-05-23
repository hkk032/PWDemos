import {test, expect, Locator, Frame} from "@playwright/test";

test ("Handling iFrames", async ({page}) => {
    await page.goto("https://ui.vision/demo/webtest/frames/");

    // total number of frames present in the webpage
    const totalFrames: Frame[] = page.frames();      //returns ans array of all frames
    console.log("Total number of frames present in the webpage: ", totalFrames.length);

    // Approach 1: Using page.frame
    const frame1 = page.frame({url: ""});      // pass frame url, if frmae is available will return frame else null
    if (frame1) {
        await frame1.locator("#mytext").fill("Hemant Kumar");  // OR
        await frame1.fill("#mytext", "Hemant Kumar");
        // Nested/Child frames
        const childFrames = frame1.childFrames();     // returns an array of all child frames present inside the frame1
        console.log("Total number of child frames present inside the frame1: ", childFrames.length);
        const radio = childFrames[0].getByLabel("I am human");
        await radio.check();
    }

    // Approach 2: Using frame locator
    await page.frameLocator("[src='frame1.html']").locator("[name='myText1']").fill("Hemant Kumar");

});