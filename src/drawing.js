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