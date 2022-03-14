import {iterateOverLinks, openPuppeteerPage} from "./api";

const pages = [
  'https://shironet.mako.co.il/artist?type=works&lang=1&prfid=975',
  'https://shironet.mako.co.il/artist?type=works&lang=1&prfid=975&sort=alpha&class=1',
  'https://shironet.mako.co.il/artist?type=works&lang=1&prfid=975&sort=alpha&class=1',
];

async function buildUniquePages(): Promise<string[]> {
  const {page, browser} = await openPuppeteerPage(pages[0]);

  const links = await iterateOverLinks(page, 'a.artist_player_songlist', (anchor: any) => {
    console.log(anchor.textContent);
    return 'a';
  });

  console.log(links)
  await browser.close();
  return [];
}

export async function scrape() {
  console.log('Start scraping songs');
  const pages = await buildUniquePages();
  console.log(pages);
}
