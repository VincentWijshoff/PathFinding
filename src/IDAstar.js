// Copyright 2021 Vincent Wijshoff

async function doIDAstar(){
    const last = ctx.fillStyle;
    running = true;

    ctx.fillStyle = startColor;
    ctx.fillRect(startpos.y*blocksize, startpos.x*blocksize, blocksize, blocksize);
    ctx.fillStyle = finColor;
    ctx.fillRect(finpos.y*blocksize, finpos.x*blocksize, blocksize, blocksize);

    ctx.fillStyle = algoColor;

    let p = positions[0];
    
    positions[0] = new IDApoint(p[0], p[1], undefined, 0);

    let len = positions.length;
    IDAfound = false;
    IDAfinpos = undefined;
    while (len > 0 && !IDAfound){
        IDAmakeLine();
        len = positions.length;
        await sleep(speed);
        console.log("looping");
    }
    ctx.fillStyle = startColor;
    ctx.fillRect(startpos.y*blocksize, startpos.x*blocksize, blocksize, blocksize);
    ctx.fillStyle = finColor;
    ctx.fillRect(finpos.y*blocksize, finpos.x*blocksize, blocksize, blocksize);

    if(IDAfound && IDAfinpos){
        await IDAmakePath();
        console.log('finnished');
    }else{
        console.log('not found');
    }

    running = false;
    ctx.fillStyle = last;
}

async function IDAmakePath(){
    const fulllength = IDAfinpos.length;
    let val = map(IDAfinpos.length, 0, fulllength, 0, 255);
    while(IDAfinpos.last){
        ctx.fillStyle = 'rgb(' + val + ', 0, 255)';
        fillin({x: IDAfinpos.y*blocksize, y: IDAfinpos.x*blocksize});
        val = map(IDAfinpos.length, 0, fulllength, 0, 255);
        IDAfinpos = IDAfinpos.last;
        await sleep(speed);
    }
}

class IDApoint{

    x;
    y;
    last;
    length;
    val;

    constructor(i, j, last, length){
        this.x = i;
        this.y = j;
        this.last = last;
        this.length = length;
        this.val = Math.sqrt( (this.x - finpos.x) ** 2 + (this.y - finpos.y) ** 2 ) + this.length - this.getnegval();
    }

    getnegval(){
        let sum = 0;
        negpos.forEach(p => {
            sum += Math.sqrt( (this.x - p.x) ** 2 + (this.y - p.y) ** 2 )
        });
        return sum;
    }
}

let IDAfound = false;
let IDAfinpos;

function IDAgetneighbours(pos){
    const x = pos.x;
    const y = pos.y;
    const width = ctx.canvas.width / blocksize;
    const height = ctx.canvas.height / blocksize;
    let neighs = [];
    if (x-1 >= 0){
        neighs.push(new IDApoint(x-1, y, pos, pos.length+1));
    }
    if (y-1 >= 0){
        neighs.push(new IDApoint(x, y-1, pos, pos.length+1));
    }
    if (x+1 < height){
        neighs.push(new IDApoint(x+1, y, pos, pos.length+1));
    }
    if (y+1 < width){
        neighs.push(new IDApoint(x, y+1, pos, pos.length+1));
    }
    return neighs;
}

function IDAgetbest(list){
    let bestval = Infinity;
    let besti = -1;
    for (let i = 0; i < list.length; i++) {
        const e = list[i];
        if(e.val < bestval){
            bestval = e.val;
            besti = i;
        }
    }
    return besti;
}

function findPrev(x, y, pos){
    if(!pos){
        return undefined;
    }
    if(pos.x == x && pos.y == y){
        return pos;
    }
    return findPrev(x, y, pos.last);
}

function IDAmakeLine(){  
    //first draw every current position
    positions.forEach(pos => {
        ctx.fillRect(pos.y*blocksize, pos.x*blocksize, blocksize, blocksize);
    });
    //then generate all neighbours from last position
    let neig = IDAgetneighbours(positions[0]);
    if(neig.length == 0){
        positions = [positions[0].last];
        return;
    }

    //get the neighbour with the best heuristic value
    let bestneig = undefined;
    let bestval = Infinity;
    neig.forEach(n => {
        if(board[n.x]
            && board[n.x][n.y] == 0){
            if(n.val < bestval){
                bestval = n.val;
                bestneig = n;
            }
        }
    });
    if(!bestneig){
        positions = [positions[0].last];
        return;
    }
    board[bestneig.x][bestneig.y] = 1;

    //now reset the prev for the current possition
    neig.forEach(n => {
        if(board[n.x]
            && board[n.x][n.y] == 1){
            let prevpos = findPrev(n.x, n.y, positions[0])
            if(prevpos){
                let prevlen = prevpos.length;
                if(prevlen < positions[0].length - 1){
                    positions[0].last = prevpos;
                    bestneig.last = positions[0];
                }
            }
        }
    });

    //if the new best position is the finpos, stop looping
    if(finpos.x == bestneig.x && finpos.y == bestneig.y){
        IDAfound = true;
        IDAfinpos = bestneig;
    }

    //now continue with the best found position
    positions = [bestneig];

    // for (let i = 0; true; i++) {
    //     if(neig.length == 0){
    //         newpos = [positions[0].last];
    //         break;
    //     }
    //     i = IDAgetbest(neig);
    //     const n = neig[i];
    //     if(board[n.x]
    //         && board[n.x][n.y] == 0){
    //         if(finpos.x == n.x && finpos.y == n.y){
    //             IDAfound = true;
    //             IDAfinpos = n;
    //         }
    //         board[n.x][n.y] = 1;
    //         insert(n, newpos);
    //         break;
    //     } else {
    //         neig.splice(i, 1);
    //     }
    // }
    // //replace current positons with new neighbours
    // positions = newpos;
}