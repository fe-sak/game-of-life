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
  StyledSlider,
  SpeedControl,
  StyledSpeedIcon,
} from './styles';
import ReactTooltip from 'react-tooltip';
import Grid from '../../components/Grid';

const rows = 20;
const cols = 30;

const Home: FC = () => {
  const [grid, setGrid] = useState(() => buildDeadGrid(rows, cols));
  const [tooltip, showTooltip] = useState(true);

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

  const handleSpeedSlider = (_event: Event, newValue: number | number[]) => {
    if (newValue !== speed) {
      speedRef.current = newValue as number;
      setSpeed(newValue as number);
    }
    if (running) resetSimulationTimeout();
  };

  const marks = [
    { value: 1, label: '1x' },
    { value: 5, label: '5x' },
    { value: 10, label: '10x' },
  ];

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

        <SpeedControl>
          <StyledSlider
            onChange={handleSpeedSlider}
            value={speed}
            marks={marks}
            step={1}
            min={1}
            max={10}
          />
          <div>
            <StyledSpeedIcon
              data-tip='Adjust speed of simulation'
              onMouseEnter={() => showTooltip(true)}
              onMouseLeave={() => {
                showTooltip(false);
                setTimeout(() => showTooltip(true), 50);
              }}
            />
            {tooltip && <ReactTooltip effect='solid' />}
          </div>
        </SpeedControl>
      </GridContainer>
    </Container>
  );
};

export default Home;
