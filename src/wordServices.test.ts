import {
  checkIfWordIsValid,
  getTodayWord,
  getNextWord,
  getDictionaryByYear,
  getDayInYear,
  getAllWords
} from './wordsService';

import * as wordsService from './wordsService'
import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('Words service', function () {
  const getDateByYear = (year: number, month = 0, day = 1) => new Date(year, month, day, 0, 0, 0);

  describe('checkIfWordIsValid', () => {
    beforeEach(() => {
      vi.restoreAllMocks();
    })

    it('should fail for words with less than 5 letters', () => {expect(checkIfWordIsValid('אמא')).toBeFalsy()});
    it('should fail for words with more than 5 letters', () => {expect(checkIfWordIsValid('אהבתיה')).toBeFalsy()});
    it.only('should failed for valid words which not in any dictionary', () => {expect(checkIfWordIsValid('תרכוס')).toBeFalsy()});
    it('should pass for valid words which in the first dictionary', () => {expect(checkIfWordIsValid('בעירה')).toBeTruthy()});
    it('should pass for valid words which in the second dictionary', () => {expect(checkIfWordIsValid('החמצה')).toBeTruthy()});
    it('should pass for valid words which not in the third dictionary', () => {expect(checkIfWordIsValid('אהובי')).toBeTruthy()});
    it('should pass for valid words which not in the leap year dictionary', () => {expect(checkIfWordIsValid('מסעדה')).toBeTruthy()});
  });

  describe('getDictionaryByYear', () => {
    it('should return leapYear for a leap year', () => {
      expect(getDictionaryByYear(getDateByYear(2000))).toBe( 'leapYear');
      expect(getDictionaryByYear(getDateByYear(2004))).toBe( 'leapYear');
      expect(getDictionaryByYear(getDateByYear(2008))).toBe( 'leapYear');
      expect(getDictionaryByYear(getDateByYear(2012))).toBe( 'leapYear');
    });
    it('should return firstYear for the first year after the leap year', () => {
      expect(getDictionaryByYear(getDateByYear(2001))).toBe( 'firstYear');
      expect(getDictionaryByYear(getDateByYear(2005))).toBe( 'firstYear');
      expect(getDictionaryByYear(getDateByYear(2009))).toBe( 'firstYear');
      expect(getDictionaryByYear(getDateByYear(2013))).toBe( 'firstYear');
    });
    it('should return secondYear for the second year after the leap year', () => {
      expect(getDictionaryByYear(getDateByYear(2002))).toBe( 'secondYear');
      expect(getDictionaryByYear(getDateByYear(2006))).toBe( 'secondYear');
      expect(getDictionaryByYear(getDateByYear(2010))).toBe( 'secondYear');
      expect(getDictionaryByYear(getDateByYear(2014))).toBe( 'secondYear');
    });
    it('should return thirdYear for the third year after the leap year', () => {
      expect(getDictionaryByYear(getDateByYear(2003))).toBe( 'thirdYear');
      expect(getDictionaryByYear(getDateByYear(2007))).toBe( 'thirdYear');
      expect(getDictionaryByYear(getDateByYear(2011))).toBe( 'thirdYear');
      expect(getDictionaryByYear(getDateByYear(2015))).toBe( 'thirdYear');
    });
  });

  describe('getDayInYear', () => {
    const maxDates = {1: 31, 2: 28, 3: 31, 4: 30, 5: 31, 6: 30, 7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31};

    it('should return proper number for each day in the year', () => {
      let it = 0;
      Object.entries(maxDates).forEach(([month, maxDays]) => {
        const monthAsDate = parseInt(month) - 1;

        for (let i = 1; i <= maxDays; i++) {
          expect(getDayInYear(2022, monthAsDate, i)).toBe(it);
          it++;
        }
      });
    })
  });

  describe('getTodayWord', () => {
    it('should return ? for 01/01 for the first year', () => {
      expect(getTodayWord(getDateByYear(2001))).toBe( 'בעירה');
    });
    it('should return ? for 01/01 for the second year', () => {
      expect(getTodayWord(getDateByYear(2002))).toBe( 'החמצה');
    });
    it('should return ? for 01/01 for the third year', () => {
      expect(getTodayWord(getDateByYear(2003))).toBe( 'אהובי');
    });
    it('should return ? for 01/01 for the leap year', () => {
      expect(getTodayWord(getDateByYear(2000))).toBe( 'מסעדה');
    });
    it('should return ? for 29/02 for the leap year', () => {
      expect(getTodayWord(getDateByYear(2000, 1, 29))).toBe('גרגרן');
    });
  });

  describe('getNextWord', () => {
    const checkWordsNotRepeats = (todayWords: string[]) => {
      const nextWord = getNextWord(todayWords);
      todayWords.forEach(word => !nextWord.includes(word))
    }

    it("should return a dictionary of words without the today's word we used", () => {
      checkWordsNotRepeats(['פיצה'])
    });
    it("should return a dictionary of words without the today's word and another word we used", () => {
      checkWordsNotRepeats(['פיצה', 'אימוץ'])
    });
    it("should return a dictionary of words without the today's word and other two words we used", () => {
      checkWordsNotRepeats(['פיצה', 'אימוץ', 'רביכה'])
    });
  });
});
