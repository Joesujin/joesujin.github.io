var canvas;
var val;
var scl;
var mapval1;
var mapval2;
var w,h;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.class('joe-bg');
    background(0);
    scl = abs(width-height)/4;
    val =0;
    smooth(12);

    w=[];
    w.push(random(width),random(width),random(width));
    h=[];
    h.push(random(height),random(height),random(height));
    
}

function draw() {
    background(0);
    stroke(255);
    strokeWeight(4);

    
    //val = map(mouseY, 0, height, -10,10);

    mapval1 = map(mouseX,0,width,10,20);
    mapval2 = map(mouseY,0,height,1,100);
    mapval3 = map(mouseX,0,width,0.1,5);
    noFill();
    let a=mapval3;
    let b=(3*a)/8;
    let c=mapval3;
    let d=(4*a)/9;

    push();
    translate(w[1],h[1]);
    for(let i=0; i<=100; i++){
        strokeWeight(i/32);

        line(x1(val+i,a,b),y1(val+i,a,b),x2(val+i,c,d),y2(val+i,c,d));
    }
    pop()
    push();
    translate(w[2],h[2]);
    for(let i=0; i<=100; i++){
        strokeWeight(i/32);

        ellipse(x1(val+i,a,b),y1(val+i,a,b),x2(val+i,c,d),y2(val+i,c,d));
    }
    pop()
    push();
    translate(w[3],h[3]);
    for(let i=0; i<=200; i++){
        strokeWeight(i/32);
        line(x1(val+i,a,b),y1(val+i,a,b),x2(val+i,c,d),y2(val+i,c,d));
        //ellipse(x1(val+i,a,b),y1(val+i,a,b),x2(val+i,c,d),y2(val+i,c,d));
    }
    pop()


        val+=0.05;
      
}


function x1(t, a, b) {
    let v1 = ((a - b) * cos(t/mapval1)) + (b * cos((((a - b) / b) * t)/mapval1));
    return v1*scl+mapval2 ;
}

function y1(t, a, b) {
    let v2 = ((a - b) * sin(t/mapval1)) + (b * sin((((a - b) / b) * t)/mapval1));
    return v2*scl+mapval2 ;
}
function x2(t,a,b){
    let v1 = ((a - b) * cos(t/mapval1)) + (b * cos((((a - b) / b) * t)/mapval1));

    return v1*scl+mapval2;
}
function y2(t,a,b){
    let v2 = ((a - b) * sin(t/mapval1)) + (b * sin((((a - b) / b) * t)/mapval1));

    return v2*scl+mapval2;
}

function windowResized(){
    resizeCanvas(windowWidth,windowHeight);
    scl = abs(width-height)/4;
    }