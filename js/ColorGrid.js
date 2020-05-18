var stepX;
var stepY;

var canvas

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.class('joe-bg');
    background(0);
    colorMode(HSB, width, height, 100);
}

function draw() {
    noStroke();
    stepX = mouseX+2;
    stepY = mouseY+2;

    for(var gridY= 0; gridY<height; gridY+=stepY){
        for(var gridX= 0; gridX<width; gridX+=stepX){
            fill(gridX,height-gridY,100);
            rect(gridX,gridY,stepX,stepY);
        }
    }
}