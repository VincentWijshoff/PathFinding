// Copyright 2021 Vincent Wijshoff

async function doDepthFirst(){
    const last = ctx.fillStyle;
    running = true;

    ctx.fillStyle = startColor;
    ctx.fillRect(startpos.y*blocksize, startpos.x*blocksize, blocksize, blocksize);
    ctx.fillStyle = finColor;
    ctx.fillRect(finpos.y*blocksize, finpos.x*blocksize, blocksize, blocksize);

    ctx.fillStyle = algoColor;

    let p = positions[0];
    
    positions[0] = new DFpoint(p[0], p[1], undefined, 0);

    let len = positions.length;
    DFfound = false;
    DFfinpos = undefined;
    while (len > 0 && !DFfound){
        DFmakeLine();
        len = positions.length;
        await sleep(speed);
        console.log("looping");
    }
    ctx.fillStyle = startColor;
    ctx.fillRect(startpos.y*blocksize, startpos.x*blocksize, blocksize, blocksize);
    ctx.fillStyle = finColor;
    ctx.fillRect(finpos.y*blocksize, finpos.x*blocksize, blocksize, blocksize);

    if(DFfound && DFfinpos){
        await DFmakePath();
        console.log('finnished');
    }else{
        console.log('not found');
    }

    running = false;
    ctx.fillStyle = last;
}

function map(val, min1, max1, min2, max2){
    return (val - min1) * (max2 - min2) / (max1 - min1) + min2;
}

async function DFmakePath(){
    const fulllength = DFfinpos.length;
    let val = map(DFfinpos.length, 0, fulllength, 0, 255);
    while(DFfinpos.last){
        ctx.fillStyle = 'rgb(' + val + ', 0, 255)';
        fillin({x: DFfinpos.y*blocksize, y: DFfinpos.x*blocksize});
        val = map(DFfinpos.length, 0, fulllength, 0, 255);
        DFfinpos = DFfinpos.last;
        await sleep(speed);
    }
}

class DFpoint{

    x;
    y;
    last;
    length;

    constructor(i, j, last, length){
        this.x = i;
        this.y = j;
        this.last = last;
        this.length = length;
    }
}

let DFfound = false;
let DFfinpos;

function DFgetneighbours(pos){
    const x = pos.x;
    const y = pos.y;
    const width = ctx.canvas.width / blocksize;
    const height = ctx.canvas.height / blocksize;
    let neighs = [];
    if (x-1 >= 0){
        neighs.push(new DFpoint(x-1, y, pos, pos.length+1));
    }
    if (y-1 >= 0){
        neighs.push(new DFpoint(x, y-1, pos, pos.length+1));
    }
    if (x+1 < height){
        neighs.push(new DFpoint(x+1, y, pos, pos.length+1));
    }
    if (y+1 < width){
        neighs.push(new DFpoint(x, y+1, pos, pos.length+1));
    }
    return neighs;
}

function DFmakeLine(){  
    //first draw every current position
    positions.forEach(pos => {
        ctx.fillRect(pos.y*blocksize, pos.x*blocksize, blocksize, blocksize);
    });
    //then generate all neighbours from last position
    let newpos = [];
    let neig = DFgetneighbours(positions[0]);
    for (let i = 0; true; i++) {
        if(neig.length == 0){
            newpos = [positions[0].last];
            break;
        }
        i = getRandom(neig.length);
        const n = neig[i];
        if(!isIn(newpos, n) && board[n.x]
            && board[n.x][n.y] == 0){
            if(finpos.x == n.x && finpos.y == n.y){
                DFfound = true;
                DFfinpos = n;
            }
            board[n.x][n.y] = 1;
            newpos.push(n);
            break;
        } else {
            neig.splice(i, 1);
        }
    }
    //replace current positons with new neighbours
    positions = newpos;
}