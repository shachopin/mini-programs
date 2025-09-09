import React, {useState, useEffect} from 'react';
import "./styles.css"

const TILE_COLORS = ['red', 'green', 'blue', 'yellow'];

export default function Memory() {
  // Write your code here.
  const TILE_COLORS = ['red', 'green', 'blue', 'yellow'];
  const [board, setBoard] = useState(() => {
    return shuffle([...TILE_COLORS, ...TILE_COLORS])
  })
  const [selectedTiles, setSelectedTiles] = useState([])
  const [matchedTiles, setMatchedTiles] = useState([])

  const selectTile = (i) => {
    if (selectedTiles.length >= 2 || selectedTiles.includes(i) || matchedTiles.includes(i)) return;
    setSelectedTiles([...selectedTiles, i]);
  }

  useEffect(() => {
    if (selectedTiles.length < 2) return;
    if (board[selectedTiles[0]] === board[selectedTiles[1]]) {
      setMatchedTiles([...matchedTiles, ...selectedTiles]);
      setSelectedTiles([])
      console.log('haha')
    } else {
      let timeID = setTimeout(() => setSelectedTiles([]), 1000);
      return () => { clearTimeout(timeID);console.log('hhahaah')}; //hahaha shows once, because onces setSelectedTIles([]), dependeny array changes and run cleanUp function once
    }
  }, [selectedTiles]); //only select two colors triggere it, no other way to change dependency array, therefore different from debounce react way


  const restartGame = () => {
    setBoard(shuffle([...TILE_COLORS, ...TILE_COLORS]));
    setSelectedTiles([]);
    setMatchedTiles([]);
  }

  const didPlayerWin = matchedTiles.length === board.length;

  return (
    <>
      <h1>{didPlayerWin ? 'You Win!' : 'Memory'}</h1>
      <div className="board">
        {
          board.map((color, i) => {
            const isTurnedOver = selectedTiles.includes(i) || matchedTiles.includes(i);
            const className = isTurnedOver ? `tile ${color}` : `tile`;
            return <div key={i} className={className} onClick={() => selectTile(i)}/>;
          })
        }
      </div>
      {didPlayerWin && <button onClick={restartGame}>Restart</button>}
    </>
  );
}

/**
 * Returns the array shuffled into a random order.
 * Do not edit this function.
 */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    // Swap the elements at i and randomIndex
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}