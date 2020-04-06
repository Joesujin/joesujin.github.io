var xoff = 0;
var yoff = 100;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '-1');
    colorMode(HSB, 360, 255, 255, 255);
}

function draw() {
    fill(255,1);
    noStroke();
    rect(0, 0, width, height);
    //var x= random(200);



    var x = map(noise(xoff), 0, 1, 0, mouseX);
    var y = map(noise(yoff), 0, 1, 0, mouseY);
    var xcol = map(noise(xoff),0, 1, 0,360);
    xoff += 0.01;
    yoff += 0.01;
    fill(xcol,200,255,100);
    ellipse(x, y, 10, 10);

}