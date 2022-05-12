import { GridType } from '../types/Grid';
import neighboursPositions from './neighboursPositions';

export const buildDeadGrid = (rows: number, cols: number): GridType =>
  Array.from({ length: rows }).map(() => Array.from({ length: cols }, () => 0));

export const buildRandomGrid = (rows: number, cols: number): GridType => {
  const rateOfLife = 0.7;
  return Array.from({ length: rows }).map(() =>
    Array.from({ length: cols }, () => (Math.random() > rateOfLife ? 1 : 0))
  );
};

export const countLiveNeighbours = (
  grid: GridType,
  x: number,
  y: number,
  rows: number,
  cols: number
) =>
  neighboursPositions.reduce((acc, [i, j]) => {
    const neighbourX = (x + i + rows) % rows;
    const neighbourY = (y + j + cols) % cols;

    const neighbour = grid[neighbourX][neighbourY];

    if (neighbour) acc += 1;

    return acc;
  }, 0);
