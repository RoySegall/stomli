import {toast, ToastContainer} from "react-toastify";
import styles from "../App/App.module.scss";
import 'react-toastify/dist/ReactToastify.css';
import {Rows} from "../Rows/Rows";
import {Keyboard} from "../Keyboard/Keyboard";
import {Message} from "../Message/Message";
import Confetti from "react-confetti";
import {useWordChallenge} from "./useWordChallenge";

interface WordChallengeProps {
  selectedWord: string
  words: string[]
  switchToNextRandomWord: () => void
}

const WordChallenge = ({selectedWord, words, switchToNextRandomWord}: WordChallengeProps) => {
  const {won, width, height, lost, chances, currentChance, addLetter, letterStatus} = useWordChallenge(selectedWord, words) as any;

  return <div className={`${styles.app} ${styles.dark}`}>
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

    {won && <Confetti width={width} height={height}/>}
    {(won || lost) && <Message
      type={won ? 'won' : 'lost'}
      selectedWord={selectedWord}
      switchToNextRandomWord={switchToNextRandomWord} />
    }

    <div className={styles.upper}>
      <h1>סתום-לי</h1>
      <Rows selectedWord={selectedWord} chances={chances} currentChance={currentChance}/>
    </div>

    <Keyboard addLetter={addLetter} letterStatus={letterStatus}/>
  </div>
};

export {WordChallenge};
