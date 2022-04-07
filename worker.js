
//cell class
class Cell{
    visited = false;
    right = false;
    up = false;
    left = false;
    down = false;
    constructor(x, y, i, j){
        this.x = x;
        this.y = y;
        this.i_ = i;
        this.j_ = j;
    }
    draw(){
        ctx.strokeRect(this.x + (cellSize * 0.35), this.y + (cellSize * 0.35), cellSize / 3, cellSize / 3);
        ctx.fillRect(this.x + (cellSize * 0.35), this.y + (cellSize * 0.35), cellSize / 3, cellSize / 3);
    }
    clear(){
        ctx.clearRect(this.x, this.y, cellSize, cellSize);
    }
}


// variables needed
var para = document.getElementById("process");
const canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext('2d');


//canvas width and height
const w = 500;
const h = 500;

const cellSize = Math.floor(w/ 20);
const cols = Math.floor(w / cellSize);
const rows = Math.floor(h / cellSize);
const cellCount = cols * rows;


var cells = [];
var path = [];
var tempx = 0, tempy = 0;






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
            var tempCell = new Cell(x_curr, y_curr, i, j);
            if(x == x_curr && y == y_curr){
                tempCell.draw();
                tempx = i;
                tempy = j;
            }
            row.push(tempCell);
        }
        cells.push(row);
    }
}

//setup function
function setup(){
    canvas.width = w + 1;
    canvas.height = h + 1;
    ctx.fillStyle = "white";
    ctx.strokeStyle = "white";
    if (typeof(Worker) !== "undefined") {
        // Yes! Web worker support!
        // Some code.....
        console.log('In worker');
      } else {
        // Sorry! No Web Worker support..
        console.log('worker not supported');
      } 

}



//function to draw path on canvas
function start(){
    ctx.strokeStyle = 'red';
    ctx.lineWidth = '4'
    para.innerHTML = "processing";
    var i = tempx, j = tempy;
    var index = 0;
    path.push(cells[i][j]);
   // pre_indices.push([-1, -1]);
    var process = setInterval(() => {
        if(path.length >= cellCount){
            para.innerHTML = "done";
            clearInterval(process);
        }
        i = path[path.length - 1].i_;
        j = path[path.length - 1].j_;
            cells[i][j].visited = true;
            ctx.beginPath();
            ctx.moveTo(cells[i][j].x + (cellSize * 0.5), cells[i][j].y + (cellSize * 0.5));
            if(!cells[i][j].down && j < cols - 1 && !cells[i][j + 1].visited){
                cells[i][j].down = true;
                path.push(cells[i][j + 1]);
                ctx.lineTo(cells[i][j + 1].x + (cellSize * 0.5), cells[i][j + 1].y + (cellSize * 0.5));
            }else if(!cells[i][j].left && i > 0 && !cells[i - 1][j].visited){
                cells[i][j].left = true;
                path.push(cells[i - 1][j]);
                ctx.lineTo(cells[i - 1][j].x + (cellSize * 0.5), cells[i - 1][j].y + (cellSize * 0.5));
            }else if(!cells[i][j].up && j > 0 && !cells[i][j - 1].visited){
                cells[i][j].up = true;
                path.push(cells[i][j - 1]);
                ctx.lineTo(cells[i][j - 1].x + (cellSize * 0.5), cells[i][j - 1].y + (cellSize * 0.5));
            }else if(!cells[i][j].right && i < rows - 1 && !cells[i + 1][j].visited){
                cells[i][j].right = true;
                path.push(cells[i + 1][j]);
                ctx.lineTo(cells[i + 1][j].x + (cellSize * 0.5), cells[i + 1][j].y + (cellSize * 0.5));
            }else{
                path.pop();
                cells[i][j].visited = false;
                cells[i][j].up = false;
                cells[i][j].down = false;
                cells[i][j].left = false;
                cells[i][j].right  = false;
                cells[i][j].clear();
            }
            ctx.closePath();
            ctx.stroke();
       

    }, 100);
    
    
    
   
}

function reset(){
    para.innerHTML = "";
    cells.length = 0;
    path.length = 0;
    count = 0;
    setup();
    ctx.clearRect(0, 0, w, h);
    drawGrid();
}

setup();

// draw grid
drawGrid();