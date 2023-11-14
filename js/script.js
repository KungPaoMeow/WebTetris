import { moveDown, moveLeft, moveRight, rotatePiece } from "./controls.js";
import { BLOCK_SIZE } from "./constants.js";
import { renderPiece, genRandomPiece } from "./piece.js";

// Drawing //
let canvas = document.getElementById("board"); // Drawing board
export let ctx = canvas.getContext("2d"); // Drawing pen
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

export let pieceObj = null;

setInterval(newGameState, 750);
function newGameState() {
  if (pieceObj == null) {
    pieceObj = genRandomPiece();
    renderPiece();
  } else {
    moveDown(pieceObj);
  }
}

//Controls
document.addEventListener("keydown", function (e) {
  // e is event instance
  switch (e.key) {
    case "ArrowDown":
      if (pieceObj.y !== 18) {
        moveDown(pieceObj);
        break;
      }
    case "ArrowLeft":
      moveLeft(pieceObj);
      break;
    case "ArrowRight":
      moveRight(pieceObj);
      break;
    case "ArrowUp":
      rotatePiece(pieceObj);
      break;
  }
});
