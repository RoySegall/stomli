import {openPuppeteerPage} from "./api";
import {uniq} from "lodash";
import {Page} from "puppeteer";

const urls = [
  'https://shironet.mako.co.il/artist?type=works&lang=1&prfid=975',
  'https://shironet.mako.co.il/artist?type=works&lang=1&prfid=975&sort=alpha&class=1',
  'https://shironet.mako.co.il/artist?type=works&lang=1&prfid=975&sort=alpha&class=2',
];

async function scrapeNextPages(page: Page) {
  try {
    const results = await page.waitForXPath("//a[contains(., 'הבא') and @class='artist_nav_bar']", {timeout: 3000});
    if (results) {
      const nextPageLink = await (await results.getProperty('href')).jsonValue() as string;
      await page.goto(nextPageLink);
    }
  } catch (e) {
    console.log('Could not found the next page link');
  }
}

async function scrapePage(url: string, links: string[]) {
  const {page, browser} = await openPuppeteerPage(url);
  console.log('scraping ', url)
  const selector = 'a.artist_player_songlist';

  const linksFromCurrentPage = await page.evaluate((selector) => {
    const anchors = Array.from(document.querySelectorAll(selector));
    return anchors.map((anchor) => {
      return anchor.href
    });
  }, selector);

  await browser.close();

  return [...links, ...linksFromCurrentPage];
}

async function buildUniquePages(): Promise<string[]> {
  let links = [''];

  for await (let url of urls) {
    const linksFromPage = await scrapePage(url, links);
    links = [...linksFromPage, ...links]
  }

  return uniq(links.filter(item => item.includes('wrkid')));
}

export async function scrape() {
  console.log('Start scraping songs');
  const pages = await buildUniquePages();
  console.log(pages);
}
