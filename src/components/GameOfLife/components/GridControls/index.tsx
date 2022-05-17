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
  setGrid: React.Dispatch<React.SetStateAction<GridType>>;
  resetTimeout: () => void;
  clearTimeouts: () => void;
  currentGeneration: number;
  setCurrentGeneration: React.Dispatch<React.SetStateAction<number>>;
  generations: React.MutableRefObject<GridType[]>;
  toggleRunning: () => void;
}

const GridControls: FC<Props> = ({
  rows,
  cols,
  running,
  setRunning,
  setGrid,
  resetTimeout,
  clearTimeouts,
  currentGeneration,
  setCurrentGeneration,
  generations,
  toggleRunning,
}) => {
  const clearGrid = () => {
    setRunning(false);
    setGrid(buildDeadGrid(rows, cols));
    clearTimeouts();
    setCurrentGeneration(0);
    generations.current.length = 0;
  };

  const randomGrid = () => {
    if (running) resetTimeout();
    else clearTimeout();

    setGrid(buildRandomGrid(rows, cols));
    setCurrentGeneration(0);
    generations.current.length = 0;
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
      <span>Generations: {currentGeneration}</span>
    </Container>
  );
};

export default GridControls;
