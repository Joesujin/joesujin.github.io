var canvas;

let mover

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.class('joe-bg');
    mover = new Mover(width / 2, height / 2);

}


function draw() {
    background(0);

    mover.update();
    mover.show();
}


// Class Mover------------------------------------------------------------------------

class Mover {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = p5.Vector.random2D();
        this.vel.mult(random(3));
        this.acc = createVector();
        
    }

    update() {
        let mouse = createVector(mouseX, mouseY);
        this.acc = p5.Vector.sub(mouse, this.pos);
        this.acc.setMag(1);

        this.vel.add(this.acc);
        this.vel.limit(5);

        this.pos.add(this.vel);
    }

    show() {
        stroke(255);
        strokeWeight(2);
        fill(255, 100);
        ellipse(this.pos.x, this.pos.y, 32);
    }

}