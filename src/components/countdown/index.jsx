import React, { useEffect, useRef } from "react";

const CountDown = ({ hours = 0, minutes = 0, seconds = 0 }) => {
  const [paused, setPaused] = React.useState(false);
  const [over, setOver] = React.useState(false);
  //if I use ref for paused and over, why still need these state variables? for rerender page text
  const [[h, m, s], setTime] = React.useState([hours, minutes, seconds]);
  const pausedRef = useRef(paused);
  const overRef = useRef(over);
  const tick = () => {
    //because you used setInterval with [] dep, so tick will be original version, key here is to make it NOT rely on any state variable directly, but use state callback and ref
    if (pausedRef.current || overRef.current) {
      console.log("ended"); //will continue running until unmounted
      return;
    }
    setTime(([h, m, s]) => {
      if (h === 0 && m === 0 && s === 0) {
        setOver(true);
        overRef.current = true;
        return [0, 0, 0];
      } else if (m === 0 && s === 0) {
        return [h - 1, 59, 59];
      } else if (s === 0) {
        return [h, m - 1, 59];
      } else {
        return [h, m, s - 1];
      }
    });
  };

  const reset = () => {
    setTime([hours, minutes, seconds]);
    setPaused(false);
    pausedRef.current = false; //#4
    setOver(false);
    overRef.current = false; //#4
  };

  React.useEffect(() => {
    //#4 way best
    const timerID = setInterval(tick, 1000);
    console.log("hahaha"); //only onetime run
    return () => {
      console.log("dawei"); //only onetime run
      clearInterval(timerID);
    };
  }, []);

  return (
    <div>
      <p>{`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s
        .toString()
        .padStart(2, "0")}`}</p>
      <div>{over ? "Time's up!" : ""}</div>
      <button
        onClick={() => {
          setPaused(!paused);
          pausedRef.current = !paused; //#4
        }}
      >
        {paused ? "Resume" : "Pause"}
      </button>
      <button onClick={() => reset()}>Restart</button>
    </div>
  );
};

export default function CountDownMain() {
  return <CountDown seconds={10} />;
  //<CountDown hours={1} minutes={45} />,
}
//this example handles stale closure variable issue, 用到了全部三种解决stale closure var的方法
