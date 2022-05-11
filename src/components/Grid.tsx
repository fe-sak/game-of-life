import produce from 'immer';
import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { buildGrid } from '../utils/buildGrid';
import Cell from './Cell';

const rows = 30;

const Container = styled.div`
  display: inline-grid;
  grid-template-columns: repeat(${rows}, auto);
`;

const Grid: FC = () => {
  console.count('render: ');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [grid, setGrid] = useState(() => buildGrid(rows));

  const updateGrid = (x: number, y: number) => {
    const newGrid = produce(grid, (gridDraft) => {
      const clickedCell = gridDraft[x][y];
      clickedCell.alive = !clickedCell.alive;
    });
    setGrid(newGrid);
  };

  return (
    <Container>
      {grid.map((rows, x) =>
        rows.map((cell, y) => (
          <Cell
            key={`${x}-${y}`}
            alive={cell.alive}
            onClick={() => updateGrid(x, y)}
          />
        ))
      )}
    </Container>
  );
};

export default Grid;
