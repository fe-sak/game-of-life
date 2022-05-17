import { styled } from '@mui/material/styles';

export const Container = styled('div')<{ cols: number }>`
  width: 100%;
  display: inline-grid;
  grid-template-columns: repeat(${({ cols }) => cols}, auto);
  -webkit-user-drag: none;
`;

interface CellProps {
  alive: 1 | undefined;
  disabled: boolean;
  cols: number;
}

export const Cell = styled('div')<CellProps>`
  background-color: ${({ alive }) => (alive ? 'lime' : 'black')};
  border: 1px #303436 solid;
  aspect-ratio: 1;
  ${({ disabled }) => (disabled ? 'pointer-events: none;' : '')}
`;
