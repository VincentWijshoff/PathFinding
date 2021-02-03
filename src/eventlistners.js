document.getElementById("startButtonOption1").onclick = () => {
    document.getElementById("additionaloption").innerHTML = document.getElementById("startButtonOption1").textContent;    
};

document.getElementById("startButtonOption2").onclick = () => {
    document.getElementById("additionaloption").innerHTML = document.getElementById("startButtonOption2").textContent;    
};

document.getElementById("startButtonOption3").onclick = () => {
    document.getElementById("additionaloption").innerHTML = document.getElementById("startButtonOption3").textContent;    
};

document.getElementById("startButtonOption4").onclick = () => {
    document.getElementById("additionaloption").innerHTML = document.getElementById("startButtonOption4").textContent;    
};

document.getElementById("fastspeed").onclick = () => {
    document.getElementById("speedoption").innerHTML = 'Speed: fast';  
    speed = 20;
};

document.getElementById("normalspeed").onclick = () => {
    document.getElementById("speedoption").innerHTML = 'Speed: normal';    
    speed = 50;
};

document.getElementById("slowspeed").onclick = () => {
    document.getElementById("speedoption").innerHTML = 'Speed: slow';
    speed = 100;
};