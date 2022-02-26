import {useWindowSize} from "react-use";
import {useCallback, useEffect, useMemo, useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import styles from "../../App.module.scss";
import Confetti from "react-confetti";
import {Word} from "../Word/Word";
import 'react-toastify/dist/ReactToastify.css';

interface WordChallengeProps {
  selectedWord: string
  words: string[]
  switchToNextRandomWord: () => void
}

const WordChallenge = ({selectedWord, words, switchToNextRandomWord}: WordChallengeProps) => {
  const allowedLetters = 'אבגדהוזחטיכלמנסעפצקרשתץםף'
  const {width, height} = useWindowSize();
  const [currentChance, setCurrentChance] = useState([]);
  const [chances, setChances] = useState([]);
  const [stopListenToKeyBoard, setStopListenToKeyBoard] = useState(false);
  const won = useMemo(() => chances[chances.length - 1] === selectedWord, [chances, selectedWord]);
  const fillEmptyLines = useMemo(() => (currentChance.length !== 0 ? 4 : 5) - chances.length, [chances, currentChance]);

  const handleKeyBoard = useCallback(({key}: KeyboardEvent) => {
    if (key === 'Backspace') {
      // Delete the words.
      setCurrentChance([...currentChance.slice(0, -1)]);
    }

    if (key === 'Enter') {
      if (currentChance.length < 5) {
        toast.error('אין מספיק אותיות');
        return;
      }

      if (currentChance.length === 5) {
        let currentWord = currentChance.join('');

        // todo: check if the word exists in the dictionary of words.
        if (!words.includes(currentWord)) {
          toast.error('המילה לא קיימת במילון');
          return;
        }

        // Adding the current attempt, successful or not, to the list of chances.
        let tempChances = chances;
        setCurrentChance([]);

        if (currentWord === selectedWord || tempChances.length === 4) {
          setStopListenToKeyBoard(true);
        }

        // @ts-ignore
        tempChances.push(currentWord);
        setChances([...tempChances])
      }
    }

    if (allowedLetters.includes(key) && currentChance.length !== 5) {
      // The current letter is allowed so we can add it to the current chance.
      // @ts-ignore
      currentChance.push(key);
      setCurrentChance([...currentChance]);
    }
  }, [currentChance, setCurrentChance, chances]);

  useEffect(() => {
    setCurrentChance([]);
    setChances([]);
    setStopListenToKeyBoard(false);
  }, [selectedWord])

  useEffect(() => {
    addEventListener('keydown', handleKeyBoard);

    if (stopListenToKeyBoard) {
      // The user tried 5 times or got it the word correctly.
      removeEventListener('keydown', handleKeyBoard);
    }

    return () => {
      removeEventListener('keydown', handleKeyBoard);
    };
  }, [currentChance, stopListenToKeyBoard, selectedWord]);

  return <div className={styles.app}>
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={true}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover
      theme={'dark'}
    />

    <h1>סתוםלי</h1>

    {won && <>
      <Confetti width={width} height={height}/>

      <button onClick={switchToNextRandomWord}>Next word</button>
    </>}

    {chances.map((chance, key) => <Word key={key} selectedWord={selectedWord} currentWord={chance}/>)}
    {currentChance && <Word selectedWord={selectedWord} currentWord={currentChance.join('')} currentChance={true}/>}
    {[...Array.from({length: fillEmptyLines}).keys()]
      .map((iterator, key) => <Word key={key} selectedWord={selectedWord} currentWord={''} optionalChance={true}/>)}


    {!won && <input type='text' className={styles.input}/>}
  </div>
};


export {WordChallenge};
