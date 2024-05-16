// Tetris blocks and their colors //
const PIECES = [
    [
        [1, 1, 1, 1],    // aqua
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ], 
    [
        [1, 0, 0],
        [1, 1, 1],   // dark blue
        [0, 0, 0]
    ],
    [
        [0, 0, 1],
        [1, 1, 1],   // orange thing
        [0, 0, 0]
    ],
    [
        [1, 1, 0],
        [0, 1, 1],   // red
        [0, 0, 0]
    ],
    [
        [0, 1, 1],
        [1, 1, 0],   // lime
        [0, 0, 0]
    ],
    [
        [0, 1, 0],
        [1, 1, 1],   // pink
        [0, 0, 0]
    ],
    [
        [0, 1, 1],
        [0, 1, 1]   // yellow
    ]
];

const COLORS = [
    "#323232",     // Board color rgb(50,50,50) 
    "#60dbe8",  // aqua
    "#222ed4",  // dark blue
    "#e8b235",  // orange
    "#e62a15",  // red
    "#27d91a",  // lime
    "#d91abf",  // pink
    "#efdf48"   // yellow
]


// Tetris board //
const COLS = 10; 
const ROWS = 20; 
const BLOCK_SIZE = 35;      // Size of blocks


// Drawing //
let canvas = document.getElementById('board');      // Drawing board
let ctx = canvas.getContext('2d');      // Drawing pen
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

let pieceObj = null;
let grid = generateGrid();


function genRandomPiece() {
    let ran = Math.floor(Math.random()*7);
    let piece = PIECES[ran];
    let shape = piece;
    let color = COLORS[ran+1];
    let x = 3;
    let y = 0;

    // Returns an object; similar to python dictionary; coords are of the top left
    // Piece is the piece definition in PIECES, and shape takes into account piece rotation
    return {piece, shape, x, y, color};        
}

setInterval(newGameState, 750);
function newGameState() {
    checkForLines();
    if (pieceObj == null) {
        pieceObj = genRandomPiece();
        renderPiece();
    }
    else {
        moveDown();
    }
}

function checkForLines() {
    // Remove each full grid line and shift down
    for (let i = 0; i < grid.length; i++) {
        let line = true;
        for (let j = 0; j < grid[i].length; j++) {
            line = line && grid[i][j];
        }
        if (line) {
            grid.splice(i, 1);
            grid.unshift([0,0,0,0,0,0,0,0,0,0]);

            // Update counters
            let linesCounter = document.getElementById('lines');
            let newLines = parseInt(linesCounter.textContent) + 1;
            linesCounter.textContent = newLines;
        }
    }
}

function generateGrid() {
    let grid = [];
    for (let i = 0; i < ROWS; i++) {
        grid.push([]);
        for (let j = 0; j < COLS; j++) {
            grid[i].push(0);
        }
    }
    return grid;
}

function renderGrid() {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            ctx.fillStyle = COLORS[grid[i][j]];
            ctx.fillRect(j, i, 1, 1);
        }
    }
    renderPiece();
}

function renderPiece() {
    let piece = pieceObj.shape;
    for (let i=0; i < piece.length; i++) {      // Row 
        for (let j=0; j < piece[i].length; j++) {       // Column
            ctx.fillStyle = pieceObj.color;     // Show color
            if (piece[i][j] == 1) {
                ctx.fillRect(pieceObj.x+j, pieceObj.y+i, 1, 1);
            }
        }
    }
}


function moveDown() {
    if (!collision(pieceObj.x, pieceObj.y + 1)) {
        pieceObj.y += 1;
    }
    else {
        // If there a collision going down, add the color to the grid so that it does not get cleared (so that can drop new piece)
        for (let i = 0; i < pieceObj.piece.length; i++) {
            for (let j = 0; j < pieceObj.piece[i].length; j++) {
                if (pieceObj.shape[i][j] == 1) {
                    // Calculate a pixels' position in grid
                    let p = pieceObj.x + j;
                    let q = pieceObj.y + i;
                    grid[q][p] = COLORS.indexOf(pieceObj.color);
                }
            }
        }

        // Loss
        if (pieceObj.y <= 0) {
            alert("Game Over");
            grid = generateGrid();
        }

        // This will trigger a new piece to fall
        pieceObj = null;
        newGameState();
    }
    renderGrid();
}

function moveLeft() {
    if (!collision(pieceObj.x - 1, pieceObj.y)) {
        pieceObj.x -= 1;
    }
    renderGrid();
}

function moveRight() {
    if (!collision(pieceObj.x + 1, pieceObj.y)) {
        pieceObj.x += 1;
    }
    renderGrid();
}

function collision(x, y, rotated) {
    let piece = rotated || pieceObj.shape;  // Set to rotated if exists
    for (let i=0; i < piece.length; i++) {
        for (let j=0; j < piece[i].length; j++) {
            if (piece[i][j] == 1) {     // Presence of piece is represented by 1
                let p = x + j;
                let q = y + i;

                if (!(p >= 0 && p < COLS && q >= 0 && q < ROWS)) {     // Outside the grid
                    return true;
                }

                if (grid[q][p] != 0) {     // Collides with a set piece
                    return true;
                }
            }
        }
    }
    return false;
}

function transpose(matrix) {
    let transposed = [];
    for (let i = 0; i < matrix[0].length; i++) {
        transposed.push([]);
    }

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            transposed[j].push(matrix[i][j]);
        }
    }
    return transposed;
}

function rotatePiece() {
    // Transpose then reverse rows to rotate a matrix 90 degrees clockwise
    let rotated = [];

    // Transpose
    for (let i = 0; i < pieceObj.shape[0].length; i++) {
        rotated.push([]);
    }
    for (let i = 0; i < pieceObj.shape.length; i++) {
        for (let j = 0; j < pieceObj.shape[i].length; j++) {
            rotated[j].push(pieceObj.shape[i][j]);
        }
    }

    // Reverse rows
    for (let i = 0; i < rotated.length; i++) {
        rotated[i] = rotated[i].reverse();
    }

    if (!collision(pieceObj.x, pieceObj.y, rotated)) {
        pieceObj.shape = rotated;
        renderGrid();
    }
}

document.addEventListener("keydown", function(e) {      // e is event instance
    // console.log(e);
    switch(e.key) {
        case("ArrowDown"):
            moveDown();
            break;
        case("ArrowLeft"):
            moveLeft();
            break;
        case("ArrowRight"):
            moveRight();
            break;
        case("ArrowUp"):
            rotatePiece();
            break;
    }
})

