import {useCallback, useEffect, useState} from "react";
import {getNextWord, getTodayWord} from "../../wordsService";

interface UseApp {
  selectedWord: string,
  switchToNextRandomWord: () => void;
}

function useApp(): UseApp {
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

  return {selectedWord, switchToNextRandomWord}
}

export {useApp}
