import styles from './Word.module.scss';

interface WordProps {
  selectedWord: string,
  currentWord: string,
  currentChance?: boolean
  optionalChance?: boolean
}

export function getColorClass(selectedWord: string, index: string, letter: string, currentWord: string) {
  if (selectedWord.includes(letter)) {
    // First, check if this is the correct place of the letter.
    if (selectedWord.charAt(parseInt(index)) === letter) {
      return 'correct';
    }

    // Second, check if the current word has the current letter. That's mean we already find the letter in the correct
    // place, but it should not be marked as wrong place.
    return currentWord.includes(letter) ? 'wrong' : 'wrongPlace';
  }

  return 'wrong';
}

const Word = ({selectedWord, currentWord, currentChance, optionalChance}: WordProps) => {

  if (currentWord.length > 0 || optionalChance === true) {
    // Calculating the number of spaces we need so we can have the extra empty boxes while typing.
    let append = '';
    for (let i = 0; i < 5 - currentWord.length; i++) {
      append = `${append} `;
    }

    currentWord = `${currentWord}${append}`;
  }

  return <div className={styles.word}>
    {Object.entries(currentWord).map(([index, letter]) => {
      let locationClass = '';

      if (!currentChance) {
        // Check which class we need based on the letter position.
        locationClass = currentWord.trim() ? getColorClass(selectedWord, index, letter, currentWord) : '';
      }
      return <div key={index} className={`${styles.letter} ${styles[locationClass]}`}>{letter}</div>
    })}
  </div>
};


export { Word }
