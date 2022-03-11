import {checkIfWordIsValid, getTodayWord, getNextWord, getDictionaryByYear} from './wordsService';
import {equal, ok} from 'assert';

describe('Words service', function () {
  const getDateByYear = (year: number, month = 0, day = 1) => new Date(year, month, day, 0, 0, 0);

  describe('checkIfWordIsValid', () => {
    it('should fail for words with less than 5 letters', () => {equal(checkIfWordIsValid('אמא'), false)});
    it('should fail for words with more than 5 letters', () => {equal(checkIfWordIsValid('אהבתיה'), false)});
    it('should failed for valid words which not in any dictionary', () => {equal(checkIfWordIsValid('סוכרת'), false)});
    it('should pass for valid words which in the first dictionary', () => {ok(checkIfWordIsValid('בעירה'))});
    it('should pass for valid words which in the second dictionary', () => {ok(checkIfWordIsValid('החמצה'))});
    it('should pass for valid words which not in the third dictionary', () => {ok(checkIfWordIsValid('רביכה'))});
    it('should pass for valid words which not in the leap year dictionary', () => {ok(checkIfWordIsValid('מסעדה'))});
  });

  describe('getDictionaryByYear', () => {
    it('should return leapYear for a leap year', () => {
      equal(getDictionaryByYear(getDateByYear(2000)), 'leapYear');
      equal(getDictionaryByYear(getDateByYear(2004)), 'leapYear');
      equal(getDictionaryByYear(getDateByYear(2008)), 'leapYear');
      equal(getDictionaryByYear(getDateByYear(2012)), 'leapYear');
    });
    it('should return firstYear for the first year after the leap year', () => {
      equal(getDictionaryByYear(getDateByYear(2001)), 'firstYear');
      equal(getDictionaryByYear(getDateByYear(2005)), 'firstYear');
      equal(getDictionaryByYear(getDateByYear(2009)), 'firstYear');
      equal(getDictionaryByYear(getDateByYear(2013)), 'firstYear');
    });
    it('should return secondYear for the second year after the leap year', () => {
      equal(getDictionaryByYear(getDateByYear(2002)), 'secondYear');
      equal(getDictionaryByYear(getDateByYear(2006)), 'secondYear');
      equal(getDictionaryByYear(getDateByYear(2010)), 'secondYear');
      equal(getDictionaryByYear(getDateByYear(2014)), 'secondYear');
    });
    it('should return thirdYear for the third year after the leap year', () => {
      equal(getDictionaryByYear(getDateByYear(2003)), 'thirdYear');
      equal(getDictionaryByYear(getDateByYear(2007)), 'thirdYear');
      equal(getDictionaryByYear(getDateByYear(2011)), 'thirdYear');
      equal(getDictionaryByYear(getDateByYear(2015)), 'thirdYear');
    });
  });

  describe('getTodayWord', () => {
    it('should return ? for 01/01 for the first year', () => {
      equal(getTodayWord(getDateByYear(2001)), 'בעירה');
    });
    it('should return ? for 01/01 for the second year', () => {
      equal(getTodayWord(getDateByYear(2002)), 'החמצה');
    });
    it('should return ? for 01/01 for the third year', () => {
      equal(getTodayWord(getDateByYear(2003)), 'החמצה');
    });
    it('should return ? for 01/01 for the leap year', () => {
      equal(getTodayWord(getDateByYear(2000)), 'רביכה');
    });
    it('should return ? for 29/02 for the leap year', () => {
      equal(getTodayWord(getDateByYear(2000)), 'רביכה');
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
