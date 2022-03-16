import * as puppeteer from "puppeteer";
import {Browser, Page} from "puppeteer";

export async function openPuppeteerPage(url: string): Promise<{page: Page, browser: Browser}> {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);

  return {page, browser};
}

