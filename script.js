
//cell class
class Cell{
    visited = false;
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    draw(){
        ctx.strokeRect(this.x + (cellSize * 0.35), this.y + (cellSize * 0.35), cellSize / 3, cellSize / 3);
        ctx.fillRect(this.x + (cellSize * 0.35), this.y + (cellSize * 0.35), cellSize / 3, cellSize / 3);
    }
}

// variables needed
var para = document.getElementById("process");
const canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext('2d');
//canvas width and height
const w = 500;
const h = 500;

const cellSize = Math.floor(w/ 10);
const cols = Math.floor(w / cellSize);
const rows = Math.floor(h / cellSize);
const cellCount = cols * rows;


var cells = [];
var path = [];
var tempx = 0, tempy = 0;


//setup function
function setup(){
    canvas.width = w + 1;
    canvas.height = h + 1;
    ctx.fillStyle = "white";
    ctx.strokeStyle = "white";

}


//function to draw grid
function drawGrid(){
     //to find random starting cell
    var x = Math.floor(Math.random() * 10) * cellSize;
    var y = Math.floor(Math.random() * 10) * cellSize; 
    for(let i = 0; i < cols; i++){
        var row = [];
        for(let j = 0; j < rows; j++){
            x_curr = i * cellSize;
            y_curr = j * cellSize;
            var tempCell = new Cell(x_curr, y_curr);
            if(x == x_curr && y == y_curr){
                tempCell.draw();
                tempx = i;
                tempy = j;
            }
            row.push(tempCell);
            ctx.strokeRect(x_curr, y_curr, cellSize, cellSize);
        }
        cells.push(row);
    }
    
    
    ctx.stroke();
}


//recursive function to find path
function findpath(i, j){
    if(i < 0 || i >= cols || j < 0 || j >= rows){
        return;
    }
    if(cells[i][j].visited){
        return
    }
    cells[i][j].visited = true;
    path.push(cells[i][j]);
    console.log('pushed ' + cells[i][j]);
    findpath(i - 1, j);
    if(path.length >= cellCount){
        return;
    }
    findpath(i, j - 1);
    if(path.length >= cellCount){
        return;
    }
    findpath(i + 1, j);
    if(path.length >= cellCount){
        return;
    }
    findpath(i, j + 1);
    if(path.length >= cellCount){
        return;
    }
    path.pop(cells[i][j]);
    console.log('popped ' + cells[i][j]);
    cells[i][j].visited = false;
    return;

}

//function to draw path on canvas
function start(){
    para.innerHTML = "processing";
    findpath(tempx, tempy);
    //para.innerHTML = "done";
    console.log(path);
    i = 1;
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.lineWidth = '4'
    ctx.moveTo(path[0].x + (cellSize * 0.5), path[0].y + (cellSize * 0.5));
    var print = setInterval(() => {
        if(i < path.length){
            ctx.lineTo(path[i].x + (cellSize * 0.5), path[i].y + (cellSize * 0.5));
            ctx.moveTo(path[i].x + (cellSize * 0.5), path[i].y + (cellSize * 0.5));
            ctx.stroke();
            i += 1;
        }else{
            print.clearInterval;
        }
        
    }, 100);
    
    ctx.closePath();
   
}

function reset(){
    para.innerHTML = "";
    cells.length = 0;
    path.length = 0;
    setup();
    ctx.clearRect(0, 0, w, h);
    drawGrid();
}

//set up canvas
setup();

// draw grid
drawGrid();

//start finding path
//start();