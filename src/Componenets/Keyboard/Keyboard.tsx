import styles from './Keyboard.module.scss';
import {keys} from "./Keys";

interface KeyboardProps {
  addLetter: (letter: string) => void;
}

const Keyboard = ({addLetter}: KeyboardProps) => {
  return <div className={styles.keyboard}>
    {keys.map((row, rowKey) => <div key={rowKey}>
      {row.map(({letter}, letterKey) =>
        <button className={styles.buttonLetter} key={letterKey} onClick={() => addLetter(letter)}>
          {letter}
        </button>
      )}
    </div>)}
  </div>
}

export {Keyboard}
