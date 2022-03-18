import {openPuppeteerPage} from "./api";
import {flatten} from "lodash";
import {Browser, Page} from "puppeteer";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

const artists = {
  shlomo: 975,
  hadagNachas: 333,
  arikEinsein: 166,
  shalom: 960,
  avivGeffen: 34,
  ehudBanai: 57,
};

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

async function scrapePage(page: Page, url: string) {
  // Check here if this a sub page of the artist and check if it's already been scraped.
  const selector = 'a.artist_player_songlist';

  await page.goto(url);

  const linksFromCurrentPage = await page.evaluate((selector) => {
    const anchors = Array.from(document.querySelectorAll(selector));
    return anchors.map((anchor) => {
      return anchor.href
    });
  }, selector);

  const validLinks = linksFromCurrentPage.filter(item => item.includes('wrkid'));

  for await (let validLink of validLinks) {
    await prisma.songURL.upsert({where: {url: validLink}, create: {url: validLink, scraped: false}, update: {url: validLink}});
  }
  console.log('Links collected ', url)

  const nextPage = await scrapeNextPages(page);
  if (nextPage) {
    await scrapePage(page, nextPage);
  }
}

async function buildUniqueURLs() {
  let browsers: Browser[] = [];

  const urls = flatten(Object.values(artists).map(id => {
    return [
      `https://shironet.mako.co.il/artist?type=works&lang=1&prfid=${id}`,
      `https://shironet.mako.co.il/artist?type=works&lang=1&prfid=${id}&sort=alpha&class=1`,
      `https://shironet.mako.co.il/artist?type=works&lang=1&prfid=${id}&sort=alpha&class=2`,
    ];
  }));

  const scrapedUrlsEntries = await prisma.songsPage.findMany({where: {scraped: true}, select: {url: true}});
  const scrapedUrls = scrapedUrlsEntries.map(({url}) => url);
  const unScrapedUrls = urls.filter(url => !scrapedUrls.includes(url));

  if (unScrapedUrls.length === 0) {
    console.log('No need to scraped any more pages')
    return;
  }

  for await (let url of unScrapedUrls) {
    const {page, browser} = await openPuppeteerPage(url);
    browsers.push(browser);

    // Check here if the page were scraped.
    let songPage = await prisma.songsPage.findFirst({where:{url}});

    if (!songPage) {
      console.log('Scraping', url)
      songPage = await prisma.songsPage.create({data: {url, scraped: false}})
    }

    if (!songPage.scraped) {
      try {
        await scrapePage(page, url);
        await prisma.songsPage.update({data: {scraped: true}, where: {id: songPage.id}})
        console.log(`${url} was scraped`)
      } catch (e) {
        console.error(`Failed scraped ${url}`, e)
      }
    } else {
      console.log('Already been scraped', url)
    }
  }

  browsers.forEach(browser => browser.close());
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
    .replaceAll(',', '')
    .replaceAll('.', '')
    .replaceAll('"', '')
    .replaceAll(':', '')
    .replaceAll('!', '')
    .split(' ')
    .filter(word => !['', "\n"].includes(word))
    .map(word => word.split("\n")))
    .filter(word => word.length === 5);

  await browser.close();
  return words;
}

export async function scrape() {
  console.log('Start scraping songs');
  await buildUniqueURLs();

  const songsPage = await prisma.songURL.findMany({where: {scraped: false}});

  for await (let songPage of songsPage) {
    const wordsFromSong = await getWordsFromSongPage(songPage.url);
    for await (let word of wordsFromSong) {
      await prisma.word.upsert({
        where: {word},
        create: {word},
        update: {word}
      });
    }
    await prisma.songURL.update({data: {scraped: true}, where: {id: songPage.id}})
  }

}
