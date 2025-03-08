const canvas1 = document.getElementById("canvas1");
const ctx1 = canvas1.getContext("2d");
const startButton = document.getElementById('Start');
const clearButton = document.getElementById('Clear');
const randomButton = document.getElementById('Random');
const linesButton = document.getElementById('ToggleLines');

const CELL_SIZE = 10;
const GRID_WIDTH = canvas1.width / CELL_SIZE;
const GRID_HEIGHT = canvas1.height / CELL_SIZE;

let grid = CreateEmptyGrid();
let nextGrid = CreateEmptyGrid();
let isRunning = false;
let timer;
let generationTime = 100;

startButton.addEventListener('click', ToggleSim);
clearButton.addEventListener('click', ClearGrid);
randomButton.addEventListener('click', RandomizeGrid);
linesButton.addEventListener('click', ToggleLines);

function CreateEmptyGrid() {
    const grid = new Array(GRID_WIDTH);
    for (let x = 0; x < GRID_WIDTH; x++) {
        grid[x] = new Array(GRID_HEIGHT).fill(0);
    }
    return grid;
}

function DrawGrid() {
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);

    // draw allive cells
    ctx1.fillStyle = 'white';
    for (let x = 0; x < GRID_WIDTH; x++) {
        for (let y = 0; y < GRID_HEIGHT; y++) {
            if (grid[x][y] === 1) {
                ctx1.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            }
        }
    }

}

function ToggleLines() {
    ctx1.strokStyle = 'white';
    ctx1.lineWidth = 0.5;
    ctx1.beginPath();
    for (let x = 0; x <= GRID_WIDTH; x++) {
        ctx1.moveTo(x, 0);
        ctx1.lineTo(x, canvas1.height);
    }
    for (let y = 0; y <= GRID_HEIGHT; y++) {
        ctx1.moveTo(0, y);
        ctx1.lineTo(canvas1.width, y);
    }
    ctx1.stroke();
    console.log('lines toggled');

}

function ClearGrid() {
    grid = CreateEmptyGrid();
    DrawGrid();
}

function RandomizeGrid() {
    for (let x = 0; x < GRID_WIDTH; x++) {
        for (let y = 0; y < GRID_HEIGHT; y++) {
            grid[x][y] = Math.random() > 0.9 ? 1 : 0;
        }
    }
    DrawGrid();
}

canvas1.addEventListener('click', (event) => {
    const rect = canvas1.getBoundingClientRect();
    const scaleX = canvas1.width / rect.width;
    const scaleY = canvas1.height / rect.height;

    const x = Math.floor((event.clientX - rect.left) * scaleX / CELL_SIZE);
    const y = Math.floor((event.clientY - rect.top) * scaleY / CELL_SIZE);
    console.log(`Clicked on grid cell[${x}, ${y}]`);

    if (x >= 0 && x < GRID_WIDTH && y >= 0 && y < GRID_HEIGHT) {
        //swap cell state
        grid[x][y] = grid[x][y] === 0 ? 1 : 0;
        DrawGrid();
    }
});

function ToggleSim() {
    isRunning = !isRunning;
    startButton.textContent = isRunning ? 'Stop' : 'Start';

    if (isRunning) {
        RunSim();
    }
    else {
        clearTimeout(timer);
    }
}

function RunSim() {
    NextGen();
    DrawGrid();

    if (isRunning) {
        timer = setTimeout(RunSim, generationTime);
    }
}

function NextGen() {

    nextGrid = CreateEmptyGrid();

    for (let x = 0; x < GRID_WIDTH; x++) {
        for (let y = 0; y < GRID_HEIGHT; y++) {
            const neighbors = CountAliveNeighbors(x, y);
            //game of life rules
            //if targeted cell is alive
            if (grid[x][y] === 1) {
                //an alive cell with 2 or 3 alive neighbors stay alive
                if (neighbors === 2 || neighbors === 3) {
                    nextGrid[x][y] = 1;
                }
            } else {
                //a dead cell with 3 alive neighbors becomes alive
                if (neighbors === 3) {
                    nextGrid[x][y] = 1;
                }
            }

        }
    }
    //swap grids
    const temp = grid;
    grid = nextGrid;
    nextGrid = temp;

}

function CountAliveNeighbors(x, y) {
    let count = 0;

    //check 8 neighbors of the given cell
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            //don't chech the targeted cell
            if (i === 0 && j === 0) continue;

            const neighborX = (x + i + GRID_WIDTH) % GRID_WIDTH;
            const neighborY = (y + j + GRID_HEIGHT) % GRID_HEIGHT;

            count += grid[neighborX][neighborY];
        }
    }

    return count;
}

window.onload = () => {
    ToggleLines();
    DrawGrid();
}



















