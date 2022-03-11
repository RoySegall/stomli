import styles from './Message.module.scss'
import {useCallback} from "react";
import {shuffle} from 'lodash';

interface MessageProps {
  type: 'won' | 'lost';
  selectedWord: string;
  switchToNextRandomWord: () => void
}

export const Message = ({type, switchToNextRandomWord, selectedWord}: MessageProps) => {
  const successTitle = ['יאיי! הצלחת', 'מדהים!', 'נפלא', 'פנומנאלי', 'פנטסטי'];
  const lostTitle = ['לא נורא', 'בפעם הבאה', 'מכאן אפשר רק ללות'];

  const getTitle = useCallback(() => {
    if (type === 'won') {
      return shuffle(successTitle)[0];
    }

    return shuffle(lostTitle)[0];
  }, []);

  return <div className={`${styles.message} ${styles[type]}`}>
    <h2>{getTitle()}</h2>

    <p>המילה הנכונה היא <b>{selectedWord}</b></p>

    <button onClick={switchToNextRandomWord} className={styles.nextWord}>למילה הבאה</button>
  </div>
}
