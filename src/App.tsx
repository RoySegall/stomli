import {WordChallenge} from "./Componenets/WordChallenge/WordChallenge";
import {words} from "./words";
import {useCallback, useEffect, useState} from "react";
import {random, clone} from 'lodash';

function App() {
  const [selectedWord, setSelectedWord] = useState('');
  const getTodayWord = useCallback(() => {
    // Until we have a lot of words, we'll use the first one as today word.
    return words[0];
  }, []);

  const switchToNextRandomWord = useCallback(() => {
    let clonedWord = clone(words);

    delete clonedWord[0];
    setSelectedWord(clonedWord[random(0, clonedWord.length)]);
  }, []);

  useEffect(() => {
    setSelectedWord(getTodayWord());
  }, []);

  return <WordChallenge
    selectedWord={selectedWord}
    words={words}
    switchToNextRandomWord={switchToNextRandomWord} />;
}

export default App
