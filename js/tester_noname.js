var canvas;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.class('joe-bg');
    background(0);

}

function draw() {
    background(0);
    let v = createVector([x], [y], [z])

}




function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}