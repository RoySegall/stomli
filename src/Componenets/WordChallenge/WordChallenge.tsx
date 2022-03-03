import {useCallback, useEffect, useMemo, useReducer, useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import styles from "../../App.module.scss";
import 'react-toastify/dist/ReactToastify.css';
import {Rows} from "../Rows/Rows";
import {Lost} from "../Lost/Lost";
import {Won} from "../Won/Won";
import {Keyboard} from "../Keyboard/Keyboard";
import {getColorClass} from "../Word/Word";

interface WordChallengeProps {
  selectedWord: string
  words: string[]
  switchToNextRandomWord: () => void
}

const WordChallenge = ({selectedWord, words, switchToNextRandomWord}: WordChallengeProps) => {
  const allowedLetters = 'אבגדהוזחטיכלמנסעפצקרשתץםףן'
  const [currentChance, setCurrentChance] = useState<string[]>([]);
  const [chances, setChances] = useState<string[]>([]);
  const [stopListenToKeyBoard, setStopListenToKeyBoard] = useState(false);
  const [letterStatus, setLetterStatus] = useState<object>({});
  const won = useMemo(() => chances[chances.length - 1] === selectedWord, [chances, selectedWord]);
  const lost = useMemo(() => chances.length === 5 && !chances.includes(selectedWord), [selectedWord, chances]);

  const deleteWord = useCallback(() => {
    setCurrentChance([...currentChance.slice(0, -1)]);
  }, [currentChance, setCurrentChance]);

  const enter = useCallback(() => {
    if (currentChance.length < 5) {
      toast.error('אין מספיק אותיות');
      return;
    }

    if (currentChance.length === 5) {
      let currentWord = currentChance.join('');

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
      setChances([...tempChances]);

      Object.entries(currentWord).forEach(([index, letter]) => {
        // @ts-ignore
        letterStatus[letter] = getColorClass(selectedWord, index, letter);
      });
      setLetterStatus(letterStatus);
    }
  }, [currentChance, setCurrentChance, chances]);

  const addLetter = useCallback((letter: string) => {
    letter = letter.toLocaleLowerCase();

    if  (letter === 'delete') {
      deleteWord();
      return;
    }

    if (letter === 'enter') {
      enter();
      return;
    }

    if (currentChance.length < 5 && allowedLetters.includes(letter)) {
      currentChance.push(letter);
      setCurrentChance([...currentChance]);
    }
  }, [currentChance, setCurrentChance]);

  const handleKeyBoard = useCallback(({key}: KeyboardEvent) => {
    if (key === 'Backspace') {
      // Delete the words.
      deleteWord();
    }

    if (key === 'Enter') {
      enter();
    }

    if (allowedLetters.includes(key) && currentChance.length !== 5) {
      // The current letter is allowed so we can add it to the current chance.
      // @ts-ignore
      addLetter(key);
    }
  }, [currentChance, setCurrentChance, chances]);

  useEffect(() => {
    setCurrentChance([]);
    setChances([]);
    setStopListenToKeyBoard(false);
    setLetterStatus({});
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
    {won && <Won switchToNextRandomWord={switchToNextRandomWord}  /> }
    {lost && <Lost selectedWord={selectedWord} /> }

    <div className={styles.upper}>
      <h1>סתום-לי</h1>
      <Rows selectedWord={selectedWord} chances={chances} currentChance={currentChance} />
    </div>

    <Keyboard addLetter={addLetter} letterStatus={letterStatus} />
  </div>
};


export {WordChallenge};
