var xStart, yStart, xNoise, yNoise;
var scl = 60;
var mouseVal;

var canvas;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight,P2D);
    canvas.position(0, 0);
    canvas.class('joe-bg');
    frameRate(60);
    noFill();
    xStart = random(10);
    yStart = random(10);
    //noLoop();

}

function draw() {
    background(20);
    stroke(0);
    strokeWeight(10);

    mouseVal = mouseX;

    xStart += map(mouseVal, 0, width, 0.02, 0.009);
    yStart += map(mouseVal, 0, width, 0.09, 0.01);


    xNoise = xStart;
    yNoise = yStart;


    //fill(100);
    rectMode(CENTER);

    for (let y = 0; y <= height; y += scl) {
        yNoise += 0.08;
        xNoise = xStart;
        for (let x = 0; x <= width; x += scl) {
            xNoise += 0.08;
            drawPoint(x, y, noise(xNoise, yNoise), scl);
        }
    }
}

function drawPoint(x, y, NoiseVal, scale) {
    push();
    translate(x, y);
    rotate(NoiseVal * (radians(360)));
    stroke(NoiseVal * 255, 20, 50);
    line(0, 0, scale, 0);
    pop();
    push();
    translate(x, y);
    stroke(NoiseVal * 255, 20, 250);
    ellipse(0, 0, NoiseVal * scale, NoiseVal * scale);
    pop();

}