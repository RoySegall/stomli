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

const Row = ({row, addLetter, className, letterStatus}: RowProps) => {
  return <div className={className}>{row.map(({letter, className, disabled}, letterKey) => {

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
  console.log(letterStatus)
  return <div className={styles.keyboard}>
    <Row addLetter={addLetter} row={keys.Numbers} letterStatus={letterStatus} />
    <div className={styles.secondRow}>
      <div>
        <Button onClick={() => addLetter('Enter')} className={styles.enterButton} letter={'Enter'} />
      </div>
      <div className={styles.keys}>
        <Row addLetter={addLetter} row={keys.Upper} className={styles.upper} letterStatus={letterStatus} />
        <Row addLetter={addLetter} row={keys.Middle} letterStatus={letterStatus} />
      </div>
    </div>
    <Row addLetter={addLetter} row={keys.Bottom} className={styles.bottomRow} letterStatus={letterStatus} />
  </div>
}

export {Keyboard}
