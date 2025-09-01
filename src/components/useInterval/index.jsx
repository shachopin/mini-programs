import React, { useEffect, useRef } from "react";

const useInterval = (callback, delay) => {
  const savedCallback = React.useRef();
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  React.useEffect(() => {
    const tick = () => {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => {
        console.log("remove interval")
        clearInterval(id);
      }
    }
  }, []);
  
  // const savedCallback = React.useRef(callback);
  // React.useEffect(() => {
  //   let id = setInterval(savedCallback.current, delay);
  //   return () => clearInterval(id);
  // }, []);  //not working
  
  // const savedCallback = React.useRef(callback);
  // React.useEffect(() => {
  //   function tick() {
  //     savedCallback.current();
  //   }
  //   let id = setInterval(tick, delay);
  //   return () => clearInterval(id);
  // }, []); //not working
};

const Timer = props => {
  const [seconds, setSeconds] = React.useState(0);
  useInterval(() => {
    setSeconds(seconds + 1);
  }, 1000);
  return <p>{seconds}</p>;
};

export default Timer;

// const useTimeout = (callback, delay) => {
//   const savedCallback = React.useRef();
//   React.useEffect(() => {
//     savedCallback.current = callback;
//   }, [callback]);
//   React.useEffect(() => {
//     const tick = () => {
//       savedCallback.current();
//     }
//     if (delay !== null) {
//       let id = setTimeout(tick, delay);
//       return () => clearTimeout(id);
//     }
//   }, [delay]);
// };
// const OneSecondTimer = props => {
//   const [seconds, setSeconds] = React.useState(0);
//   useTimeout(() => {
//     setSeconds(seconds + 1);
//   }, 1000);
//   return <p>{seconds}</p>;
// };

// export default OneSecondTimer