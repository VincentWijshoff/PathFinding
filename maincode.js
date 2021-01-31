let canvas;
let ctx;

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
}

function doAlgorithm(firstoption, secondoption){
    if (firstoption == "Algorithms choise") {
        alert("please choose an algorithm");   
        return;     
    } else if (secondoption == "additional options"){
        alert("please choose additional options");   
        return;
    }
    console.log("running....");
    ctx.fillStyle = 'rgb(200, 0, 0)';
    ctx.fillRect(10, 10, 50, 50);

    ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
    ctx.fillRect(30, 30, 50, 50);
}

document.getElementById("actualStartButton").onclick = () => {
    let secondoption = document.getElementById("additionaloption").textContent;
    let firstoption = document.getElementById("mainoption").textContent;
    doAlgorithm(firstoption, secondoption);    
};

setup();