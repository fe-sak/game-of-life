import React, { FC } from 'react';
import { GridType } from '../../../../types/Grid';
import { buildDeadGrid, buildRandomGrid } from '../../../../utils/gridFunctions';
import {
  ButtonContainer,
  Container,
  StyledPlayArrowIcon,
  StyledRestartAltIcon,
  StyledShuffleIcon,
  StyledStopIcon,
} from './styles';

interface Props {
  rows: number;
  cols: number;
  running: boolean;
  setRunning: React.Dispatch<React.SetStateAction<boolean>>;
  runningRef: React.MutableRefObject<boolean>;
  resetSimulationTimeout: () => void;
  setGrid: React.Dispatch<React.SetStateAction<GridType>>;
  runSimulation: () => void;
}

const GridControls: FC<Props> = ({
  rows,
  cols,
  running,
  setRunning,
  runningRef,
  resetSimulationTimeout,
  setGrid,
  runSimulation,
}) => {
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
  
  return (
    <Container>
      <ButtonContainer onClick={toggleRunning}>
        {running ? <StyledStopIcon /> : <StyledPlayArrowIcon />}
      </ButtonContainer>

      <ButtonContainer onClick={clearGrid}>
        <StyledRestartAltIcon />
      </ButtonContainer>

      <ButtonContainer onClick={randomGrid}>
        <StyledShuffleIcon />
      </ButtonContainer>
    </Container>
  );
};

export default GridControls;
