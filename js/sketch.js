var canvas;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '-1');
}

function draw() {
    fill(0);
    noStroke();
    rect(0, 0, width * 2, height * 2);


    noFill();
    strokeWeight(1);
    stroke(random(255));
    ellipse(mouseX, mouseY, 10, 10);
}