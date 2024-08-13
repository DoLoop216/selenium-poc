import assert from "assert";
import {PROJECT_URL} from "../constants.js";
import {By, until} from "selenium-webdriver";

export default async (driver) => {
    await driver.get(PROJECT_URL)
    const h1Locator = By.xpath(`/html/body/div/main/section[1]/div/div/div/h1`)
    await driver.wait(until.elementLocated(h1Locator), 10 * 1000)
    
    const h1 = await driver.findElement(h1Locator)
    const h1Text = await h1.getText()
    await assert.equal(h1Text, "Selenium automates browsers. That's it!")
}