import {useCallback, useEffect, useMemo, useState} from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import {toast} from "react-toastify";
import {getColorClass} from "../Word/Word";
import styles from "../App/App.module.scss";

type LetterStatus = Record<string, string>;

interface UseWordChallengeInterface {
  won: boolean;
  lost: boolean;
  width: number;
  height: number
  chances: string[]
  currentChance: string[]
  addLetter: (letter: string) => void;
  letterStatus: LetterStatus;
  className: string;
}

function useWordChallenge(selectedWord: string, words: string[]): UseWordChallengeInterface {
  const allowedLetters = 'אבגדהוזחטיכלמנסעפצקרשתץםףן'
  const [currentChance, setCurrentChance] = useState<string[]>([]);
  const [chances, setChances] = useState<string[]>([]);
  const [stopListenToKeyBoard, setStopListenToKeyBoard] = useState(false);
  const [letterStatus, setLetterStatus] = useState<LetterStatus>({});
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const won = useMemo(() => chances[chances.length - 1] === selectedWord, [chances, selectedWord]);
  const lost = useMemo(() => chances.length === 6 && !chances.includes(selectedWord), [selectedWord, chances]);
  const {width, height} = useWindowSize();

  const deleteWord = useCallback(() => setCurrentChance([...currentChance.slice(0, -1)]), [currentChance, setCurrentChance]);

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

      if (currentWord === selectedWord || tempChances.length === 5) {
        setStopListenToKeyBoard(true);
      }

      // @ts-ignore
      tempChances.push(currentWord);
      setChances([...tempChances]);

      Object.entries(currentWord).forEach(([index, letter]) => {
        letterStatus[letter] = getColorClass(selectedWord, index, letter);
      });
      setLetterStatus(letterStatus);
    }
  }, [currentChance, setCurrentChance, chances]);

  const addLetter = useCallback((letter: string) => {
    letter = letter.toLocaleLowerCase();

    if (letter === 'delete') {
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

  const className = useMemo(() => {

    if (!darkMode) {
      return styles.app;
    }

    return `${styles.app} ${styles.dark}`;
  }, [darkMode]);

  function handleCallback({matches}: MediaQueryListEvent) {
    setDarkMode(matches);
  }

  useEffect(() => {
    const colorSchema = window.matchMedia('(prefers-color-scheme: dark)');

    setDarkMode(colorSchema.matches)

    colorSchema.addEventListener("change", handleCallback);
    return () => {
      colorSchema.removeEventListener("change", handleCallback);
    };
  }, []);

  return {
    won,
    lost,
    width,
    height,
    chances,
    currentChance,
    addLetter,
    letterStatus,
    className
  }
}

export {useWordChallenge}
