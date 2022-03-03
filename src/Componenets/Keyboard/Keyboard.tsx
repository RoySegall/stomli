import styles from './Keyboard.module.scss';
import {keys, Letter} from "./Keys";

interface KeyboardProps {
  addLetter: (letter: string) => void;
  chances?: string[]
  letterStatus: object;
}

interface RowProps {
  row: Letter[];
  addLetter: (letter: string) => void;
  className?: string
  letterStatus: any;
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

const Row = ({row, addLetter, letterStatus}: RowProps) => {
  return <div className={styles.row}>{row.map(({letter, className, disabled}, letterKey) => {

    let status;
    if (Object.keys(letterStatus).includes(letter)) {
      status = letterStatus[letter] ;
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

const Keyboard = ({addLetter, letterStatus}: KeyboardProps) => {
  return <div className={styles.keyboard}>
    <Row addLetter={addLetter} row={keys.Numbers} letterStatus={letterStatus} />
    <Row addLetter={addLetter} row={keys.Middle} letterStatus={letterStatus} />
    <Row addLetter={addLetter} row={keys.Bottom} letterStatus={letterStatus} />

    <div className={styles.bottomRow}>
      <Button onClick={() => addLetter('Enter')} className={styles.enterButton} letter={'אישור'} />
      <Button onClick={() => addLetter('Delete')} className={styles.enterButton} letter={'מחק'} />
    </div>

  </div>
}

export {Keyboard}
