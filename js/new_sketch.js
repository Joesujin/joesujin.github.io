let particles = [];

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.style('position', 'fixed');
    cnv.style('top', '0');
    cnv.style('left', '0');
    cnv.style('z-index', '-1');

    background(20);
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }
}

function draw() {
    background(20, 20); // distinct trail effect
    // for (let p of particles) {
    //     p.update();
    //     p.show();
    // }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(20);
}

class Particle {
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.vel = p5.Vector.random2D();
        this.acc = createVector(0, 0);
        this.size = random(2, 6);
        this.color = color(random(100, 255), random(100, 255), random(200, 255));
    }

    update() {
        this.pos.add(this.vel);

        // Wrap around edges
        if (this.pos.x > width) this.pos.x = 0;
        if (this.pos.x < 0) this.pos.x = width;
        if (this.pos.y > height) this.pos.y = 0;
        if (this.pos.y < 0) this.pos.y = height;
    }

    show() {
        noStroke();
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, this.size);
    }
}
