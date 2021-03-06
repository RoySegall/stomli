import {WordChallenge} from "../WordChallenge/WordChallenge";
import {getAllWords} from "../../wordsService";
import {useApp} from './useApp';

function App() {
  const {selectedWord, switchToNextRandomWord} = useApp();

  return <WordChallenge
    selectedWord={selectedWord}
    words={getAllWords()}
    switchToNextRandomWord={switchToNextRandomWord} />;
}

export default App
