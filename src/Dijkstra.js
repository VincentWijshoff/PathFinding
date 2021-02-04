async function doDijkstra(){
    const last = ctx.fillStyle;
    running = true;

    ctx.fillStyle = startColor;
    ctx.fillRect(startpos.y*blocksize, startpos.x*blocksize, blocksize, blocksize);
    ctx.fillStyle = finColor;
    ctx.fillRect(finpos.y*blocksize, finpos.x*blocksize, blocksize, blocksize);

    ctx.fillStyle = algoColor;

    let p = positions[0];
    
    positions[0] = new Dijkpoint(p[0], p[1], undefined, 0);

    let len = positions.length;
    Dijkfound = false;
    Dijkfinpos = undefined;
    while (len > 0 && !Dijkfound){
        await DijkmakeLine();
        len = positions.length;
        await sleep(speed / 10);
        console.log("looping");
    }
    ctx.fillStyle = startColor;
    ctx.fillRect(startpos.y*blocksize, startpos.x*blocksize, blocksize, blocksize);
    ctx.fillStyle = finColor;
    ctx.fillRect(finpos.y*blocksize, finpos.x*blocksize, blocksize, blocksize);

    if(Dijkfound && Dijkfinpos){
        await DijkmakePath();
        console.log('finnished');
    }else{
        console.log('not found');
    }

    running = false;
    ctx.fillStyle = last;
}

async function DijkmakePath(){
    const fulllength = Dijkfinpos.length;
    let val = map(Dijkfinpos.length, 0, fulllength, 0, 255);
    while(Dijkfinpos.last){
        ctx.fillStyle = 'rgb(' + val + ', 0, 255)';
        fillin({x: Dijkfinpos.y*blocksize, y: Dijkfinpos.x*blocksize});
        val = map(Dijkfinpos.length, 0, fulllength, 0, 255);
        Dijkfinpos = Dijkfinpos.last;
        await sleep(speed);
    }
}

class Dijkpoint{

    x;
    y;
    last;
    length;

    constructor(i, j, last, l){
        this.x = i;
        this.y = j;
        this.last = last;
        this.length = l;
    }
}

let Dijkfound = false;
let Dijkfinpos;

function Dijkgetneighbours(pos){
    const x = pos.x;
    const y = pos.y;
    const width = ctx.canvas.width / blocksize;
    const height = ctx.canvas.height / blocksize;
    let neighs = [];
    if (x-1 >= 0){
        neighs.push(new Dijkpoint(x-1, y, pos, pos.length + 1));
    }
    if (y-1 >= 0){
        neighs.push(new Dijkpoint(x, y-1, pos, pos.length + 1));
    }
    if (x+1 < height){
        neighs.push(new Dijkpoint(x+1, y, pos, pos.length + 1));
    }
    if (y+1 < width){
        neighs.push(new Dijkpoint(x, y+1, pos, pos.length + 1));
    }
    return neighs;
}

async function DijkmakeLine(){
    //first draw every current position
    for (let i = 0; i < positions.length; i++) {
        const pos = positions[i];
        ctx.fillRect(pos.y*blocksize, pos.x*blocksize, blocksize, blocksize);
        await sleep(speed / 10);
    }
    //then generate all neighbours from current positions
    let newpos = [];
    positions.forEach(pos => {
        let neig = Dijkgetneighbours(pos);
        neig.forEach(n => {
            if(!isIn(newpos, n) && board[n.x]
                && board[n.x][n.y] == 0){
                if(finpos.x == n.x && finpos.y == n.y){
                    Dijkfound = true;
                    Dijkfinpos = n;
                }
                board[n.x][n.y] = 1;
                newpos.push(n);
            }
        });
    });

    //replace current positons with new neighbours
    positions = newpos;
}