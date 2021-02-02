async function floodFill(){
    const last = ctx.fillStyle;
    running = true;
    ctx.fillStyle = 'rgb(0, 0, 0)';

    let p = positions[0];
    console.log(p);
    let len = positions.length;
    while (len > 0){
        makeLine();
        len = positions.length;
        await sleep(speed);
        console.log("looping");
    }

    running = false;
    ctx.fillStyle = last;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getneighbours(pos){
    const x = pos[0];
    const y = pos[1];
    const width = ctx.canvas.width / blocksize;
    const height = ctx.canvas.height / blocksize;
    let neighs = [];
    if (x-1 >= 0){
        neighs.push([x-1, y]);
    }
    if (y-1 >= 0){
        neighs.push([x, y-1]);
    }
    if (x+1 < height){
        neighs.push([x+1, y]);
    }
    if (y+1 < width){
        neighs.push([x, y+1]);
    }
    return neighs;
}

function makeLine(){
    //first draw every current position
    positions.forEach(pos => {
        ctx.fillRect(pos[1]*blocksize, pos[0]*blocksize, blocksize, blocksize);
    });
    //then generate all neighbours from current positions
    let newpos = [];
    positions.forEach(pos => {
        let neig = getneighbours(pos);
        neig.forEach(n => {
            if(!newpos.includes(n) && board[n[0]]
                && board[n[0]][n[1]] == 0){
                board[n[0]][n[1]] = 1;
                newpos.push(n);
            }
        });
    });

    //replace current positons with new neighbours
    positions = newpos;
}