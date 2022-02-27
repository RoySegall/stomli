import Confetti from "react-confetti";
import useWindowSize from 'react-use/lib/useWindowSize';


interface WonProps {
  switchToNextRandomWord: () => void;
}

const Won = ({switchToNextRandomWord}: WonProps) => {
  const {width, height} = useWindowSize();

  return <>
    <Confetti width={width} height={height}/>
    <button onClick={switchToNextRandomWord}>Next word</button>
  </>;
}

export {Won}
