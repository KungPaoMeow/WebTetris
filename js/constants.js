// Tetris blocks and their colors //
export const SHAPES = [
  [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
  [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
  [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  [
    [0, 1, 1],
    [0, 1, 1],
  ],
];

export const COLORS = [
  "#323232", // Board color rgb(50,50,50)
  "#60dbe8", // aqua
  "#222ed4", // dark blue
  "#e8b235", // orange
  "#e62a15", // red
  "#27d91a", // lime
  "#d91abf", // pink
  "#efdf48", // yellow
];

// Tetris board //
export const COLS = 10;
export const ROWS = 20;
export const BLOCK_SIZE = 35; // Size of blocks
