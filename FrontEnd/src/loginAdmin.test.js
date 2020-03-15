// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('Login - Admin', function() {
  this.timeout(30000)
  let driver
  let vars
  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build()
    vars = {}
  })
  afterEach(async function() {
    await driver.quit();
  })
  it('Login - Admin', async function() {
    await driver.get("https://vigilante.netlify.com/login")
    await driver.manage().window().setRect(1552, 840)
    assert(await driver.findElement(By.css("h1")).getText() == "Log in")
    assert(await driver.findElement(By.css("h3")).getText() == "Digital Course File | Login")
    await driver.findElement(By.id("username")).click()
    await driver.findElement(By.id("username")).sendKeys("Admin1")
    await driver.findElement(By.id("password")).click()
    await driver.findElement(By.id("password")).sendKeys("Admin@2000")
    await driver.findElement(By.id("submitbutton")).click()
    assert(await driver.findElement(By.css("var")).getText() == "ADMIN PAGE")
    await driver.findElement(By.id("signout")).click()
    await driver.close()
  })
})
