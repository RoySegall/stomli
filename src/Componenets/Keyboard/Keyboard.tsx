import styles from './Keyboard.module.scss';
import {keys, Letter} from "./Keys";

interface KeyboardProps {
  addLetter: (letter: string) => void;
}

interface RowProps {
  row: Letter[];
  addLetter: (letter: string) => void;
  className?: string
}

interface ButtonProps {
  className?: string | undefined,
  onClick: () => void,
  letter: string
}

function Button({className, onClick, letter}: ButtonProps) {
  return <button className={`${styles.buttonLetter} ${className}`} onClick={onClick}>
    {letter}
  </button>;
}

const Row = ({row, addLetter, className}: RowProps) => {
  return <div className={className}>{row.map(({letter, className}, letterKey) =>
    <Button key={letterKey} className={className} onClick={() => addLetter(letter)} letter={letter}/>
  )}</div>
};

const Keyboard = ({addLetter}: KeyboardProps) => {
  return <div className={styles.keyboard}>
    <Row addLetter={addLetter} row={keys.Numbers}/>
    <div className={styles.secondRow}>
      <div>
        <Button onClick={() => addLetter('Enter')} className={styles.enterButton} letter={'Enter'} />
      </div>
      <div className={styles.keys}>
        <Row addLetter={addLetter} row={keys.Upper} className={styles.upper}/>
        <Row addLetter={addLetter} row={keys.Middle}/>
      </div>
    </div>
    <Row addLetter={addLetter} row={keys.Bottom} className={styles.bottomRow}/>
  </div>
}

export {Keyboard}
