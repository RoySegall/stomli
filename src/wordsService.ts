import {shuffledWords} from "./shuffle-words";
import {filter, shuffle} from 'lodash';

type YearTypes = 'firstYear' | 'secondYear' | 'thirdYear' | 'leapYear';

function getAllWords(): string[] {
  const {leapYear, secondYear, thirdYear, firstYear} = shuffledWords;
  return [...leapYear, ...secondYear, ...thirdYear, ...firstYear]
}

export function getDayInYear(year: number, month= 0, day = 1): number {
  const getDateByYear = (year: number, month= 0, day = 1) => new Date(year, month, day, 0, 0, 0);

  // Get today timestamp.
  const [today, startYear] = [
    getDateByYear(year, month, day),
    getDateByYear(year, 0, 1)
  ];

  // Get the start of the year date.
  const startYearUnix = startYear.getTime() / 1000;
  const todayUnix = today.getTime() / 1000;

  return Math.round((todayUnix - startYearUnix) / 86400);
}

export function getDictionaryByYear(date: Date): YearTypes {
  const year = date.getFullYear();
  const yearDictMap: {[index: number]: YearTypes;} = {0: 'leapYear', 1: 'firstYear', 2: 'secondYear', 3: 'thirdYear'};

  return yearDictMap[year % 4];
}

export function getTodayWord(date: Date): string {
  const words = shuffledWords[getDictionaryByYear(date)];
  const dayIndex = getDayInYear(date.getFullYear(), date.getMonth(), date.getDate());

  return words[dayIndex];
}

export function getNextWord(usedWords: string[]): string {
  const allWords = getAllWords();

  return shuffle(filter(allWords, word => !usedWords.includes(word)))[0];
}

export function checkIfWordIsValid(word: string): boolean {
  if (word.length !== 5) {
    return false;
  }

  return getAllWords().includes(word);
}
