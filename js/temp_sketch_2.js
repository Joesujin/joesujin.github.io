var inc = 0.008;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '-1');
    colorMode(HSB, 360, 255, 255, 255);
    pixelDensity(1);
}

function draw() {
    
    var yoff=0;

    loadPixels();
    for (var x = 0; x < width; x++) {
        var xoff=0;
        for (var y = 0; y < height; y++) {
            var index = (x + y * width) * 4;
            var r = noise(xoff,yoff) * 255;

            pixels[index] = r;
            pixels[index + 1] = r;
            pixels[index + 2] = r;
            pixels[index + 3] = r;

            xoff += inc;
        }
        yoff += inc;
    }
    updatePixels();
    // noLoop();
}