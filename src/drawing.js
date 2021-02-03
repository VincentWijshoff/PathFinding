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
        if(drawingstart){
            drawingstart = false;
            const tmp = ctx.fillStyle;
            ctx.fillStyle = 'rgba(255, 255, 255)';
            fillin({x: startpos.y*blocksize, y: startpos.x*blocksize});
            board[startpos.x][startpos.y] = 0;
            ctx.fillStyle = 'rgba(0, 0, 0)';
            let pos = getMousePos(e);
            startpos = {x: Math.floor( pos.y / blocksize ), y: Math.floor( pos.x / blocksize )};
            fillin(pos);
            //drawgridlines();
            positions[0] = [startpos.x, startpos.y];
            ctx.fillStyle = tmp;
            return;
        }
        if(drawingfin){
            drawingfin = false;
            const tmp = ctx.fillStyle;
            ctx.fillStyle = 'rgba(255, 255, 255)';
            fillin({x: finpos.y*blocksize, y: finpos.x*blocksize});
            board[finpos.x][finpos.y] = 0;
            ctx.fillStyle = 'rgba(0, 0, 0)';
            let pos = getMousePos(e);
            finpos = {y: Math.floor( pos.x / blocksize ), x: Math.floor( pos.y / blocksize )};
            ctx.fillRect(finpos.y*blocksize, finpos.x*blocksize, brushsize, brushsize);
            //drawgridlines();
            ctx.fillStyle = tmp;
            return;
        }
        let pos = getMousePos(e);
        if((Math.floor( pos.y / blocksize ) != startpos.x || Math.floor( pos.x / blocksize ) != startpos.y) && 
            (Math.floor( pos.y / blocksize ) != finpos.x || Math.floor( pos.x / blocksize ) != finpos.y)){
            fillin(pos);
        }
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
    board[j][i] = 1;
}