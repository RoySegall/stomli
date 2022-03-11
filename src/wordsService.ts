export function getDictionaryByYear(date: Date): 'firstYear' | 'secondYear' | 'thirdYear' | 'leapYear' {
  return 'firstYear';
}

export function getTodayWord(date: Date): string {
  return 'word';
}

export function getNextWord(usedWords: string[]): string {
  return 'word';
}

export function checkIfWordIsValid(word: string): boolean {
  return false;
}
