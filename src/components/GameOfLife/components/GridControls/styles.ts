import { styled } from '@mui/material/styles';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';

export const Container = styled('div')`
  max-width: 80%;
  padding: 1%;
  display: flex;
  align-items: center;
  gap: 1%;

  svg {
    cursor: pointer;
    font-size: 4vmin;
  }

  span {
    margin-left: 1%;
    margin-right: 10%;
    color: white;
  }
`;

export const ButtonContainer = styled('div')<{ disabled?: boolean }>`
  background-color: black;
  height: fit-content;
  border-radius: 10%;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    color: white;
  }

  ${({ disabled }) =>
    disabled
      ? `
    pointer-events: none;
    
    svg {
      color: #191919;
    }
  `
      : ''}
`;

export const StyledPlayArrowIcon = styled(PlayArrowIcon)`
  :hover {
    color: lime;
    filter: drop-shadow(0 0 10px lime);
  }
`;

export const StyledStopIcon = styled(StopIcon)`
  :hover {
    color: red;
    filter: drop-shadow(0 0 10px red);
  }
`;

export const StyledShuffleIcon = styled(ShuffleIcon)`
  :hover {
    color: #0074ff;
    filter: drop-shadow(0 0 10px #0074ff);
  }
`;

export const StyledRestartAltIcon = styled(RestartAltIcon)`
  :hover {
    color: yellow;
    filter: drop-shadow(0 0 10px yellow);
  }
`;

export const StyledSkipPreviousIcon = styled(SkipPreviousIcon)`
  :hover {
    color: #ff00fa;
    filter: drop-shadow(0 0 10px #ff00fa);
  }
`;

export const StyledSkipNextIcon = styled(SkipNextIcon)`
  :hover {
    color: #ff00fa;
    filter: drop-shadow(0 0 10px #ff00fa);
  }
`;
