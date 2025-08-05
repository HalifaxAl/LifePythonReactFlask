// App.js
import React, { useEffect, useState } from 'react';

function App() {
  const [grid, setGrid] = useState([]);
  const [running, setRunning] = useState(false);

  // Fetch grid and running state from backend
  const fetchGrid = async () => {
    const res = await fetch('http://127.0.0.1:5000/api/game-of-life');
    const data = await res.json();
    setGrid(data.grid);
    if (data.running !== undefined) setRunning(data.running);
  };

  // Start the game
  const handleStart = async () => {
    await fetch('http://127.0.0.1:5000/api/game-of-life/start', { method: 'POST' });
    setRunning(true);
  };

  // Stop the game
  const handleStop = async () => {
    await fetch('http://127.0.0.1:5000/api/game-of-life/stop', { method: 'POST' });
    setRunning(false);
  };

  // Advance one generation (optional)
  const handleNext = async () => {
    const res = await fetch('http://127.0.0.1:5000/api/game-of-life/next', { method: 'POST' });
    const data = await res.json();
    setGrid(data.grid);
  };

  // Poll grid every 500ms if running
  useEffect(() => {
    fetchGrid();
    let interval = null;
    if (running) {
      interval = setInterval(fetchGrid, 500);
    }
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [running]);

  return (
    <div>
      <h1>Game of Life</h1>
      <div>
        <button onClick={handleStart} disabled={running}>START</button>
        <button onClick={handleStop} disabled={!running}>STOP</button>
        <button onClick={handleNext} disabled={running}>Next</button>
      </div>
      <div style={{ marginTop: 20 }}>
        <table>
          <tbody>
            {grid.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td
                    key={j}
                    style={{
                      width: 20,
                      height: 20,
                      background: cell ? 'black' : 'white',
                      border: '1px solid #ccc'
                    }}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 10 }}>
        <strong>Status:</strong> {running ? "Running" : "Stopped"}
      </div>
    </div>
  );
}

export default App;