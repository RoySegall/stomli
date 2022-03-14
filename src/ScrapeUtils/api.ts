import * as puppeteer from "puppeteer";
import {Browser, Page} from "puppeteer";

export async function openPuppeteerPage(url: string): Promise<{page: Page, browser: Browser}> {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);

  return {page, browser};
}

export async function iterateOverLinks(page: Page, selector: string, itemProcessCallback: (anchor: any) => string) {
  await page.waitForSelector(selector);

  const links = await page.evaluate((selector) => {
    console.log(document)
    return Array.from(document.querySelectorAll(selector));

    // return anchors.map(itemProcessCallback);
  }, selector);

  return links.map(itemProcessCallback)
}
