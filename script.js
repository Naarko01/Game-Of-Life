const canvas1 = document.getElementById("canvas1");
const width = canvas1.width;
const height = canvas1.height;
const ctx1 = canvas1.getContext("2d");

let cellSize = 10;
let rows = height / cellSize;
let cols = width / cellSize;
let grid = new Array(rows);
let nextGrid = new Array(rows);
let timer;

function DrawGrid() {

    ctx1.beginPath();
    ctx1.strokeStyle = "black";

    for (let i = 0; i <= height; i += cellSize) {
        ctx1.moveTo(0, i);
        ctx1.lineTo(width, i);
    }

    for (let j = 0; j <= width; j += cellSize) {
        ctx1.moveTo(j, 0);
        ctx1.lineTo(j, height);
    }
    ctx1.stroke();
}

//assign an array of length = rows to each element of grid array. 
// Now grid is a 2D array with x and y coordinates (y = rows, x = cols)
function InitGrid() {
    for (let i = 0; i < rows; i++) {
        grid[i] = new Array(cols);
        nextGrid[i] = new Array(cols);
    }
}

function ResetGrid() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j] = 0;
            nextGrid[i][j] = 0;
        }
    }
}

//pass the state of the current grid to the next grid and clear the current grid (iterate through generations)
function CopyAndResetGrid() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j] = nextGrid[i][j];
            nextGrid[i][j] = 0;
        }
    }
}

function InitGame() {
    DrawGrid();
    InitGrid();
}

window.onload = InitGame;












