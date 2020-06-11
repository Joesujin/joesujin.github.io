var canvas;
var val;
var scl;
var mapval1;
var mapval2;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.class('joe-bg');
    background(0);
    scl = abs(width-height)/32;
    val =-10;
    smooth(12)
    //colorMode(HSB,250,100,100,100);
}


function draw() {
    //background(0);
    fill(0,45);
    noStroke();
    rect(0,0,width,height);
    stroke(0);
    //stroke(1, 58, 64);
    strokeWeight(2);

    scl =50;
    //val = map(mouseY, 0, height, -10,10);

    mapval1 = map(mouseX,0,width,5,15);
    mapval2 = map(mouseY,0,height,1,5);
    
    let a=mapval1;
    let b=mapval2;
    push();
    translate(width/2,height/2);
    beginShape(TRIANGLES);
    for(let i=0; i<=500; i++){
        //stroke(i/2,80,60);
        //colorMode(RGB);
        if((i%4)==0){
            fill(3, 140, 127,100);
        }
        if((i%4)==1){
            fill( 4, 191, 138,100);
        }
        if((i%4)==2){
            fill( 125, 191, 59,100);
        }
        if((i%4)==4){
            fill(159, 242, 34,100);
        }
        if((i%4)==3){
            fill(1, 58, 64,100);
        }
        
        //fill(i/3,80,60,30);
        //  fill(0,60);
        //strokeWeight(i/512);

        //line(x1(val+i),y1(val+i),x2(val+i),y2(val+i));
        // line(x1(val+i,a,b),y1(val+i,a,b),x1(val+i-5,a,b),y1(val+i-5,a,b));
        // point(x1(val+i+200,a,b),y1(val+i+200,a,b));
        vertex(x1(val+i+200,a,b),y1(val+i+200,a,b));
    }
    endShape();
    pop();

    val+=0.01;    
}


function x1(t, a, b) {
    let v1 = ((a - b) * cos(t)) + (b * cos(((a - b) / b) * t));
    return v1 * scl;
}

function y1(t, a, b) {
    let v2 = ((a - b) * sin(t)) + (b * sin(((a - b) / b) * t));
    return v2 * scl;
}
function x2(t, a, b) {
    let v1 = ((a - b) * cos(t)) + (b * cos(((a - b) / b) * t));
    return v1 * scl;
}

function y2(t, a, b) {
    let v2 = ((a - b) * sin(t)) + (b * sin(((a - b) / b) * t));
    return v2 * scl;
}




function windowResized(){
    resizeCanvas(windowWidth,windowHeight);
    scl = abs(width-height)/4;
    }

    function mousePressed(){
        background(0);
    }