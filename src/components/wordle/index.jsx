// import React, {useState, useEffect} from 'react';
// import "./style.css";

// const WORD_LIST_API_URL = 'https://api.frontendexpert.io/api/fe/wordle-words';
// const NUM_OF_GUESSES = 6;
// const WORD_LENGTH = 5;

// export default function Wordle() {
//   // Write your code here.
//   const [solution, setSolution] = useState(null);
//   const [guess, setGuess] = useState('');
//   const [guesses, setGuesses] = useState([...Array(NUM_OF_GUESSES)]);
//   const [currentRow, setCurrentRow] = useState(0);

  
//   useEffect(() => {
//     async function fetchSolution() {
//       const res = await fetch(WORD_LIST_API_URL);
//       const solutions = await res.json(); // you always forget await
//       const solution = solutions[Math.floor(Math.random() * solutions.length)].toLowerCase();
//       setSolution(solution);
//       //cors issue from this api, but you know to use the chrome extension to byPass it
//       //setSolution('happy');
//     }
    
//     fetchSolution();
//   }, []);

//   useEffect(() => {
//     //if (solution == null) return; what this is for?
//     function onKeyDown(e) {
//       if (guesses[NUM_OF_GUESSES - 1] != null || guesses.includes(solution)) {
//         return;
//       }
//       // can do the following as well, now that currentRow is in the dependency array
//       // if (currentRow >= NUM_OF_GUESSES || guesses.includes(solution)) {
//       //   return;
//       // }
//       const charCode = e.key.charCodeAt(0)
     
//       const isLetter = e.key.length === 1 && charCode >= 'a'.charCodeAt(0) && charCode <= 'z'.charCodeAt(0);
//       setGuess(prevGuess => {
//         if (e.key === "Backspace") {
//           return prevGuess.slice(0, -1);
//         } else if (prevGuess.length === WORD_LENGTH && e.key === "Enter") {
//           const guessesClone = [...guesses];
//           guessesClone[currentRow] = prevGuess;
//           //because you reference currentRow here, you must put it in dependency array, otherwise won't update
//           setGuesses(guessesClone)
//           setCurrentRow(prevRow => prevRow + 1);
//           return '';
//         } else if (prevGuess.length < WORD_LENGTH && isLetter) {
//           return prevGuess + e.key;
//         }
//         return prevGuess;
//       });
//     }
    
//     window.addEventListener('keydown', onKeyDown);
//     return () => {
//       window.removeEventListener('keydown', onKeyDown);
//     }
//   }, [guesses, currentRow])
  

//   if (solution == null) return null;

//   return (
//     <div className="board">
//       {
//         guesses.map((item, i) => {
//           return (
//             <GuessLine key={i} guess={(i === currentRow ? guess : item || '').padEnd(WORD_LENGTH)} solution={solution} isFinal={currentRow > i}/>
//           );
//         })
//       }
//     </div>
//   );
// }

// function GuessLine({guess, solution, isFinal}) {
//   return (
//     <div className="line">
//       {
//         guess.split('').map((char, i) => {
//           let className = 'tile';
  
//           if (isFinal) {
//             if (char === solution[i]) {
//               className += ' correct';
//             } else if (solution.includes(char)) {
//               className += ' close';
//             } else {
//               className += ' incorrect';
//             }
//           }
          
//           return <div key={i} className={className}>{char}</div>
//         })
//       }
//     </div>
//   );
// }

import React, {useState, useEffect} from 'react';
import "./style.css"

const WORD_LIST_API_URL = 'https://api.frontendexpert.io/api/fe/wordle-words';
const NUM_OF_GUESSES = 6;
const WORD_LENGTH = 5;

export default function Wordle() {
  // Write your code here.
  const [solution, setSolution] = useState(null);
  const [guess, setGuess] = useState('');
  const [guesses, setGuesses] = useState([...Array(NUM_OF_GUESSES)]);
  const [currentRow, setCurrentRow] = useState(0);

  
  useEffect(() => {
    async function fetchSolution() {
      const res = await fetch(WORD_LIST_API_URL);
      const solutions = await res.json();
      const solution = solutions[Math.floor(Math.random() * solutions.length)].toLowerCase();
      setSolution(solution);
    }
    
    fetchSolution();
  }, []);

  useEffect(() => {
    //if (solution == null) return;
    function onKeyDown(e) {
      if (currentRow >= NUM_OF_GUESSES || guesses.includes(solution)) {
        return;
      }
      const charCode = e.key.charCodeAt(0)
     
      const isLetter = e.key.length === 1 && charCode >= 'a'.charCodeAt(0) && charCode <= 'z'.charCodeAt(0);
      setGuess(prevGuess => {
        if (e.key === "Backspace") {
          return prevGuess.slice(0, -1);
        } else if (prevGuess.length === WORD_LENGTH && e.key === "Enter") {
          const guessesClone = [...guesses];
          guessesClone[currentRow] = prevGuess;
          setGuesses(guessesClone)
          //setCurrentRow(prevRow => prevRow + 1);
          setCurrentRow(currentRow + 1);
          return '';
        } else if (prevGuess.length < WORD_LENGTH && isLetter) {
          return prevGuess + e.key;
        }
        return prevGuess;
      });
    }
    
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    }
  }, [guesses, currentRow])
  

  if (solution == null) return null;

  return (
    <div className="board">
      {
        guesses.map((item, i) => {
          return (
            <GuessLine key={i} guess={(i === currentRow ? guess : item || '').padEnd(WORD_LENGTH)} solution={solution} isFinal={currentRow > i}/>
          );
        })
      }
    </div>
  );
}

function GuessLine({guess, solution, isFinal}) {
  return (
    <div className="line">
      {
        guess.split('').map((char, i) => {
          let className = 'tile';
          
          if (isFinal) {
            if (char === solution[i]) {
              className += ' correct';
            } else if (solution.includes(char)) {
              className += ' close';
            } else {
              className += ' incorrect';
            }
          }
          
          return <div key={i} className={className}>{char}</div>
        })
      }
    </div>
  );
}