async function doDepthFirst(){
    const last = ctx.fillStyle;
    running = true;

    ctx.fillStyle = 'rgb(99, 255, 234)';
    ctx.fillRect(startpos.y*blocksize, startpos.x*blocksize, blocksize, blocksize);
    ctx.fillRect(finpos.y*blocksize, finpos.x*blocksize, blocksize, blocksize);

    ctx.fillStyle = 'rgb(0, 0, 0)';

    let p = positions[0];
    
    positions[0] = new DFpoint(p[0], p[1], undefined);

    let len = positions.length;
    DFfound = false;
    DFfinpos = undefined;
    while (len > 0 && !DFfound){
        DFmakeLine();
        len = positions.length;
        await sleep(speed);
        console.log("looping");
    }
    ctx.fillStyle = 'rgb(99, 255, 234)';
    ctx.fillRect(startpos.y*blocksize, startpos.x*blocksize, blocksize, blocksize);
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

async function DFmakePath(){
    ctx.fillStyle = 'rgb(99, 255, 234)';
    while(DFfinpos.last){
        fillin({x: DFfinpos.y*blocksize, y: DFfinpos.x*blocksize});
        DFfinpos = DFfinpos.last;
        await sleep(speed);
    }
}

class DFpoint{

    x;
    y;
    last;

    constructor(i, j, last){
        this.x = i;
        this.y = j;
        this.last = last;
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
        neighs.push(new BFpoint(x-1, y, pos));
    }
    if (y-1 >= 0){
        neighs.push(new BFpoint(x, y-1, pos));
    }
    if (x+1 < height){
        neighs.push(new BFpoint(x+1, y, pos));
    }
    if (y+1 < width){
        neighs.push(new BFpoint(x, y+1, pos));
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