import {createDriver} from "./driver.js";
import path from 'path'
import * as fs from "node:fs";

const testsDir = path.resolve('./tests')

let passedTests = 0
let totalTests = 0

fs.readdir(testsDir, async (err, files) => {
    if (err) {
        console.error('Error reading tests directory:', err)
        return
    }
    
    const testFiles = files.filter(file => file.endsWith('.js'))
    
    for (const file of testFiles) {
        const filePath = path.join(testsDir, file)
        const testModule = await import(filePath)
        if (typeof testModule.default === 'function') {
            totalTests++
            console.log(`====================`)
            console.log(`Running test: ${file}`)
            let driver = await createDriver()
            try {
                await testModule.default(driver)
                console.log(`Test ${file} finished successfully`)
                passedTests++
            }
            catch (err) {
                console.error(`Test ${file} failed`)
                console.error(err)
            }
            finally {
                await driver.quit()
            }
            console.log()
        }
    }
    
    console.log(`====================`)
    console.log(`Total tests: ${totalTests}`)
    console.log(`Passed tests: ${passedTests}`)
    console.log(`Failed tests: ${totalTests - passedTests}`)
    console.log(`====================`)
    
    if (totalTests !== passedTests)
        throw new Error('Selenium UI tests failing!')
})