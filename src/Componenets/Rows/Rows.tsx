import {Word} from "../Word/Word";
import {useMemo} from "react";

interface RowsProps {
  chances: string[]
  selectedWord: string
  currentChance: string[]
}

const Rows = ({chances, selectedWord, currentChance}: RowsProps) => {
  const fillEmptyLines = useMemo(() => (currentChance.length !== 0 ? 4 : 5) - chances.length, [chances, currentChance]);

  return <>
    {chances.map((chance, key) => <Word key={key} selectedWord={selectedWord} currentWord={chance}/>)}
    {currentChance && <Word selectedWord={selectedWord} currentWord={currentChance.join('')} currentChance={true}/>}
    {[...Array.from({length: fillEmptyLines}).keys()]
      .map((iterator, key) => <Word key={key} selectedWord={selectedWord} currentWord={''} optionalChance={true}/>)}
  </>
}

export {Rows}
