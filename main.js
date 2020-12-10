var canvas;
var canvasContext;
var ballX = 0;
var ballY = 50;
var ballSpeedX = 5;
var ballSpeedY = 4;
var paddle1Y = 200;
var paddle2Y = 350;
const paddleHeight = 100;
const paddleThicc = 10;
const paddleDistance = 20;
const compSpeed = 4;
var p1Score = 0;
var p2Score = 0;
const win = 3;
var winScreen = false;

function handleMouseClick(evt){
    if(winScreen){
        p1Score = 0;
        p2Score = 0;
        winScreen = false;
    }
}

window.onload = function(){
    // document.querySelector(".main").innerHTML = "harrison";

    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext('2d');
    
    let fps = 90;
    setInterval(function(){
        draw();
        update();
    } ,1000/fps);

    canvas.addEventListener('mousemove',
    function(evt) {
        var mousePos = calculateMousePos(evt);
        paddle1Y = mousePos.y - (paddleHeight/2);
    });

    canvas.addEventListener('mousedown',handleMouseClick);
};

function ballReset(){

    if(p1Score >= win || p2Score >= win){
        winScreen = true;
    }

    ballSpeedX = -ballSpeedX;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
}

function drawNet(){
    for(var i = 0; i <canvas.height; i += 40){
        colorRect(canvas.width/2-1,i,2,20,"white");
    }
}

function draw(){
    colorRect(0,0,canvas.width,canvas.height,"black");

    if(winScreen){
        canvasContext.fillStyle = "white";

        if(p1Score >= win){
            canvasContext.fillText("Player 1 Wins!",canvas.width/2,canvas.height/2-40);
        } else if(p2Score >= win){
            canvasContext.fillText("Player 2 Wins!",canvas.width/2,canvas.height/2-40);

        }

        canvasContext.fillText("click to continue",canvas.width/2,canvas.height/2);
        return;
    }

    drawNet();

    //paddle Left
    colorRect(20,paddle1Y,paddleThicc,paddleHeight,"white");
    //paddle right
    colorRect((canvas.width-30),paddle2Y,paddleThicc,paddleHeight,"white");
    //ball
    drawCircle(ballX,ballY,8,"white");

    canvasContext.fillText(p1Score,100,100);
    canvasContext.fillText(p2Score,canvas.width - 100,100);

}
function drawCircle(cX,cY,rad,color){
    canvasContext.fillStyle = color;
    canvasContext.beginPath();
    canvasContext.arc(cX,cY,rad, 0,Math.PI*2, true);
    canvasContext.fill();
}

function calculateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return{
        x:mouseX,
        y:mouseY
    };
}

function compMove(){
    var p2C = paddle2Y+(paddleHeight/2);
    if(p2C < ballY - 10) {
        paddle2Y +=compSpeed;
    } else if (p2C > ballY -10) {
        paddle2Y -= compSpeed;
    } else{
        paddle2Y = paddle2Y;
    }
}

function update(){

    if(winScreen){
        return;
    }

    compMove();
    
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if(ballX == paddleThicc+paddleDistance && ballY > paddle1Y && ballY < paddle1Y+paddleHeight){
        ballSpeedX = -ballSpeedX;
        var deltaY = ballY - (paddle1Y+paddleHeight/2);
        ballSpeedY = deltaY * 0.35;
    }

    if(ballX == canvas.width-paddleThicc - (paddleThicc+paddleDistance) && ballY > paddle2Y && ballY < paddle2Y+paddleHeight){
        ballSpeedX = -ballSpeedX;
        var deltaY = ballY - (paddle2Y+paddleHeight/2);
        ballSpeedY = deltaY * 0.35;
    }

    if(ballX >= canvas.width){
        p1Score++;

        ballReset();
        ballSpeedY = 4;

    }
    if(ballX<= 0){
        p2Score++;
        ballReset();
        ballSpeedY = 4;
    }

    if(ballY >= canvas.height){
        ballSpeedY = -ballSpeedY;
    } else if(ballY<= 0){
        ballSpeedY = Math.abs(ballSpeedY);
    }

}

function colorRect(leftX, topY, width, height, color){
    canvasContext.fillStyle = (color);
    canvasContext.fillRect(leftX,topY,width,height);
}