let canvas;
let ctx;
let width;
let height;

let drawing = false;

const blocksize = 10;
let brushsize = 10;

let running = false;
let speed = 50;

let board = [];
let positions = [];

let startpos = [];
let finpos = [];

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
    startpos = {x: i, y: j};
    finpos = {x: getRandom(height), y: getRandom(width)};
    positions.push([i, j]);
    const last = ctx.fillStyle;
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillRect(startpos.y*blocksize, startpos.x*blocksize, blocksize, blocksize);
    ctx.fillRect(finpos.y*blocksize, finpos.x*blocksize, blocksize, blocksize);
    ctx.fillStyle = last;
}

function getRandom(upperbound){
    return Math.floor(Math.random() * upperbound);
}

document.getElementById("switch-color").onclick = () => {
    console.log("Switching color");
    setFillstyle();    
};

document.getElementById("actualStartButton2").onclick = () => {
    if(!running){
        let option = document.getElementById("additionaloption").textContent;
        console.log('running algorithm: ' + option);
        switch (option) {
            case 'Breadth first':
                doBreadthFirst();
                break;
            case 'Depth first':
                doDepthFirst();
                break;
            case 'Dijkstra':
                doDijkstra();
                break;
            case 'A-star':
                doAstar();
                break;
            default:
                alert('please choose a valid algorithm');
                break;
        }
    }
};

document.getElementById("reset").onclick = () => {
    setup();    
};

setup();