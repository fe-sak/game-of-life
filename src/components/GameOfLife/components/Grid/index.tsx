import produce from 'immer';
import React, { FC, useMemo, useState } from 'react';
import { GridType } from '../../../../types/Grid';
import { Cell, Container } from './styles';

interface Props {
  cols: number;
  running: boolean;
  grid: GridType;
  setGrid: React.Dispatch<React.SetStateAction<GridType>>;
}

const Grid: FC<Props> = ({ cols, grid, running, setGrid }) => {
  const [mouseButtonPressed, setMouseButtonPressed] = useState(false);

  window.addEventListener('mousedown', (event) => {
    if (event.button !== 0) return;
    setMouseButtonPressed(true);
  });
  window.addEventListener('mouseup', (event) => {
    if (event.button !== 0) return;
    setMouseButtonPressed(false);
  });

  const toggleCell = (x: number, y: number) => {
    const newGrid = produce(grid, (gridDraft) => {
      const clickedCell = grid[x][y];
      gridDraft[x][y] = clickedCell === 1 ? 0 : 1;
    });
    setGrid(newGrid);
  };

  const draw = (x: number, y: number) => {
    if (mouseButtonPressed) toggleCell(x, y);
  };

  return useMemo(
    () => (
      <Container cols={cols}>
        {grid.map((rows, x) =>
          rows.map((cell, y) => (
            <Cell
              key={`${x}-${y}`}
              cols={cols}
              alive={cell ? 1 : undefined}
              disabled={running}
              onMouseDown={(event) => {
                if (event.button === 0) toggleCell(x, y);
              }}
              onMouseEnter={() => draw(x, y)}
            />
          ))
        )}
      </Container>
    ),
    [grid, mouseButtonPressed, running]
  );
};

export default Grid;
