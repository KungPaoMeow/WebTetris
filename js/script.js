// Tetris blocks and their colors //
const SHAPES = [
    [
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ], 
    [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0]
    ],
    [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0]
    ],
    [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
    ],
    [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
    ],
    [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0]
    ],
    [
        [0, 1, 1],
        [0, 1, 1]
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
    let piece = SHAPES[ran];
    let color = COLORS[ran+1];
    let x = 3;
    let y = 0;
    return {piece, x, y, color};        // Returns an object; similar to python dictionary
}


setInterval(newGameState, 750);
function newGameState() {
    if (pieceObj == null) {
        pieceObj = genRandomPiece();
        renderPiece();
    }
    else {
        //renderGrid();
        moveDown();
    }
}


function renderPiece() {
    let piece = pieceObj.piece;
    //console.log(piece);
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
    pieceObj.y += 1;
    renderGrid();
    renderPiece();
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
}


document.addEventListener("keydown", function(e) {      // e is event instance
    console.log(e);
    switch(e.key) {
        case ("q"):
            moveDown();
            break;
        case ("ArrowDown"):
            moveDown();
            break;
    }
})

