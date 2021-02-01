let canvas;
let ctx;
let width;
let height;

let drawing = false;

const blocksize = 10;
let brushsize = 10;

let board = [];
let positions = [];

function setup() {
    console.log("setup the code");
    canvas = document.getElementById('window');
    if (canvas.getContext) {
        ctx = canvas.getContext('2d');
        ctx.canvas.width  = window.innerWidth - 15;
        ctx.canvas.height = window.innerHeight - 100;
      } else {
        alert("The drawing canvas is not suported by the javascript code");
      }
    clearboard();
    setFillstyle();
    drawgridlines();
}

function drawgridlines(){
    const curcol = ctx.fillStyle;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    for (let i = 0; i < width*blocksize; i+=blocksize) {
        ctx.fillRect(i, 0, 1, height*blocksize);        
    }
    for (let i = 0; i < height*blocksize; i+=blocksize) {
        ctx.fillRect(0, i, width*blocksize, 1);        
    }
    ctx.fillStyle = curcol;
}

function setFillstyle(){
    ctx.fillStyle = getRGB();
}

function getRGB(){
    let r = getRandom(255).toString();
    let g = getRandom(255).toString();
    let b = getRandom(255).toString();
    let picker = getRandom(6);
    if (picker == 0){
        r = 0;
        g = 255
    } else if (picker == 1){
        r = 0
        b = 255;
    } else if (picker == 2){
        g = 0
        r = 255;
    } else if (picker == 3){
        g = 0
        b = 255;
    } else if (picker == 4){
        b = 0
        r = 255;
    } else if (picker == 5){
        b = 0
        g = 255;
    }
    let log = 'rgb(' + r +', ' + g + ', ' + b + ')';
    return log;
}

async function startdraw(e){
    drawing = true;
    console.log("start draw");
}

async function stopdraw(e){
    drawing = false;
    console.log("stop draw");
}

async function draw(e){
    if(drawing){
        let pos = getMousePos(e);
        fillin(pos);
        //drawgridlines();
    }
}

function getMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
}

function fillin(pos){
    let i = Math.floor( pos.x / blocksize );
    let j = Math.floor( pos.y / blocksize );
    ctx.fillRect(i*blocksize, j*blocksize, brushsize, brushsize);
}

function clearboard(){
    width = Math.floor( ctx.canvas.width / blocksize );
    height = Math.floor( ctx.canvas.height / blocksize );
    board = [];
    board = Array(height).fill([]);
    for (let i = 0; i < height; i++) {
        board[i] = Array(width).fill(0);        
    }
    positions = [];
    const i = getRandom(height);
    const j = getRandom(width);
    board[i][j] = 1;
    positions.push([i, j]);
}

function getRandom(upperbound){
    return Math.floor(Math.random() * upperbound);
}

function doAlgorithm(){
    console.log("running....");
    setFillstyle();
}

document.getElementById("actualStartButton").onclick = () => {
    doAlgorithm();    
};

document.getElementById("upbrush").onclick = () => {
    brushsize += 10;    
};

document.getElementById("downbrush").onclick = () => {
    brushsize -= 10;    
};

document.getElementById("gridlines").onclick = () => {
    drawgridlines();    
};

document.getElementById("reset").onclick = () => {
    setup();    
};

setup();