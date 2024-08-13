import assert from "assert";
import {PROJECT_URL} from "../constants.js";
import {By, until} from "selenium-webdriver";

export default async (driver) => {
    await driver.get(PROJECT_URL)
    const projectsNavigationButtonLocator = By.xpath(`/html/body/header/nav/div/ul/li[4]/a`)
    await driver.wait(until.elementLocated(projectsNavigationButtonLocator), 10 * 1000)

    const button = await driver.findElement(projectsNavigationButtonLocator)
    await button.click()
    
    const h1Locator = By.xpath(`/html/body/div/main/section/div/div/div/h1`)
    await driver.wait(until.elementLocated(h1Locator), 10 * 1000)
    const h1 = await driver.findElement(h1Locator)
    const h1Text = await h1.getText()
    await assert.equal(h1Text, "Projects")
}

