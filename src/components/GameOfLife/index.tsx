import React, { FC, useCallback, useRef, useState } from 'react';
import produce from 'immer';
import { buildDeadGrid, countLiveNeighbours } from '../../utils/gridFunctions';
import { Container, GridContainer } from './styles';
import Grid from './components/Grid';
import SpeedControl from './components/SpeedControl';
import GridControls from './components/GridControls';

const rows = 20;
const cols = 30;

const GameOfLife: FC = () => {
  const [grid, setGrid] = useState(() => buildDeadGrid(rows, cols));

  const [running, setRunning] = useState(false);
  const runningRef = useRef(running);
  runningRef.current = running;

  const [speed, setSpeed] = useState(1);
  const speedRef = useRef(speed);
  speedRef.current = speed;

  const simulationTimeouts: { current: NodeJS.Timeout[] } = useRef([]);

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

    newTimeout();
  }, [speedRef.current]);

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

  return (
    <Container>
      <GridContainer>
        <Grid cols={cols} running={running} grid={grid} setGrid={setGrid} />

        <GridControls
          rows={rows}
          cols={cols}
          running={running}
          setRunning={setRunning}
          runningRef={runningRef}
          setGrid={setGrid}
          runSimulation={runSimulation}
          resetTimeout={resetTimeout}
          clearTimeouts={clearTimeouts}
        />
        <SpeedControl
          running={running}
          speed={speed}
          speedRef={speedRef}
          setSpeed={setSpeed}
          resetTimeout={resetTimeout}
        />
      </GridContainer>
    </Container>
  );
};

export default GameOfLife;
