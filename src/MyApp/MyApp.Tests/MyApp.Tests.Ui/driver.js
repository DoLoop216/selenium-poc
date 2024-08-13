import webdriver, {Capabilities} from "selenium-webdriver";
import Firefox from "selenium-webdriver/firefox.js";

export const createDriver = () => {
    return new webdriver.Builder()
        .withCapabilities(Capabilities.firefox().set("acceptInsecureCerts", true))
        .setFirefoxOptions(new Firefox.Options())
        .build()
}