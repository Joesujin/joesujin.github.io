var xNoise, yNoise, xStart, yStart, scl,onemorescale;
var xstartNoise, ystartNoise;
var a, b, lastx, lasty;
var fade;
var canvas;


function setup(){
  canvas = createCanvas(windowWidth,windowHeight);
  canvas.position(0,0);
  canvas.style('z-index','-1');
  strokeWeight(1);
  scl= 7;
  noFill();
  xStart = random(10);
  yStart = random(10);
  rectMode(CENTER);
  colorMode(HSB);
  xstartNoise = random(20);
  ystartNoise = random(20);
  lastx = 0;
  lasty =0;
  fade= 100;
}

function draw(){

  fill(0);
  noStroke();
  rect(0,0,width*2,height*2);

  xstartNoise += 0.008;
  ystartNoise += 0.008;

  xStart += (noise(xstartNoise)*0.004)-0.008;
  yStart += (noise(ystartNoise)*0.004)-0.008;

  xNoise = xStart;
  yNoise = yStart;

  a = mouseX;
  b = mouseY;

  lastx=lerp(lastx, a, 0.04);
  lasty=lerp(lasty, b, 0.06);

  for (var y=0; y<=height; y+=scl) {
    yNoise += 0.07;
    xNoise = xStart;
    for (var x=0; x<=width; x+=scl) {
      xNoise += 0.07;
      var NoiseVal = noise(xNoise, yNoise);
      var distant = dist(lastx, lasty, x, y);

      if (distant<=fade) {
      //if (dist(x,y,width,height) < 20) {
        drawPointRotate(x, y, NoiseVal, scl);
      }
    }
  }


  fade-=0.03;
}

function mousePressed(){
  fade= 100;
}

function drawPointRotate( x,  y,  Noise,  Size) 
{
  push();
  noFill();
  translate(x, y);
  rotate(Noise*radians(360*1.15));
  stroke(Noise*255+150, Noise*255+50, 255);
  strokeWeight(Noise*20);
  line(0, 0, Noise*(Size+50), 0);
  stroke(130, 70, Noise*255, 12);
  strokeWeight(1);
  //ellipse(0,0,Noise*(Size),Noise*(Size));
  pop();
}
