import { pieceObj } from "./script.js";
import { ctx } from "./script.js";
import { SHAPES, COLORS } from "./constants.js";

export function genRandomPiece() {
  let ran = Math.floor(Math.random() * 7);
  let piece = SHAPES[ran];
  let shape = piece;
  let color = COLORS[ran + 1];
  let x = 3;
  let y = 0;
  if (ran == 0) {
    y = -1;
  }
  return { piece, shape, x, y, color }; // Returns an object; similar to python dictionary
}

export function renderPiece() {
  let piece = pieceObj.shape;
  for (let i = 0; i < piece.length; i++) {
    // Row
    for (let j = 0; j < piece[i].length; j++) {
      // Column
      ctx.fillStyle = pieceObj.color; // Show color
      if (piece[i][j] == 1) {
        ctx.fillRect(pieceObj.x + j, pieceObj.y + i, 1, 1);
      }
    }
  }
}
