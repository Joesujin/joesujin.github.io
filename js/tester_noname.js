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
    scl = abs(width-height)/4;
    val =-10;
    smooth(12)
}

function draw() {
    background(0);
    stroke(255);
    strokeWeight(4);

    //val = map(mouseY, 0, height, -10,10);

    mapval1 = map(mouseX,0,width,10,20);
    mapval2 = map(mouseY,0,height,1,100);

    translate(width/2,height/2);
    for(let i=0; i<=50; i++){
        line(x1(val+i),y1(val+i),x2(val+i),y2(val+i));
    }

    val+=0.05;    
}


function x1(t){
    let v1 = sin(t/mapval1);
    return v1*scl-mapval2;
}
function y1(t){
    let v2 = cos(t/mapval1);
    return v2*scl-mapval2;
}
function x2(t){
    let v1 = sin(-t/mapval1);
    return v1*scl+mapval2;
}
function y2(t){
    let v2 = cos(-t/mapval1);
    return v2*scl+mapval2;
}

function windowResized(){
    resizeCanvas(windowWidth,windowHeight);
    scl = abs(width-height)/4;
    }