import assert from "assert";
import {PROJECT_URL} from "../constants.js";

export default async (driver) => {
    await driver.get(PROJECT_URL)
    const title = await driver.getTitle()
    await assert.equal(title, "Selenium")
}