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

  const resetSimulationTimeout = () => {
    clearAllTimeouts(simulationTimeouts);

    if (running) {
      const timeout = 1000 / speedRef.current;
      const timeoutId = setTimeout(runSimulation, timeout);
      simulationTimeouts.current.push(timeoutId);
    }
  };

  const runSimulation = useCallback(() => {
    if (!runningRef.current) return;

    clearAllTimeouts(simulationTimeouts);
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

    const timeout = 1000 / speedRef.current;
    const timeoutId = setTimeout(runSimulation, timeout);

    simulationTimeouts.current.push(timeoutId);
  }, [speedRef.current]);

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
          resetSimulationTimeout={resetSimulationTimeout}
          setGrid={setGrid}
          runSimulation={runSimulation}
        />
        <SpeedControl
          speed={speed}
          speedRef={speedRef}
          setSpeed={setSpeed}
          running={running}
          resetSimulationTimeout={resetSimulationTimeout}
        />
      </GridContainer>
    </Container>
  );
};

export default GameOfLife;

const clearAllTimeouts = (simulationTimeout: { current: NodeJS.Timeout[] }) => {
  simulationTimeout.current.forEach((id) => clearTimeout(id));
};
