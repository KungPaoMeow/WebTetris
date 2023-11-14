import { ROWS, COLS, COLORS } from "./constants.js";
import { ctx } from "./script.js";

let grid = generateGrid();
export function generateGrid() {
  let grid = [];
  for (let i = 0; i < ROWS; i++) {
    grid.push([]);
    for (let j = 0; j < COLS; j++) {
      grid[i].push(0);
    }
  }
  return grid;
}

export function renderGrid() {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      ctx.fillStyle = COLORS[grid[i][j]];
      ctx.fillRect(j, i, 1, 1);
    }
  }
}
