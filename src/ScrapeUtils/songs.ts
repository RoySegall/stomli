import {openPuppeteerPage} from "./api";
import {uniq, flatten} from "lodash";
import {Browser, Page} from "puppeteer";
import {writeFile} from "fs";

const urls = [
  'https://shironet.mako.co.il/artist?type=works&lang=1&prfid=975',
  'https://shironet.mako.co.il/artist?type=works&lang=1&prfid=975&sort=alpha&class=1',
  'https://shironet.mako.co.il/artist?type=works&lang=1&prfid=975&sort=alpha&class=2',
];

async function scrapeNextPages(page: Page): Promise<string> {
  try {
    const results = await page.waitForXPath("//a[contains(., 'הבא') and @class='artist_nav_bar']", {timeout: 3000});
    if (results) {
      const propertyValue = await results.getProperty('href');
      return propertyValue.jsonValue();
    }

    return '';
  } catch (e) {
    return '';
  }
}

async function scrapePage(page: Page, url: string, links: string[]): Promise<string[]> {
  console.log('scraping ', url)
  const selector = 'a.artist_player_songlist';

  await page.goto(url);

  const linksFromCurrentPage = await page.evaluate((selector) => {
    const anchors = Array.from(document.querySelectorAll(selector));
    return anchors.map((anchor) => {
      return anchor.href
    });
  }, selector);

  links = [...links, ...linksFromCurrentPage];
  const nextPage = await scrapeNextPages(page);

  if (nextPage) {
    return scrapePage(page, nextPage, links);
  }

  return links;
}

async function buildUniqueURLs(): Promise<string[]> {
  let links = [''];
  let browsers: Browser[] = [];

  for await (let url of urls) {
    const {page, browser} = await openPuppeteerPage(url);
    browsers.push(browser);
    const linksFromPage = await scrapePage(page, url, links);
    links = [...linksFromPage, ...links]
  }

  browsers.forEach(browser => browser.close());
  return uniq(links.filter(item => item.includes('wrkid')));
}

async function getWordsFromSongPage(url: string) {
  console.log('Get words from ', url);
  const {page, browser} = await openPuppeteerPage(url);
  const selector = '.artist_lyrics_text';
  await page.waitForSelector(selector);
  const song = await page.evaluate((selector) => {
    const [span] = Array.from(document.querySelectorAll(selector));
    return span.textContent.split('|')[0].trim() as string;
  }, selector);

  const words = flatten(song
    .replaceAll('?', '')
    .split(' ')
    .filter(word => !['', "\n"].includes(word))
    .map(word => word.split("\n")))
    .filter(word => word.length === 5);

  await browser.close();
  return words;
}

export async function scrape() {
  console.log('Start scraping songs');
  const urls = await buildUniqueURLs();

  let words: string[] = [];

  for await (let url of urls) {
    const wordsFromSong = await getWordsFromSongPage(url);
    words = [...words, ...wordsFromSong]
  }

  writeFile('./wordsSongs.js', JSON.stringify(uniq(words)), (error) => {
    console.error(error);
  })
}
