import React, { FC } from 'react';
import { GridType } from '../../../../types/Grid';
import {
  buildDeadGrid,
  buildRandomGrid,
} from '../../../../utils/gridFunctions';
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
  setGrid: React.Dispatch<React.SetStateAction<GridType>>;
  runSimulation: () => void;
  resetTimeout: () => void;
  clearTimeouts: () => void;
}

const GridControls: FC<Props> = ({
  rows,
  cols,
  running,
  setRunning,
  runningRef,
  setGrid,
  runSimulation,
  resetTimeout,
  clearTimeouts,
}) => {
  const randomGrid = () => {
    if (running) resetTimeout();
    else clearTimeout();

    setGrid(buildRandomGrid(rows, cols));
  };

  const clearGrid = () => {
    setRunning(false);
    setGrid(buildDeadGrid(rows, cols));
    clearTimeouts();
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
