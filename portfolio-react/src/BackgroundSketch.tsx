import React from 'react';
import p5 from 'p5';

interface BackgroundSketchProps {
  className?: string;
}

const BackgroundSketch: React.FC<BackgroundSketchProps> = ({ className }) => {
  const sketchRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!sketchRef.current) return;

    const sketch = (p: any) => {
      let xStart: number, yStart: number, scl: number;
      let xstartNoise: number, ystartNoise: number;
      let a: number, b: number, lastx: number, lasty: number;
      let fade: number;
      let noiseCache: number[][] = [];
      let lastXStart: number, lastYStart: number;
      let canvasWidth: number, canvasHeight: number;

      p.setup = () => {
        canvasWidth = window.innerWidth;
        canvasHeight = window.innerHeight;
        const canvas = p.createCanvas(canvasWidth, canvasHeight);
        canvas.position(0, 0);
        canvas.style('z-index', '-1');
        canvas.style('position', 'fixed');
        canvas.style('top', '0');
        canvas.style('left', '0');
        canvas.class('joe-bg');
        
        p.frameRate(30);
        p.strokeWeight(1);
        scl = 7;
        p.noFill();
        xStart = p.random(10);
        yStart = p.random(10);
        lastXStart = xStart;
        lastYStart = yStart;
        p.rectMode(p.CENTER);
        p.colorMode(p.HSB, 360, 255, 255, 255);
        xstartNoise = p.random(20);
        ystartNoise = p.random(20);
        lastx = 0;
        lasty = 0;
        fade = 100;
        
        initializeNoiseCache();
      };

      const initializeNoiseCache = () => {
        const cols = Math.ceil(canvasWidth / scl) + 1;
        const rows = Math.ceil(canvasHeight / scl) + 1;
        noiseCache = [];
        for (let i = 0; i < rows; i++) {
          noiseCache[i] = [];
          for (let j = 0; j < cols; j++) {
            noiseCache[i][j] = 0;
          }
        }
      };

      const updateNoiseCache = () => {
        if (Math.abs(xStart - lastXStart) < 0.001 && Math.abs(yStart - lastYStart) < 0.001) {
          return;
        }
        
        const cols = Math.ceil(canvasWidth / scl) + 1;
        const rows = Math.ceil(canvasHeight / scl) + 1;
        
        for (let i = 0; i < rows; i++) {
          const yNoiseVal = yStart + (i * 0.07);
          for (let j = 0; j < cols; j++) {
            const xNoiseVal = xStart + (j * 0.07);
            noiseCache[i][j] = p.noise(xNoiseVal, yNoiseVal, 0);
          }
        }
        
        lastXStart = xStart;
        lastYStart = yStart;
      };

      p.draw = () => {
        p.background(255);

        xstartNoise += 0.008;
        ystartNoise += 0.008;

        xStart += (p.noise(xstartNoise, 0, 0) * 0.004) - 0.008;
        yStart += (p.noise(ystartNoise, 0, 0) * 0.004) - 0.008;

        // Get mouse position safely
        a = p.mouseX || 0;
        b = p.mouseY || 0;

        lastx = p.lerp(lastx, a, 0.04);
        lasty = p.lerp(lasty, b, 0.06);

        updateNoiseCache();

        const cols = Math.ceil(canvasWidth / scl) + 1;
        const rows = Math.ceil(canvasHeight / scl) + 1;
        
        for (let i = 0; i < rows; i++) {
          const y = i * scl;
          for (let j = 0; j < cols; j++) {
            const x = j * scl;
            const distant = p.dist(lastx, lasty, x, y);

            if (distant <= fade) {
              const NoiseVal = noiseCache[i][j];
              drawPointRotate(p, x, y, NoiseVal, scl);
            }
          }
        }

        fade -= 0.03;
      };

      p.mousePressed = () => {
        fade = 100;
      };

      p.windowResized = () => {
        canvasWidth = window.innerWidth;
        canvasHeight = window.innerHeight;
        p.resizeCanvas(canvasWidth, canvasHeight);
        initializeNoiseCache();
      };

      const drawPointRotate = (p: any, x: number, y: number, Noise: number, Size: number) => {
        p.push();
        p.noFill();
        p.translate(x, y);
        p.rotate(Noise * p.radians(360 * 1.15));
        
        const lineColor = p.color(Noise * 255 + 150, Noise * 255 + 50, 255);
        lineColor.setAlpha(70);
        p.stroke(lineColor);
        p.strokeWeight(Noise * 20);
        p.line(0, 0, Noise * (Size + 50), 0);
        
        p.stroke(130, 70, Noise * 255, 12);
        p.strokeWeight(1);
        p.pop();
      };
    };

    const p5Instance = new p5(sketch, sketchRef.current);

    return () => {
      p5Instance.remove();
    };
  }, []);

  return <div ref={sketchRef} className={className} />;
};

export default BackgroundSketch; 