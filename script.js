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
let generationTime = 25;
let linesToggled = false;

let isDragging = false;
let lastMouseX = 0;
let lastMouseY = 0;

startButton.addEventListener('click', ToggleSim);
clearButton.addEventListener('click', ClearGrid);
randomButton.addEventListener('click', RandomizeGrid);
linesButton.addEventListener('click', ToggleLines);

//listener for right mouse button pressed
document.addEventListener('mousedown', (event) => {

    //check if the right mouse button was clicked
    if (event.button === 2) {
        isDragging = true;
        lastMouseX = event.clientX;
        lastMouseY = event.clientY;

        //prevent the context menu from opening
        event.preventDefault();
    }
});

//listener for mouse move
document.addEventListener('mousemove', (event) => {
    if (isDragging) {
        //calculate the change in mouse position
        const deltaX = event.clientX - lastMouseX;
        const deltaY = event.clientY - lastMouseY;

        //moove window by the change in mouse position, in opposite direction
        window.scrollBy(-deltaX, -deltaY);

        //update last mouse position
        lastMouseX = event.clientX;
        lastMouseY = event.clientY;

        //prevent the context menu from opening
        event.preventDefault();
    }
});

//listener for right mouse button released
document.addEventListener('mouseup', (event) => {
    if (event.button === 2) {
        isDragging = false;
    }
});

//listener for desactivate context menu by default
document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
});




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

    //draw grid lines if toggled
    if (linesToggled) {
        drawGridLines();
    }

}

function drawGridLines() {
    ctx1.strokeStyle = 'white';
    ctx1.lineWidth = 0.5;
    ctx1.beginPath();

    for (let x = 0; x <= GRID_WIDTH; x++) {
        ctx1.moveTo(x * CELL_SIZE, 0);
        ctx1.lineTo(x * CELL_SIZE, canvas1.height);
    }

    for (let y = 0; y <= GRID_HEIGHT; y++) {

        ctx1.moveTo(0, y * CELL_SIZE);
        ctx1.lineTo(canvas1.width, y * CELL_SIZE);
    }

    ctx1.stroke();
}

function ToggleLines() {
    console.log('lines toggled');
    linesToggled = !linesToggled;
    DrawGrid();

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
    DrawGrid();
}



















