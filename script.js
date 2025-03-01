const canvas1 = document.getElementById("canvas1");
const canvas2 = document.getElementById("canvas2");
const width = canvas1.width;
const height = canvas1.height;
const ctx1 = canvas1.getContext("2d");
const ctx2 = canvas2.getContext("2d");
var cellSize = 10;




DrawGrid();

function DrawGrid() {

    ctx1.beginPath();
    ctx2.beginPath();
    ctx1.strokeStyle = "black";
    ctx2.strokeStyle = "black";

    for (var i = 0; i <= height; i += cellSize) {
        ctx1.moveTo(0, i);
        ctx2.moveTo(0, i);
        ctx1.lineTo(width, i);
        ctx2.lineTo(width, i);
    }

    for (var j = 0; j <= width; j += cellSize) {
        ctx1.moveTo(j, 0);
        ctx2.moveTo(j, 0);
        ctx1.lineTo(j, height);
        ctx2.lineTo(j, height);
    }

    ctx1.stroke();
    ctx2.stroke();
}

function DrawCells() {

}




