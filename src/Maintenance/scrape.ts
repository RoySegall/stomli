import {wikiDictionaryScrape, songsScrape} from '../ScrapeUtils';

(async () => {
  await Promise.all([
    wikiDictionaryScrape(),
    songsScrape()
  ]);
})();
