import {shuffledWords} from "./shuffle-words";

type YearTypes = 'firstYear' | 'secondYear' | 'thirdYear' | 'leapYear';

function getAllWords(): string[] {
  const {leapYear, secondYear, thirdYear, firstYear} = shuffledWords;
  return [...leapYear, ...secondYear, ...thirdYear, ...firstYear]
}

export function getDictionaryByYear(date: Date): YearTypes {
  const year = date.getFullYear();
  const yearDictMap: {[index: number]: YearTypes;} = {0: 'leapYear', 1: 'firstYear', 2: 'secondYear', 3: 'thirdYear'};

  return yearDictMap[year % 4];
}

export function getTodayWord(date: Date): string {
  return 'word';
}

export function getNextWord(usedWords: string[]): string {
  return 'word';
}

export function checkIfWordIsValid(word: string): boolean {

  if (word.length !== 5) {
    return false;
  }

  return getAllWords().includes(word);
}
