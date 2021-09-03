import puppeteer from 'puppeteer';
const APP = 'http://localhost:8080';
import "regenerator-runtime/runtime";

xdescribe('Front-end Integration/Features', () => {
  let browser;
  let page;
  beforeAll(async () => {
    browser = await puppeteer.launch({
      // executablePath: '/usr/bin/chromium-browser',
      // ignoreDefaultArgs: ['--diable-extensions'],
      // headless: false,
      slowMo: 75,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    page = await browser.newPage();
  })
  afterAll(async () => {
    // await db.drop();
    // await browser.close();
  });
  xdescribe('Initial display', () => {
    it('loads successfully', async () => {
      // We navigate to the page at the beginning of each case so we have a
      // fresh start
      await page.goto(APP);
      await page.waitForSelector('#title');
      // $eval runs document.querySelector
      const title = await page.$eval('#title', (el) => el.innerHTML);
      expect(title).toBe('My DDI Checker');
    });
  })
})
