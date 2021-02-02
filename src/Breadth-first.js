async function doBreadthFirst(){
    const last = ctx.fillStyle;
    running = true;

    ctx.fillStyle = 'rgb(99, 255, 234)';
    ctx.fillRect(startpos.y*blocksize, startpos.x*blocksize, blocksize, blocksize);
    ctx.fillRect(finpos.y*blocksize, finpos.x*blocksize, blocksize, blocksize);

    ctx.fillStyle = 'rgb(0, 0, 0)';

    let p = positions[0];
    
    positions[0] = new BFpoint(p[0], p[1], undefined);

    let len = positions.length;
    BFfound = false;
    BFfinpos = undefined;
    while (len > 0 && !BFfound){
        makeLine();
        len = positions.length;
        await sleep(speed);
        console.log("looping");
    }
    ctx.fillStyle = 'rgb(99, 255, 234)';
    ctx.fillRect(startpos.y*blocksize, startpos.x*blocksize, blocksize, blocksize);
    ctx.fillRect(finpos.y*blocksize, finpos.x*blocksize, blocksize, blocksize);

    if(BFfound && BFfinpos){
        await makePath();
        console.log('finnished');
    }else{
        console.log('not found');
    }

    running = false;
    ctx.fillStyle = last;
}

async function makePath(){
    ctx.fillStyle = 'rgb(99, 255, 234)';
    while(BFfinpos.last){
        fillin({x: BFfinpos.y*blocksize, y: BFfinpos.x*blocksize});
        BFfinpos = BFfinpos.last;
        await sleep(speed);
    }
}

class BFpoint{

    x;
    y;
    last;

    constructor(i, j, last){
        this.x = i;
        this.y = j;
        this.last = last;
    }
}

let BFfound = false;
let BFfinpos;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getneighbours(pos){
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

function isIn(list, pos){
    for (let i = 0; i < list.length; i++) {
        const p = list[i];
        if(p.x == pos.x && p.y == pos.y){
            return true;
        }
    }
    return false;
}

function makeLine(){
    //first draw every current position
    positions.forEach(pos => {
        ctx.fillRect(pos.y*blocksize, pos.x*blocksize, blocksize, blocksize);
    });
    //then generate all neighbours from current positions
    let newpos = [];
    positions.forEach(pos => {
        let neig = getneighbours(pos);
        neig.forEach(n => {
            if(!isIn(newpos, n) && board[n.x]
                && board[n.x][n.y] == 0){
                if(finpos.x == n.x && finpos.y == n.y){
                    BFfound = true;
                    BFfinpos = n;
                }
                board[n.x][n.y] = 1;
                newpos.push(n);
            }
        });
    });

    //replace current positons with new neighbours
    positions = newpos;
}