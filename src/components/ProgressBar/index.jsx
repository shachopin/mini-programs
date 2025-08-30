import { useEffect, useRef, useState } from "react";
import ProgressBar from "./progressBar";

const totalMs = 15 * 1000;
const interval = 1 * 1000;
const totalCycles = totalMs / interval;
const progressMade = (interval / totalMs) * 100;
export default function App() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let cyclesCompleted = 0 //no need to make it a useRef
    let timeId = setInterval(() => { //no need to make timeId as a useRef
      setProgress((prevProgress) => prevProgress + progressMade);
      cyclesCompleted += 1;
      console.log(cyclesCompleted) //works show from 1 to 15
      if (cyclesCompleted === totalCycles) clearInterval(timeId);
    }, interval);

    return () => {
      clearInterval(timeId);
    };
  }, []); //because the callback fun has no external variable reference, so you put nothing in depend array and use setInterval no problem
  return <ProgressBar progress={progress} />;
}


//teacher version

/*
import { useEffect, useRef, useState } from "react";
import ProgressBar from "./progressBar";

const totalMs = 15 * 1000;
const interval = 1 * 1000;
const totalCycles = totalMs / interval;
const progressMade = (interval / totalMs) * 100;
export default function App() {
  const [progress, setProgress] = useState(0);
  const timer = useRef();
  const cyclesCompleted = useRef(0);
  useEffect(() => {
    timer.current = setInterval(() => {
      setProgress((prevProgress) => prevProgress + progressMade);
      cyclesCompleted.current += 1;
      if (cyclesCompleted.current === totalCycles) clearInterval(timer.current);
    }, interval);

    return () => {
      clearInterval(timer.current);
    };
  }, []);
  return <ProgressBar progress={progress} />;
}

*/
