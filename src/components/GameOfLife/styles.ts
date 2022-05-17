import { styled } from '@mui/material/styles';

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
