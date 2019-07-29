let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

// load images

let mj = new Image();
let bg = new Image();
let fg = new Image();
let pipeNorth = new Image();
let pipeSouth = new Image();

mj.src = "images/mj4.png"
bg.src = "images/bg2.png";
fg.src = "images/fg2.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";


// some variables

let gap = 250;
let constant;

let bX = 1100;
let bY = 150;

let gravity = 2.5;

let score = 0;

// audio files

let fly = new Audio();
let scor = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";

// on key down

document.addEventListener("keydown",moveUp);

function moveUp(){
    bY -= 40;
    fly.play();
}

// pipe array

let pipe = [];

pipe[0] = {
    x : 240,
    y : 0
};

// draw images of whole canvass

function draw(){
    
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)
 
    
    
    for (let i = 0; i < pipe.length; i++){
        
        constant = pipeNorth.height+gap;
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);
        ctx.drawImage(fg,0, cvs.height - fg.height, canvas.width, canvas.height);
             
        pipe[i].x++;
        
        if (pipe[i].x == 250){
            pipe.push({
                x : 0,
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            }); 
        }

        // detect collision
        
        if( bX + mj.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY+mj.height >= pipe[i].y+constant) || bY + mj.height >=  cvs.height - fg.height){
            location.reload(); // reload the page
        }
        
        if(pipe[i].x == 1100){
            score++;
            scor.play();
        }
        
        
    }

    // ctx.drawImage(fg,0, cvs.height - fg.height, canvas.width, canvas.height);
    
    ctx.drawImage(mj,bX,bY);
    
    bY += gravity;
    
    ctx.fillStyle = "#000";
    ctx.font = "20px Arial";
    ctx.fillText("Score : "+score,10,cvs.height-20);
    
    requestAnimationFrame(draw);
    
}

draw();
























