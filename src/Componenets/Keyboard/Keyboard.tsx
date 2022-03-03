import styles from './Keyboard.module.scss';
import {keys, Letter} from "./Keys";
import {getColorClass} from "../Word/Word";
import {isEmpty, last} from "lodash";

interface KeyboardProps {
  addLetter: (letter: string) => void;
  selectedWord: string
  chances?: string[]
}

interface RowProps {
  row: Letter[];
  addLetter: (letter: string) => void;
  className?: string
  correctLetters?: string[]
  misplacedLetters?: string[]
}

interface ButtonProps {
  className?: string | undefined;
  onClick: () => void;
  letter: string;
  disabled?: boolean
}

function Button({className, onClick, letter, disabled}: ButtonProps) {
  return <button className={`${styles.buttonLetter} ${className}`} onClick={onClick} disabled={Boolean(disabled)}>
    {letter}
  </button>;
}

const Row = ({row, addLetter, className, misplacedLetters = [], correctLetters = []}: RowProps) => {
  return <div className={className}>{row.map(({letter, className, disabled}, letterKey) => {

    let status;
    if (!isEmpty(misplacedLetters) && misplacedLetters.includes(letter)) {
      status = 'misplaced';
    } else if (!isEmpty(correctLetters) && correctLetters.includes(letter)) {
      status = 'correct';
    }

    return <Button
        disabled={disabled}
        key={letterKey}
        className={`${className} ${status && styles[status]}`}
        onClick={() => addLetter(letter)}
        letter={letter} />
  }

  )}</div>
};

const Keyboard = ({addLetter, selectedWord, chances}: KeyboardProps) => {

  const correctLetters: string[] = [];
  const misplacedLetters: string[] = [];

  const lastWord = last(chances);

  if (lastWord) {
    Object.entries(lastWord).forEach(([index,letter], key) => {
      const color = getColorClass(selectedWord, index, letter);
      console.log(color);

      if (color === 'wrongPlace') {
        misplacedLetters.push(letter);
      }

      if (color === 'correct') {
        correctLetters.push(letter);
      }
    });
  }

  return <div className={styles.keyboard}>
    <Row addLetter={addLetter} row={keys.Numbers}/>
    <div className={styles.secondRow}>
      <div>
        <Button onClick={() => addLetter('Enter')} className={styles.enterButton} letter={'Enter'} />
      </div>
      <div className={styles.keys}>
        <Row addLetter={addLetter} row={keys.Upper} className={styles.upper} correctLetters={correctLetters} misplacedLetters={misplacedLetters} />
        <Row addLetter={addLetter} row={keys.Middle} correctLetters={correctLetters} misplacedLetters={misplacedLetters} />
      </div>
    </div>
    <Row addLetter={addLetter} row={keys.Bottom} className={styles.bottomRow} correctLetters={correctLetters} misplacedLetters={misplacedLetters} />
  </div>
}

export {Keyboard}
