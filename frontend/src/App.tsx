import React, { useState, useEffect } from 'react';
import './App.css';

interface Cell {
    value: number;
}

function App() {
    const [grid, setGrid] = useState<number[][]>([]);

    const fetchGrid = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/game-of-life');
            const data = await response.json();
            setGrid(data.grid);
        } catch (error) {
            console.error("Failed to fetch grid:", error);
        }
    };

    const nextGeneration = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/game-of-life/next', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await response.json();
            setGrid(data.grid);
        } catch (error) {
            console.error("Failed to advance generation:", error);
        }
    };

    useEffect(() => {
        fetchGrid();
    }, []);

    useEffect(() => {
        if (grid.length > 0) {
            const interval = setInterval(nextGeneration, 500); // Update every 500ms
            return () => clearInterval(interval);
        }
    }, [grid]);

    return (
        <div className="App">
            <header className="App-header">
                <h1>Conway's Game of Life</h1>
                <div className="grid-container" style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${grid.length}, 20px)`,
                    gap: '1px'
                }}>
                    {grid.map((row, rowIndex) =>
                        row.map((cell, colIndex) => (
                            <div
                                key={`${rowIndex}-${colIndex}`}
                                className="cell"
                                style={{
                                    width: '20px',
                                    height: '20px',
                                    backgroundColor: cell === 1 ? 'cyan' : '#333',
                                    border: '1px solid #444',
                                    borderRadius: '2px'
                                }}
                            />
                        ))
                    )}
                </div>
            </header>
        </div>
    );
}

export default App;
