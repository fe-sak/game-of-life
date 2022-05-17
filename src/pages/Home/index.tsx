import React, { FC, useCallback, useRef, useState } from 'react';
import produce from 'immer';
import {
  buildDeadGrid,
  buildRandomGrid,
  countLiveNeighbours,
} from '../../utils/gridFunctions';
import {
  Container,
  StyledPlayArrowIcon,
  GridControls,
  GridContainer,
  StyledStopIcon,
  StyledShuffleIcon,
  StyledRestartAltIcon,
  ButtonContainer,
} from './styles';
import Grid from '../../components/Grid';
import SpeedControl from '../../components/SpeedControl';

const rows = 20;
const cols = 30;

const Home: FC = () => {
  const [grid, setGrid] = useState(() => buildDeadGrid(rows, cols));

  const simulationTimeout: { current: NodeJS.Timeout[] } = useRef([]);
  const clearAllTimeouts = () => {
    simulationTimeout.current.forEach((id) => clearTimeout(id));
  };

  const [running, setRunning] = useState(false);
  const runningRef = useRef(running);
  runningRef.current = running;

  const [speed, setSpeed] = useState(1);
  const speedRef = useRef(speed);
  speedRef.current = speed;

  const resetSimulationTimeout = () => {
    clearAllTimeouts();

    if (running) {
      const timeout = 1000 / speedRef.current;
      setTimeout(runSimulation, timeout);
    }
  };

  const randomGrid = () => {
    resetSimulationTimeout();
    setGrid(buildRandomGrid(rows, cols));
  };

  const clearGrid = () => {
    setRunning(false);
    setGrid(buildDeadGrid(rows, cols));
    resetSimulationTimeout();
  };

  const toggleRunning = () => {
    runningRef.current = !running;
    setRunning((running) => !running);

    if (!running) runSimulation();
  };

  const runSimulation = useCallback(() => {
    if (!runningRef.current) return;

    clearAllTimeouts();
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

    simulationTimeout.current.push(timeoutId);
  }, [speedRef.current]);

  return (
    <Container>
      <GridContainer>
        <Grid cols={cols} running={running} grid={grid} setGrid={setGrid} />
        <GridControls>
          <ButtonContainer onClick={toggleRunning}>
            {running ? <StyledStopIcon /> : <StyledPlayArrowIcon />}
          </ButtonContainer>

          <ButtonContainer onClick={clearGrid}>
            <StyledRestartAltIcon />
          </ButtonContainer>

          <ButtonContainer onClick={randomGrid}>
            <StyledShuffleIcon />
          </ButtonContainer>
        </GridControls>

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

export default Home;
