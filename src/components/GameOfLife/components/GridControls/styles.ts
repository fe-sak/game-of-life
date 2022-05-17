import { styled } from '@mui/material/styles';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

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
