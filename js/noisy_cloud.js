var xNoise, yNoise, xStart, yStart, scl;
var xstartNoise, ystartNoise;
var canvas;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight, P2D);
    canvas.position(0, 0);
    canvas.class('joe-bg');
    background(0);
    //colorMode(HSB, width, height, 100);
    scl = 50;
    strokeWeight(15);
    frameRate(24);
    xStart = random(10);
    yStart = random(10);
    xstartNoise = random(20);
    ystartNoise = random(20);
}

function draw() {
    let win_scl = map(mouseX, 0, width, 10, 50);
    scl = win_scl;
    background(50);
    xstartNoise += 0.01;
    ystartNoise += 0.01;
    xStart += (noise(xstartNoise) * 0.01);
    yStart += (noise(ystartNoise) * 0.01);

    xNoise = xStart;
    yNoise = yStart;


    for (var y = 0; y <= height; y += scl) {
        yNoise += 0.07;
        xNoise = xStart;
        for (var x = 0; x <= width; x += scl) {
            xNoise += 0.07;
            var NoiseVal = noise(xNoise, yNoise);
            drawPoint(x, y, NoiseVal, scl);
        }
    }

}

function drawPoint(x, y, Noise, Size) {
    push();
    translate(x, y);
    rotate(Noise * (radians(360)));
    strokeWeight(Noise * 50);
    stroke(255 * Noise);
    line(0, 0, Size, 0);
    pop();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }