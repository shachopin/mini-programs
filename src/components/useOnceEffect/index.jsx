// import React from 'react';

// const useEffectOnce = (callback, when) => {
//   const hasRunOnce = React.useRef(false);
//   React.useEffect(() => {
//     if (when && !hasRunOnce.current) { 
//       //initial render, no "mounted" message, click once, shows, click twice no more show
//       //not a good example, even without !hasRunOnce.current and hasRunOnce.current = true down below, still same behavior
//       // because when clicked is true, you setClicked(true) again, no state will change
//       callback();
//       hasRunOnce.current = true;
//     }
//   }, [when]);
// };

// const App = () => {
//   const [clicked, setClicked] = React.useState(false);
//   useEffectOnce(() => {
//     console.log('mounted');
//   }, clicked);
//   return <button onClick={() => setClicked(true)}>Click me</button>;
// };

// export default App;

//better example
import React from 'react';

const useEffectOnce = (callback, count) => {
  const hasRunOnce = React.useRef(false);
  React.useEffect(() => {
    if (count !== 0 && !hasRunOnce.current) { 
      callback(); //this better example, first render, no show message, click once shows, click more, no more show
      hasRunOnce.current = true;
    }
  }, [count]);
};

const App = () => {
  const [count, setCount] = React.useState(0);
  useEffectOnce(() => {
    console.log('mounted');
  }, count);
  return <button onClick={() => setCount(count + 1)}>Click me</button>;
};

export default App;