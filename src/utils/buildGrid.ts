import { GridType } from '../types/Grid';

export function buildGrid(rows: number) {
  const cols = rows;

  const grid: GridType = [];

  for (let x = 0; x < rows; x++) {
    grid.push(
      Array.from({ length: cols }, (_col, y) => ({
        id: `${x}-${y}`,
        alive: false,
      }))
    );
  }

  return grid;
}
