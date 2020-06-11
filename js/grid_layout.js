var stepX;
var tileCount;
var stepY;
var actRandomSeed = 0;
var ranNeg;
var ranPos;

var xWidth;
var yHeight;
var canvas;

function setup() {
    canvas = createCanvas(windowWidth, windowWidth);
    canvas.position(0, 0);
    canvas.class('joe-bg');
    background(255);
    //colorMode(HSB, width, height, 100);
    tileCount = 50;
    //frameRate(1);
    ranNeg =random(-5,0);
    ranPos =random(0,5);
    xWidth = width/tileCount;
    yHeight = height/tileCount;
}

function draw() {
    background(18, 15, 38);
    //translate(width/2, height/2);
    noFill();
    stroke(10);

    randomSeed(actRandomSeed);
    for (var gridY = 0; gridY < tileCount; gridY++) {
        for (var gridX = 0; gridX < tileCount; gridX++) {
            var posX = (xWidth) * gridX;
            var posY = (yHeight) * gridY;
            strokeWeight(10);
            var toggle = int(random(0, 4));

            if (toggle == 0) {

                stroke( 20, 151, 166);
                push();
                translate(posX, posY);
                rotate(map(mouseX,0,width,ranNeg,ranPos))

                
                arc(0, 0, xWidth, yHeight, 0, HALF_PI);
                arc(xWidth, yHeight, xWidth, yHeight, PI, PI+HALF_PI);
                pop();

            }
            if (toggle == 1) {
                stroke(121, 217, 199);
                push();
                translate(posX+width/tileCount,posY);
                rotate(map(mouseX,0,width,ranNeg,ranPos));
                arc(0, 0, xWidth, yHeight,  HALF_PI,PI);
                arc(-xWidth, yHeight, xWidth, yHeight,PI+HALF_PI,TWO_PI);

                pop();
                
            }
            if (toggle == 2) {
                stroke(242, 221, 213);
                push();
                translate(posX+width/tileCount, posY+ height/tileCount);
                rotate(map(mouseX,0,width,ranNeg,ranPos));
                arc(0, 0, xWidth, yHeight, PI,PI+HALF_PI);
                arc(-xWidth, -yHeight, xWidth, yHeight, TWO_PI, TWO_PI+HALF_PI);
                
                pop();
                
            }
            if (toggle == 3) {
                stroke(217, 59, 59);
                push();
                translate(posX, posY+ height/tileCount);
                rotate(map(mouseX,0,width,ranNeg,ranPos));
                arc(0, 0, xWidth, yHeight, PI+HALF_PI,TWO_PI);
                arc(xWidth, -yHeight, xWidth, yHeight, HALF_PI,PI);
                
                pop();
                
            }
            /*
            */
        }
    }
    console.log(map(mouseX,0,width,-2,2),map(mouseY,0,height,-2,2))
}




function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    xWidth = width/tileCount;
    yHeight = height/tileCount;
}