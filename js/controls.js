import { pieceObj } from "./script.js";
import { renderGrid } from "./grid.js";
import { renderPiece } from "./piece.js";
import { SHAPES } from "./constants.js";

export function moveDown() {
  pieceObj.y += 1;
  renderGrid();
  renderPiece();
}

export function moveLeft() {
  pieceObj.x -= 1;
  renderGrid();
  renderPiece();
}

export function moveRight() {
  pieceObj.x += 1;
  renderGrid();
  renderPiece();
}

export function rotatePiece() {
  switch (pieceObj.piece) {
    case SHAPES[0]: // long piece, 4x4
      switch (pieceObj.shape) {
        case SHAPES[0]:
          pieceObj.shape = [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
          ];
          renderGrid();
          renderPiece();
          break;
        default:
          pieceObj.shape = SHAPES[0];
          renderGrid();
          renderPiece();
          break;
      }
      break;
    case SHAPES[6]: // square, do nothing
      break;
    default: // all 3x3 shapes, rotate 90 degrees clockwise around center
      let currTop = [...pieceObj.shape[0]]; // shallow copy, this is fine

      for (let i = 0; i < 3; i++) {
        // Left side to Top
        pieceObj.shape[0][i] = pieceObj.shape[2 - i][0];
      }
      for (let i = 0; i < 3; i++) {
        // Bottom side to Left
        pieceObj.shape[2 - i][0] = pieceObj.shape[2][2 - i];
      }
      for (let i = 0; i < 3; i++) {
        // Right side to Bottom
        pieceObj.shape[2][2 - i] = pieceObj.shape[i][2];
      }
      for (let i = 0; i < 3; i++) {
        // Top side to Right
        pieceObj.shape[i][2] = currTop[i];
      }
      break;
  }
}
