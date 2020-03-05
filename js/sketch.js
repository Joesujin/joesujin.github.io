var canvas;

function setup(){
    canvas = createCanvas(windowWidth,windowHeight);
    canvas.position(0,0);
    canvas.style('z-index','-1');
}

function draw(){
    noFill();
    strokeWeight(1);
    stroke(random(255));
    ellipse(mouseX, mouseY, 10, 10);
}