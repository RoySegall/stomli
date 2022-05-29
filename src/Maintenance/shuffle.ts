import { words } from '../words';
import {shuffle, chunk, sample} from 'lodash'
import {writeFile} from "fs";

const shuffledWords = shuffle(words);
const [firstYear, secondYear, thirdYear, leapYear, extra] = chunk(shuffledWords, 365);
let randomWordFromExtra = sample(extra);

if (randomWordFromExtra) {
  leapYear.push(randomWordFromExtra);
}

writeFile('./shuffle-words.ts', JSON.stringify({
  firstYear,
  secondYear,
  thirdYear,
  leapYear
}), (error) => {
  console.error(error);
})
