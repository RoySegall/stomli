import {Word} from './Componenets/Word/Word';
import styles from './App.module.scss'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import {useCallback, useEffect, useMemo, useState} from "react";

function App() {
  const selectedWord = 'שרשרת';
  const allowedLetters = 'אבגדהוזחטיכלמנסעפצקרשתץםף'
  const { width, height } = useWindowSize();
  const [currentChance, setCurrentChance] = useState([]);
  const [chances, setChances] = useState([]);
  const [stopListenToKeyBoard, setStopListenToKeyBoard] = useState(false);
  const won = useMemo(() => chances[chances.length -1] === selectedWord, [chances]);
  const fillEmptyLines = useMemo(() => (currentChance.length !== 0 ? 4 : 5) - chances.length, [chances, currentChance]);

  const handleKeyBoard = useCallback(({key}: KeyboardEvent) => {
    if (key === 'Backspace') {
      // Delete the words.
      setCurrentChance([...currentChance.slice(0, -1)]);
    }

    if (key === 'Enter' && currentChance.length === 5) {
      // Adding the current attempt, successful or not, to the list of chances.
      let currentWord = currentChance.join('');
      let tempChances = chances;
      setCurrentChance([]);

      if (currentWord === selectedWord || tempChances.length === 4) {
        setStopListenToKeyBoard(true);
      }


      tempChances.push(currentWord);
      setChances([...tempChances])
    }

    if (allowedLetters.includes(key) && currentChance.length !== 5) {
      // The current letter is allowed so we can add it to the current chance.
      currentChance.push(key);
      setCurrentChance([...currentChance]);
    }
  }, [currentChance, setCurrentChance, chances]);

  useEffect(() => {
    addEventListener('keydown', handleKeyBoard);

    if (stopListenToKeyBoard) {
      // The user tried 5 times or got it the word correctly.
      removeEventListener('keydown', handleKeyBoard);
    }

    return () => {
      removeEventListener('keydown', handleKeyBoard);
    };
  }, [currentChance, stopListenToKeyBoard]);

  return <div className={styles.app}>
    <h1>סתוםלי</h1>

    {won && <Confetti width={width} height={height} />}

    {chances.map((chance, key) => <Word key={key} selectedWord={selectedWord} currentWord={chance} />)}
    {currentChance && <Word selectedWord={selectedWord} currentWord={currentChance.join('')} currentChance={true} /> }
    {[...Array.from({length: fillEmptyLines}).keys()]
      .map((iterator, key) => <Word key={key} selectedWord={selectedWord} currentWord={''} optionalChance={true} />)}


    { !won && <input type='text' className={styles.input} /> }
  </div>

}

export default App
