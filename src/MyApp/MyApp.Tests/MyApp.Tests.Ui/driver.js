import webdriver, {Builder, Capabilities} from "selenium-webdriver";
import Firefox from "selenium-webdriver/firefox.js";
import Chrome from "selenium-webdriver/chrome.js";

export const createDriver = () => {
    if (process.env.ENV === 'local') {
        return createLocalDriver()
    }
    else if (process.env.ENV === 'github-action') {
        return createRemoteDriver()
    }
    else {
        throw new Error('Unsupported environment')
    }
}

const createLocalDriver = () => {
    if (process.env.BROWSER === 'firefox') {
        let options = new Firefox.Options()
        return new webdriver.Builder()
            .withCapabilities(Capabilities.firefox().set("acceptInsecureCerts", true))
            .setFirefoxOptions(options)
            .build()
    }
    else if (process.env.BROWSER === 'chrome') {
        let options = new Chrome.Options()
        return new webdriver.Builder()
            .withCapabilities(Capabilities.chrome().set("acceptInsecureCerts", true))
            .setChromeOptions(options)
            .build()
    }
    else {
        throw new Error('Unsupported browser')
    }
}

const createRemoteDriver = () => {
    const seleniumServer = process.env.SELENIUM_SERVER || 'selenium'
    console.log(`http://${seleniumServer}:4444`)
    console.log(`Using browser: ` + process.env.BROWSER)
    return new Builder()
        .usingServer(`http://${seleniumServer}:4444`)
        .forBrowser(process.env.BROWSER)
        .build();
}