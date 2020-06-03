var canvas;
var t = 0;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight, P2D);
    canvas.position(0, 0);
    canvas.class('joe-bg');
    background(0);
    colorMode(RGB, 255, 255, 255, 255);
}

function draw() {

    translate(mouseX, mouseY);
    strokeWeight(2);

    stroke(random(255), 20, 50);
    noFill();
    beginShape();
    for (let theta = 0; theta <= 2 * PI; theta += 0.01) {
        var rad = r(theta,
            floor(map(mouseX, 0, width, 2, 15)), //a
            floor(map(mouseX, 0, width, 2, 15)), //b
            floor(map(mouseY, 0, height, 2, 25)), //m
            2, //n1
            sin(t) * 0.5 + 0.5, //n2
            cos(t) * 0.5 + 0.5, //n3
        );
        var x = rad * cos(theta) * 50;
        var y = rad * sin(theta) * 50;

        vertex(x, y);
    }


    endShape(CLOSE);

    t += 0.07;
}

function r(theta, a, b, m, n1, n2, n3) {
    return pow(pow((abs(cos(m * theta / 4) / a)), n2) + pow((abs(sin(m * theta / 4) / b)), n3), -1 / n1);
}

function mousePressed() {
    background(0);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}