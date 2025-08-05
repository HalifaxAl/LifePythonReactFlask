import React, { useEffect, useState } from 'react';
import {
  Button,
  ButtonGroup,
  Container,
  Typography,
  Box,
  Paper,
} from '@mui/material';

type GridType = number[][];

const API = 'http://127.0.0.1:5000/api/game-of-life';

function App() {
  const [grid, setGrid] = useState<GridType>([]);
  const [running, setRunning] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // Fetch grid and running state from backend
  const fetchGrid = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setGrid(data.grid);
    if (data.running !== undefined) setRunning(data.running);
  };

  // Start the game
  const handleStart = async () => {
    await fetch(`${API}/start`, { method: 'POST' });
    setRunning(true);
    setEditMode(false);
  };

  // Stop the game
  const handleStop = async () => {
    await fetch(`${API}/stop`, { method: 'POST' });
    setRunning(false);
  };

  // Advance one generation
  const handleNext = async () => {
    const res = await fetch(`${API}/next`, { method: 'POST' });
    const data = await res.json();
    setGrid(data.grid);
  };

  // Enter/exit edit mode
  const handleEdit = async () => {
    if (!editMode) {
      await handleStop();
      setEditMode(true);
    } else {
      setEditMode(false);
    }
  };

  // Toggle cell state in edit mode
  const handleCellClick = (rowIdx: number, colIdx: number) => {
    if (!editMode) return;
    const newGrid = grid.map((row, i) =>
      row.map((cell, j) => (i === rowIdx && j === colIdx ? (cell ? 0 : 1) : cell))
    );
    setGrid(newGrid);
  };

  // Save edited grid to backend (optional: can be done on edit exit or after each click)
  const saveGrid = async () => {
    await fetch(`${API}/set`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ grid }),
    });
    fetchGrid();
  };

  // Clear the grid
 const handleClear = async () => {
  const res = await fetch(`${API}/clear`, { method: 'POST' });
  const data = await res.json();
  setGrid(data.grid);
  setRunning(false);
  setEditMode(false);
};

  // Poll grid every 500ms if running
  useEffect(() => {
    fetchGrid();
    let interval: number | undefined = undefined;
    if (running && !editMode) {
      interval = window.setInterval(fetchGrid, 500);
    }
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [running, editMode]);

  // Save grid when exiting edit mode
  useEffect(() => {
    if (!editMode) {
      saveGrid();
    }
    // eslint-disable-next-line
  }, [editMode]);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Conway's Game of Life
        </Typography>
        <Box display="flex" justifyContent="center" mb={2}>
          <ButtonGroup variant="contained">
            <Button onClick={handleStart} disabled={running || editMode} color="success">
              START
            </Button>
            <Button onClick={handleStop} disabled={!running || editMode} color="error">
              STOP
            </Button>
            <Button onClick={handleNext} disabled={running || editMode}>
              Next
            </Button>
            <Button
              onClick={handleEdit}
              color={editMode ? 'primary' : 'info'}
              variant={editMode ? 'outlined' : 'contained'}
            >
              {editMode ? 'SAVE' : 'EDIT'}
            </Button>
            <Button onClick={handleClear} color="warning">
              CLEAR
            </Button>
          </ButtonGroup>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ overflowX: 'auto' }}
        >
          <table style={{ borderCollapse: 'collapse' }}>
            <tbody>
              {grid.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      onClick={() => handleCellClick(i, j)}
                      style={{
                        width: 24,
                        height: 24,
                        background: cell ? '#1976d2' : '#fff',
                        border: '1px solid #bbb',
                        cursor: editMode ? 'pointer' : 'default',
                        transition: 'background 0.2s',
                      }}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
        <Box mt={2} textAlign="center">
          <Typography variant="subtitle1">
            <strong>Status:</strong>{' '}
            {editMode
              ? 'Edit Mode'
              : running
              ? 'Running'
              : 'Stopped'}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default App;