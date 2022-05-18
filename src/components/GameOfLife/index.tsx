import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import produce from 'immer';
import { buildDeadGrid, countLiveNeighbours } from '../../utils/gridFunctions';
import { Container } from './styles';
import Grid from './components/Grid';
import SpeedControl from './components/SpeedControl';
import GridControls from './components/GridControls';
import { GridType } from '../../types/Grid';

const rows = 20;
const cols = 30;

const GameOfLife: FC = () => {
  const [grid, setGrid] = useState(() => buildDeadGrid(rows, cols));
  const generations = useRef<GridType[]>([]);
  const [currentGeneration, setCurrentGeneration] = useState(0);

  const [running, setRunning] = useState(false);
  const runningRef = useRef(running);
  runningRef.current = running;

  const [speed, setSpeed] = useState(1);
  const speedRef = useRef(speed);
  speedRef.current = speed;

  const pushGridToGenerations = () => {
    if (running && currentGeneration >= generations.current.length)
      generations.current.push(grid);
  };
  useEffect(pushGridToGenerations, [currentGeneration]);

  const clearGenerations = () => {
    generations.current.length = 0;
    setCurrentGeneration(0);
  };

  const toggleRunning = () => {
    runningRef.current = !running;
    setRunning((running) => !running);

    if (!running) runSimulation();

    if (!running && generations.current.length === 0)
      generations.current.push(grid);
  };

  const simulationTimeouts: { current: NodeJS.Timeout[] } = useRef([]);

  const clearTimeouts = () => {
    simulationTimeouts.current.forEach((id) => clearTimeout(id));
  };

  function newTimeout() {
    const timeout = 1000 / speedRef.current;
    const timeoutId = setTimeout(runSimulation, timeout);
    simulationTimeouts.current.push(timeoutId);
  }

  const resetTimeout = () => {
    clearTimeouts();

    newTimeout();
  };

  const runSimulation = useCallback(() => {
    if (!runningRef.current) return;

    clearTimeouts();

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

    setCurrentGeneration((currentValue) => currentValue + 1);

    newTimeout();
  }, [speedRef.current]);

  return (
    <Container>
      <Grid
        cols={cols}
        running={running}
        grid={grid}
        setGrid={setGrid}
        clearGenerations={clearGenerations}
      />

      <GridControls
        rows={rows}
        cols={cols}
        running={running}
        setRunning={setRunning}
        setGrid={setGrid}
        toggleRunning={toggleRunning}
        resetTimeout={resetTimeout}
        clearTimeouts={clearTimeouts}
        currentGeneration={currentGeneration}
        setCurrentGeneration={setCurrentGeneration}
        generations={generations}
      />
      <SpeedControl
        running={running}
        speed={speed}
        speedRef={speedRef}
        setSpeed={setSpeed}
        resetTimeout={resetTimeout}
      />
    </Container>
  );
};

export default GameOfLife;
