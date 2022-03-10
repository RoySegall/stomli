import {checkIfWordIsValid, getTodayWord, getNextWord, getDictionaryByYear} from './wordsService';
import {equal} from 'assert';

describe('Words service', function () {

  describe('checkIfWordIsValid', () => {
    it('should fail for words with less than 5 letters', () => {});
    it('should fail for words with more than 5 letters', () => {});
    it('should failed for valid words which not in any dictionary', () => {});
    it('should pass for valid words which not in the first dictionary', () => {});
    it('should pass for valid words which not in the second dictionary', () => {});
    it('should pass for valid words which not in the third dictionary', () => {});
    it('should pass for valid words which not in the leap year dictionary', () => {});
  });

  describe('getDictionaryByYear', () => {
    it('should return leap year for a leap year', () => {});
    it('should return firstYear for a ???', () => {});
    it('should return secondYear for a ???', () => {});
    it('should return thirdYear for a ???', () => {});
  });

  describe('getTodayWord', () => {
    it('should return ? for 01/01 for the first year', () => {});
    it('should return ? for 01/01 for the second year', () => {});
    it('should return ? for 01/01 for the third year', () => {});
    it('should return ? for 01/01 for the leap year', () => {});
    it('should return ? for 01/01 for the leap year', () => {});
    it('should return ? for 29/02 for the leap year', () => {});
  });

  describe('getNextWord', () => {
    it("should return a dictionary of words without the today's word we used", () => {});
    it("should return a dictionary of words without the today's word and another word we used", () => {});
    it("should return a dictionary of words without the today's word and other two words we used", () => {});
  });

});
