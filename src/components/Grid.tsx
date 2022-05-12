import React, { FC, useCallback, useRef, useState } from 'react';
import produce from 'immer';
import styled from 'styled-components';
import Cell from './Cell';
import {
  buildDeadGrid,
  buildRandomGrid,
  countLiveNeighbours,
} from '../utils/gridFunctions';

const rows = 50;
const cols = 50;
const speed = 1;

const Container = styled.div`
  display: inline-grid;
  grid-template-columns: repeat(${cols}, auto);
  -webkit-user-drag: none;
`;

const Grid: FC = () => {
  const [grid, setGrid] = useState(() => buildDeadGrid(rows, cols));

  const [running, setRunning] = useState(false);
  const runningRef = useRef(running);
  runningRef.current = running;

  const [mouseButtonPressed, setMouseButtonPressed] = useState(false);
  window.addEventListener('mousedown', (event) => {
    if (event.button !== 0) return;
    setMouseButtonPressed(true);
  });
  window.addEventListener('mouseup', (event) => {
    if (event.button !== 0) return;
    setMouseButtonPressed(false);
  });

  const toggleCell = (x: number, y: number) => {
    const newGrid = produce(grid, (gridDraft) => {
      const clickedCell = grid[x][y];
      gridDraft[x][y] = clickedCell === 1 ? 0 : 1;
    });
    setGrid(newGrid);
  };

  const draw = (x: number, y: number) => {
    if (mouseButtonPressed) toggleCell(x, y);
  };

  const randomGrid = () => {
    setGrid(buildRandomGrid(rows, cols));
  };

  const clearGrid = () => {
    setRunning(false);
    setGrid(buildDeadGrid(rows, cols));
  };

  const toggleRunning = () => {
    runningRef.current = !running;
    setRunning((running) => !running);

    if (!running) runSimulation();
  };

  const runSimulation = useCallback(() => {
    if (!runningRef.current) return;

    setGrid((currentGrid) => {
      const newGrid = produce(currentGrid, (gridDraft) => {
        for (let x = 0; x < rows; x++) {
          for (let y = 0; y < cols; y++) {
            const currentCell = currentGrid[x][y];
            const liveNeighbours = countLiveNeighbours(
              currentGrid,
              x,
              y,
              rows,
              cols
            );

            if (currentCell && (liveNeighbours < 2 || liveNeighbours > 3))
              gridDraft[x][y] = 0;

            if (!currentCell && liveNeighbours === 3) gridDraft[x][y] = 1;
          }
        }
      });
      return newGrid;
    });

    setTimeout(runSimulation, 1000 / speed);
  }, []);

  return (
    <div>
      <button onClick={toggleRunning}>{running ? 'Stop' : 'Run'}</button>

      <button onClick={randomGrid}>Randomize</button>

      <button onClick={clearGrid}>Clear</button>
      <Container>
        {grid.map((rows, x) =>
          rows.map((cell, y) => (
            <Cell
              key={`${x}-${y}`}
              alive={cell ? true : false}
              disabled={running}
              onMouseDown={(event) => {
                if (event.button === 0) toggleCell(x, y);
              }}
              onMouseEnter={() => draw(x, y)}
            />
          ))
        )}
      </Container>
    </div>
  );
};

export default Grid;
