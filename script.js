const canvas1 = document.getElementById("canvas1");
const width = canvas1.width;
const height = canvas1.height;
const ctx1 = canvas1.getContext("2d");

let cellSize = 10;
let rows = height / cellSize; // number of rows
let cols = width / cellSize; // number of columns
let grid = new Array(rows);
let nextGrid = new Array(rows);

function DrawGrid() {

    ctx1.beginPath();
    ctx1.strokeStyle = "lightgray";

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

canvas1.addEventListener('click', (event) => {
    const rect = canvas1.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const row = Math.floor(y / cellSize);
    const col = Math.floor(x / cellSize);
    console.log(`Clicked on grid cell[${grid[row][col].x}, ${grid[row][col].y}]`);

    grid[row][col].value = 1; // toggle the value

    // Redraw only the updated cell
    if (grid[row][col].value === 1) {
        ctx1.fillStyle = 'white'; // color for cells with value 1
    }
    ctx1.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);

    CheckAliveCells();
});

//assign an array of length = rows to each element of grid array. 
// Now grid is a 2D array with x and y coordinates (y = rows, x = cols)
function InitGrid() {
    for (let i = 0; i < rows; i++) {
        grid[i] = new Array(cols);
        nextGrid[i] = new Array(cols);
        for (let j = 0; j < cols; j++) {
            grid[i][j] = { x: j, y: i, value: 0 };
            nextGrid[i][j] = { x: j, y: i, value: 0 };
        }
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


function CheckAliveCells() {
    grid.forEach((row, rowIndex) => {
        row.forEach((cell, columnIndex) => {
            if (cell.value === 1) {
                // do something with the cell
                console.log(`Cell at row ${rowIndex}, column ${columnIndex} has value 1`);
            }
        });
    });
}

function InitGame() {
    DrawGrid();
    InitGrid();
}

window.onload = InitGame;












