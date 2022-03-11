import {WordChallenge} from "./Componenets/WordChallenge/WordChallenge";
import {words} from "./words";
import {useCallback, useEffect, useState} from "react";
import {getNextWord, getTodayWord} from './wordsService';

function App() {
  const [selectedWord, setSelectedWord] = useState('');
  const [usedWords, setUsedWords] = useState<string[]>([]);

  const switchToNextRandomWord = useCallback(() => {
    const nextWord = getNextWord(usedWords);

    setSelectedWord(nextWord);
    setUsedWords([nextWord, ...usedWords])
  }, [selectedWord, usedWords]);

  useEffect(() => {
    const date = new Date();
    setSelectedWord(getTodayWord(date));
    setUsedWords([selectedWord])
  }, []);

  return <WordChallenge
    selectedWord={selectedWord}
    words={words}
    switchToNextRandomWord={switchToNextRandomWord} />;
}

export default App
