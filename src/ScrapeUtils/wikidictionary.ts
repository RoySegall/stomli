import {writeFile} from "fs";
import {Page} from "puppeteer";
import {openPuppeteerPage} from "./api";

let words: any = [];

const getValidWordsFromPage = async (page: Page): Promise<string[]> => {
  const selector = '.mw-allpages-chunk a';
  await page.waitForSelector(selector);

  const links = await page.evaluate((selector) => {
    const anchors = Array.from(document.querySelectorAll(selector));
    return anchors.map((anchor) => anchor.textContent.split('|')[0].trim());
  }, selector);

  return links
    .filter(link => !['"', "'", '.', " ", "(", ")", "-", "/", "־", ':'].some(char => link.includes(char)))
    .filter(link => link.length === 5);
};

async function startScrape(page: Page) {
  const linksFromPage = await getValidWordsFromPage(page);

  console.log(`Getting the words for ${page.url()}`);

  words = [...words, ...linksFromPage];

  try {
    const results = await page.waitForXPath("//a[contains(., 'הדף הבא')]", {timeout: 3000});
    if (results) {
      const nextPageLink = await (await results.getProperty('href')).jsonValue() as string;
      await page.goto(nextPageLink);

      await startScrape(page);
    }
  } catch (e) {
    console.log('Could not found the next page link');
  }
}

export async function scrape() {
  const {page, browser} = await openPuppeteerPage('https://he.wiktionary.org/wiki/%D7%9E%D7%99%D7%95%D7%97%D7%93:%D7%9B%D7%9C_%D7%94%D7%93%D7%A4%D7%99%D7%9D/%D7%90');

  await startScrape(page);

  writeFile('./words.js', JSON.stringify(words), (error) => {
    console.error(error);
  })

  await browser.close();

  console.log('Done getting the words');
}
