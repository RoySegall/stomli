import styles from './Word.module.scss';

interface WordProps {
  selectedWord: string,
  currentWord: string,
  currentChance?: boolean
  optionalChance?: boolean
}

function getColorClass(selectedWord: string, index: string, letter: string) {
  if (selectedWord.includes(letter)) {
    return selectedWord.charAt(parseInt(index)) === letter ? 'correct' : 'wrongPlace';
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
        locationClass = currentWord.trim() ? getColorClass(selectedWord, index, letter) : '';
      }
      return <div key={index} className={`${styles.letter} ${styles[locationClass]}`}>{letter}</div>
    })}
  </div>
};


export { Word }
