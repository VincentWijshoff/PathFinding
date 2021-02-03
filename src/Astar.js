async function doAstar(){
    const last = ctx.fillStyle;
    running = true;

    ctx.fillStyle = 'rgb(99, 255, 234)';
    ctx.fillRect(startpos.y*blocksize, startpos.x*blocksize, blocksize, blocksize);
    ctx.fillRect(finpos.y*blocksize, finpos.x*blocksize, blocksize, blocksize);

    ctx.fillStyle = 'rgb(0, 0, 0)';

    let p = positions[0];
    
    positions[0] = new Starpoint(p[0], p[1], undefined, 0);

    let len = positions.length;
    Starfound = false;
    Starfinpos = undefined;
    while (len > 0 && !Starfound){
        StarmakeLine();
        len = positions.length;
        await sleep(speed);
        console.log("looping");
    }
    ctx.fillStyle = 'rgb(99, 255, 234)';
    ctx.fillRect(startpos.y*blocksize, startpos.x*blocksize, blocksize, blocksize);
    ctx.fillRect(finpos.y*blocksize, finpos.x*blocksize, blocksize, blocksize);

    if(Starfound && Starfinpos){
        await StarmakePath();
        console.log('finnished');
    }else{
        console.log('not found');
    }

    running = false;
    ctx.fillStyle = last;
}

let Starfound = false;
let Starfinpos;

class Starpoint{

    x;
    y;
    last;
    length;
    val;

    constructor(i, j, last, l){
        this.x = i;
        this.y = j;
        this.last = last;
        this.length = l;
        this.val = Math.sqrt( (this.x - finpos.x) ** 2 + (this.y - finpos.y) ** 2 ) + this.length;
    }
}

async function StarmakePath(){
    const fulllength = Starfinpos.length;
    let val = map(Starfinpos.length, 0, fulllength, 0, 255);
    while(Starfinpos.last){
        ctx.fillStyle = 'rgb(' + val + ', 0, 255)';
        fillin({x: Starfinpos.y*blocksize, y: Starfinpos.x*blocksize});
        val = map(Starfinpos.length, 0, fulllength, 0, 255);
        Starfinpos = Starfinpos.last;
        await sleep(speed);
    }
}

function Stargetneighbours(pos){
    const x = pos.x;
    const y = pos.y;
    const width = ctx.canvas.width / blocksize;
    const height = ctx.canvas.height / blocksize;
    let neighs = [];
    if (x-1 >= 0){
        neighs.push(new Starpoint(x-1, y, pos, pos.length + 1));
    }
    if (y-1 >= 0){
        neighs.push(new Starpoint(x, y-1, pos, pos.length + 1));
    }
    if (x+1 < height){
        neighs.push(new Starpoint(x+1, y, pos, pos.length + 1));
    }
    if (y+1 < width){
        neighs.push(new Starpoint(x, y+1, pos, pos.length + 1));
    }
    return neighs;
}

function insert(pos){
    let found = false;
    for (let i = 0; i < positions.length && !found; i++) {
        const e = positions[i];
        if(e.val > pos.val){
            found = true
            positions.splice(i, 0, pos);
        }
    }
    if(!found){
        positions.push(pos);
    }
}

function isInStar(list, pos){
    for (let i = 0; i < list.length; i++) {
        const p = list[i];
        if(p.x == pos.x && p.y == pos.y){
            if(pos.val < p.val){
                list.splice(i, 1);
                insert(pos);
                return false;
            }
            return true;
        }
    }
    return false;
}

function StarmakeLine(){
    //first draw every current position
    // positions.forEach(pos => {
    //     ctx.fillRect(pos.y*blocksize, pos.x*blocksize, blocksize, blocksize);
    // });
    //then generate all neighbours from current positions
    let pos = positions.shift();
    ctx.fillRect(pos.y*blocksize, pos.x*blocksize, blocksize, blocksize);
    let neig = Stargetneighbours(pos);
    neig.forEach(n => {
        if(!isInStar(positions, n) && board[n.x]
            && board[n.x][n.y] == 0){
            if(finpos.x == n.x && finpos.y == n.y){
                Starfound = true;
                Starfinpos = n;
            }
            board[n.x][n.y] = 1;
            insert(n, positions);
        }
    });
}