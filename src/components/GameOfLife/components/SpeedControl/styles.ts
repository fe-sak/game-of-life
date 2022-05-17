import { Slider } from '@mui/material';
import { styled } from '@mui/material/styles';
import SpeedIcon from '@mui/icons-material/Speed';

export const Container = styled('div')`
  max-width: 80%;
  padding: 1%;
  display: flex;
  align-items: center;
  gap: 5%;
`;

export const StyledSlider = styled(Slider)`
  width: 50%;
  color: black;
  margin-left: 1.5%;

  .MuiSlider-thumb {
    &.Mui-focusVisible,
    &:hover {
      box-shadow: 0 0 0 7px rgba(0, 0, 0, 0.16);
    }
    &.Mui-active {
      box-shadow: 0 0 0 10px rgba(0, 0, 0, 0.16);
    }
  }
`;

export const StyledSpeedIcon = styled(SpeedIcon)`
  color: black;
  margin-bottom: 20px;
`;
