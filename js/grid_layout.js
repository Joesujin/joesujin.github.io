var stepX;
var tileCount;
var stepY;
var actRandomSeed =0;


var canvas;

function setup() {
    canvas = createCanvas(windowWidth, windowWidth);
    canvas.position(0, 0);
    canvas.class('joe-bg');
    background(255);
    colorMode(HSB, width, height, 100);
    tileCount = 100;
    //frameRate(1);
}

function draw() {
    background(255);
    //translate(width/2, height/2);

    randomSeed(actRandomSeed);
    for(var gridY=0; gridY< tileCount; gridY++){
        for(var gridX=0; gridX< tileCount; gridX++){
            var posX = (width/tileCount)*gridX;
            var posY = (height/tileCount)*gridY;
            
            var toggle= int(random(0,2));

            if(toggle ==0){
                strokeWeight(mouseX/100);
                if((mouseX-posX)==0){
                    stroke(200,mouseX,200);
                }
                else{
                    stroke(0);
                }
                line(posX, posY, posX + width/tileCount, posY + height/tileCount);
            }
            if(toggle ==1){
                strokeWeight(mouseY/100);
                line(posX, posY + width/tileCount, posX + height/tileCount, posY);
            }
        }
    }
    
    

}

function windowResized(){
    resizeCanvas(windowWidth,windowHeight);
}