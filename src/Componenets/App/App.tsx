import {useCallback, useEffect, useState} from "react";
import {WordChallenge} from "../WordChallenge/WordChallenge";
import {getNextWord, getTodayWord, getAllWords} from "../../wordsService";

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
    words={getAllWords()}
    switchToNextRandomWord={switchToNextRandomWord} />;
}

export default App
