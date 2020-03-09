const {Builder, By, Key, until} = require("selenium-webdriver");
require("selenium-webdriver/chrome");

const WAIT_UNTIL_TIME = 20000;

const URL = "http://localhost:8030/";

async function getElementById(
  driver, id, timeout = WAIT_UNTIL_TIME) {
  const el = await driver.wait(until.elementLocated(By.id(id)), timeout);
  return await driver.wait(until.elementIsVisible(el), timeout);
}

async function getElementByName(
  driver, name, timeout = WAIT_UNTIL_TIME) {
  const el = await driver.wait(until.elementLocated(By.name(name)), timeout);
  return await driver.wait(until.elementIsVisible(el), timeout);
}

async function getElementByXpath(
  driver, xpath, timeout = WAIT_UNTIL_TIME) {
  const el = await driver.wait(until.elementLocated(By.xpath(xpath)), timeout);
  return await driver.wait(until.elementIsVisible(el), timeout);
}

describe("Navigation to missing page.", () => {
  let driver;

  beforeAll(async () => {
    // TODO https://stackoverflow.com/questions/53657215/running-selenium-with-headless-chrome-webdriver
    driver = new Builder().forBrowser("chrome").build();
  }, 10000);

  afterAll(async () => {
    await driver.quit();
  }, 15000);

  test("should have the right title", async () => {
    await driver.navigate().to(URL + "/test-missing-page-url");
    const title = await driver.getTitle();
    console.log("TITLE", title);
    // browser.url("https://webdriver.io");
    // const title = browser.getTitle();
    // assert.strictEqual(title, "WebdriverIO · Next-gen WebDriver test framework for Node.js")
  });

});
