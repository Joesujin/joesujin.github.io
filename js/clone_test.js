var stepX;
var stepY;

var canvas

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.class('joe-bg');
    background(255);
    colorMode(HSB, width, height, 100);
}

function draw() {
    //background(255);
    translate(width/2, height/2);

    
    var circleResolution = map(mouseY,0,height,3,8);
    var radius = mouseX - width / 2 +0.5;

    var angle = TWO_PI/circleResolution;
    strokeWeight(mouseY/100);

    stroke(mouseX,width,100);

    beginShape();
    for(var i = 0; i<=circleResolution; i++){
        var x = cos(angle*i)*radius;
        var y = sin(angle*i)*radius;
        line(0,0,x,y);

        vertex(x, y);    
    }
    endShape(CLOSE);

}

function windowResized(){
    resizeCanvas(windowWidth,windowHeight);
}