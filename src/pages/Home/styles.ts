import { styled } from '@mui/material/styles';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

interface CellProps {
  alive: 1 | undefined;
  disabled: boolean;
  cols: number;
}
export const Cell = styled('div')<CellProps>`
  background-color: ${({ alive }) => (alive ? 'lime' : 'black')};
  border: 1px white solid;
  aspect-ratio: 1;
  ${({ disabled }) => (disabled ? 'pointer-events: none;' : '')}
`;

export const Container = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const GridContainer = styled('div')`
  width: 80vw;
  max-width: 90vh;
  display: flex;
  flex-direction: column;
`;

export const Grid = styled('div')<{ cols: number }>`
  width: 100%;
  display: inline-grid;
  grid-template-columns: repeat(${({ cols }) => cols}, auto);
  -webkit-user-drag: none;
`;

export const GridControls = styled('div')`
  max-width: 80%;
  padding: 1%;
  display: flex;
  align-items: center;
  gap: 1%;

  svg {
    cursor: pointer;
    font-size: 4vmin;
  }
`;

export const ButtonContainer = styled('div')`
  background-color: black;
  height: fit-content;
  border-radius: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledPlayArrowIcon = styled(PlayArrowIcon)`
  color: white;

  :hover {
    color: lime;
    filter: drop-shadow(0 0 10px lime);
  }
`;

export const StyledStopIcon = styled(StopIcon)`
  color: white;

  :hover {
    color: red;
    filter: drop-shadow(0 0 10px red);
  }
`;

export const StyledShuffleIcon = styled(ShuffleIcon)`
  color: white;

  :hover {
    color: #0074ff;
    filter: drop-shadow(0 0 10px #0074ff);
  }
`;
export const StyledRestartAltIcon = styled(RestartAltIcon)`
  color: white;

  :hover {
    color: yellow;
    filter: drop-shadow(0 0 10px yellow);
  }
`;


