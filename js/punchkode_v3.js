let canvas;

// Core dimensions
const GRID_SIZE = 16;
const LOOM_PATTERN_COLS = 6; // 6 patterns wide
const START_PATTERN_ROWS = 6; // 6 patterns down
const MAX_PATTERN_ROWS = 60; // hold up to 60 patterns in memory!

const LOOM_COLS = GRID_SIZE * LOOM_PATTERN_COLS;
const INITIAL_LOOM_ROWS = GRID_SIZE * START_PATTERN_ROWS;


// UI Elements Removed per user request

// True physical loom variables
// Editor Grid data
let patternData = []; // Stores 'u' (Up) or 'd' (Down) for Z-depth of intersection
let colColors = [];   // Stores colors for vertical threads
let rowColors = [];   // Stores colors for horizontal threads

// UI elements for the palette
let pickers = [];
let hexInputs = [];
let colorPalette = ['#BF4646', '#FFF4EA', '#7EACB5']; // 3 available colors
// Memory matrix for the massive loom blanket
let loomData = [];

// Timing and animation mapping
let currentRowStep = 0;
let totalRowsWoven = 0;
let isRowPaused = false;
let lastUpdate = 0;

// Change these to control the speed of the animation! 
let rowDuration = 100; // time (in ms) to draw one complete row (horizontal sweep)
let rowPause = 500;    // time (in ms) to wait at the end of the line before starting the next row
let blinkSpeed = 5;     // ms per blink cycle

// Visual styling variables
let topThreadCenter = 0.89;    // Center width percentage for the thread ON TOP
let topThreadEdge = 0.91;      // Edge width percentage for the thread ON TOP
let bottomThreadCenter = 0.72; // Center width percentage for the thread UNDERNEATH
let bottomThreadEdge = 0.79;   // Edge width percentage for the thread UNDERNEATH
let threadTaperEdge = 0.2;     // Length offset away from boundary where thread stays min width
let threadTaperLength = 0.41;   // Length of the diagonal tapering section

// Grid bounds for click detection
let leftStartX = 0, leftStartY = 0, leftCellSize = 0;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.class('punchkode-bg');

    noStroke(0);

    lastUpdate = millis();

    // The target depth ('u' or 'd') assigned when a mouse drag begins
    window.dragTargetState = null;

    // Create 3 user-selectable color pickers and synced text inputs
    let uiContainer = createDiv('');

    // --- DEV SLIDERS (Comment out this entire block to disable) ---
    let devUI = createDiv('');
    devUI.position(20, height - 160);
    devUI.style('color', '#fff');
    devUI.style('font-family', 'monospace');
    devUI.style('font-size', '14px');
    devUI.style('background', 'rgba(0,0,0,0.5)');
    devUI.style('padding', '10px');
    devUI.style('border-radius', '4px');

    function createDevSlider(label, minVal, maxVal, stepVal, startVal, updateFn) {
        let row = createDiv('');
        row.parent(devUI);

        let lbl = createSpan(label + ': ' + startVal);
        lbl.parent(row);
        lbl.style('display', 'inline-block');
        lbl.style('width', '220px');

        let s = createSlider(minVal, maxVal, startVal, stepVal);
        s.parent(row);
        s.input(() => {
            let v = s.value();
            lbl.html(label + ': ' + v);
            updateFn(v);
        });
    }

    // createDevSlider('topThreadCenter', 0.1, 1.0, 0.01, topThreadCenter, v => topThreadCenter = v);
    // createDevSlider('topThreadEdge', 0.1, 1.0, 0.01, topThreadEdge, v => topThreadEdge = v);
    // createDevSlider('bottomThreadCenter', 0.1, 1.0, 0.01, bottomThreadCenter, v => bottomThreadCenter = v);
    // createDevSlider('bottomThreadEdge', 0.1, 1.0, 0.01, bottomThreadEdge, v => bottomThreadEdge = v);
    // createDevSlider('threadTaperEdge', 0.0, 0.5, 0.01, threadTaperEdge, v => threadTaperEdge = v);
    // createDevSlider('threadTaperLength', 0.0, 0.5, 0.01, threadTaperLength, v => threadTaperLength = v);
    // // ----------------------------------------------------------------
    uiContainer.position(20, height - 50);
    uiContainer.style('display', 'flex');
    uiContainer.style('gap', '15px');

    for (let i = 0; i < 3; i++) {
        let group = createDiv('');
        group.parent(uiContainer);
        group.style('display', 'flex');

        let picker = createInput(colorPalette[i], 'color');
        picker.parent(group);
        picker.style('width', '30px');
        picker.style('height', '30px');
        picker.style('padding', '0');
        picker.style('border', 'none');

        let hexIn = createInput(colorPalette[i], 'text');
        hexIn.parent(group);
        hexIn.style('width', '70px');
        hexIn.style('height', '30px');
        hexIn.style('background', '#222');
        hexIn.style('color', '#fff');
        hexIn.style('border', '1px solid #444');
        hexIn.style('font-family', 'monospace');
        hexIn.style('text-transform', 'uppercase');

        // Syncing logic
        picker.input(() => {
            let val = picker.value();
            colorPalette[i] = val;
            hexIn.value(val);
        });

        hexIn.input(() => {
            let val = hexIn.value();
            // Basic valid hex check before applying
            if (/^#[0-9A-F]{6}$/i.test(val)) {
                colorPalette[i] = val;
                picker.value(val);
            }
        });

        pickers.push(picker);
        hexInputs.push(hexIn);
    }

    // Initialize 16x16 pattern with 'u' (Up depth by default)
    // Initialize row/col threads with colors
    for (let i = 0; i < GRID_SIZE; i++) {
        rowColors.push(0); // Default 0
        colColors.push(1); // Default 1

        let row = [];
        for (let j = 0; j < GRID_SIZE; j++) {
            row.push('u');
        }
        patternData.push(row);
    }

    // Initialize the massive loom memory canvas
    for (let r = 0; r < INITIAL_LOOM_ROWS; r++) {
        let row = [];
        for (let c = 0; c < LOOM_COLS; c++) {
            row.push('');
        }
        loomData.push(row);
    }

    positionUI();

    console.log("Punchkode Version 3: True Loom Editor Initialized!");
}

function positionUI() {
    let leftWidth = width * 0.66;
    // We are now allocating for a 17x17 visual grid (to fit the UI assignment row/col)
    leftCellSize = min((leftWidth * 0.8) / (GRID_SIZE + 1), (height * 0.8) / (GRID_SIZE + 1));
    leftStartX = (leftWidth - ((GRID_SIZE + 1) * leftCellSize)) / 2;
    leftStartY = (height - ((GRID_SIZE + 1) * leftCellSize)) / 2;
}

function applyGridClick(col, row, isClick) {
    // Only process UI margin clicks on a discrete click, not a drag
    if (isClick) {
        // Top row bounds checking for column UI clicks
        if (row === -1 && col >= 0 && col < GRID_SIZE) {
            colColors[col] = (colColors[col] + 1) % colorPalette.length;

            // Holding SHIFT while clicking flips the column uniformly for convenience
            if (keyIsDown(SHIFT)) {
                let targetState = (patternData[0][col] === 'u') ? 'd' : 'u';
                for (let r = 0; r < GRID_SIZE; r++) {
                    patternData[r][col] = targetState;
                }
            }
            return;
        }

        // Right col bounds checking for row UI clicks
        if (col === GRID_SIZE && row >= 0 && row < GRID_SIZE) {
            rowColors[row] = (rowColors[row] + 1) % colorPalette.length;

            // Holding SHIFT while clicking flips the row uniformly for convenience
            if (keyIsDown(SHIFT)) {
                let targetState = (patternData[row][0] === 'u') ? 'd' : 'u';
                for (let c = 0; c < GRID_SIZE; c++) {
                    patternData[row][c] = targetState;
                }
            }
            return;
        }
    }

    // Playable 16x16 editor bounds
    if (col >= 0 && col < GRID_SIZE && row >= 0 && row < GRID_SIZE) {
        if (isClick && window.dragTargetState) {
            patternData[row][col] = window.dragTargetState;
        } else if (window.dragTargetState) {
            // Apply the dragged depth continuously
            patternData[row][col] = window.dragTargetState;
        }
    }
}

function mousePressed() {
    // Check if clicked inside the color pickers or hex inputs (if so, ignore canvas click)
    // p5.js DOM elements usually handle this natively, but just to be safe.

    // We expand the click detection bounds slightly to grab the row= -1 and col= 16 UI bars!
    let expandedVisualStartX = leftStartX + leftCellSize; // the actual 16x16 starts offset by 1
    let expandedVisualStartY = leftStartY + leftCellSize; // because the UI row/col are at 0

    // Did they click literally anywhere near the Left side?
    if (mouseX >= leftStartX && mouseX < leftStartX + ((GRID_SIZE + 1) * leftCellSize) &&
        mouseY >= leftStartY && mouseY < leftStartY + ((GRID_SIZE + 1) * leftCellSize)) {

        // Because of the UI row, visual Y coords are offset by 1 cell!
        // X coords are NOT offset since the X UI is on the right!
        let mappedCol = floor((mouseX - leftStartX) / leftCellSize);
        let mappedRow = floor((mouseY - leftStartY) / leftCellSize) - 1;

        // Determine what the target state for dragging should be BEFORE applying the click
        if (mappedCol >= 0 && mappedCol < GRID_SIZE && mappedRow >= 0 && mappedRow < GRID_SIZE) {
            let currentDepth = patternData[mappedRow][mappedCol];
            window.dragTargetState = (currentDepth === 'u') ? 'd' : 'u';
        }

        applyGridClick(mappedCol, mappedRow, true);
    }
}

function mouseDragged() {
    if (mouseX >= leftStartX && mouseX < leftStartX + ((GRID_SIZE + 1) * leftCellSize) &&
        mouseY >= leftStartY && mouseY < leftStartY + ((GRID_SIZE + 1) * leftCellSize)) {

        let mappedCol = floor((mouseX - leftStartX) / leftCellSize);
        let mappedRow = floor((mouseY - leftStartY) / leftCellSize) - 1;

        applyGridClick(mappedCol, mappedRow, false);
    }
}

function mouseReleased() {
    // Reset drag memory
    window.dragTargetState = null;
}

function draw() {

    background(20);

    // Dynamic speed for the current action
    let currentRevealSpeed = isRowPaused ? rowPause : (rowDuration / LOOM_COLS);

    // Advance the global weaving based on timer
    while (millis() - lastUpdate > currentRevealSpeed) {
        if (isRowPaused) {
            // Row pause is over. Shift fabric up!
            isRowPaused = false;
            currentRowStep = 0;
            totalRowsWoven++;

            // "add 6 more new grids and keep going up donot delete and restart we can keep a max number of grids stored"
            if (totalRowsWoven >= loomData.length) {
                // Add 6 patterns worth of rows
                let rowsToAdd = GRID_SIZE * 6;
                for (let r = 0; r < rowsToAdd; r++) {
                    loomData.push(new Array(LOOM_COLS).fill(''));
                }

                // Enforce max memory
                let maxRows = GRID_SIZE * MAX_PATTERN_ROWS;
                if (loomData.length > maxRows) {
                    loomData.splice(0, rowsToAdd);
                    totalRowsWoven -= rowsToAdd;
                }
            }

            lastUpdate += currentRevealSpeed;
            currentRevealSpeed = rowDuration / LOOM_COLS;
            continue;
        }

        // Weaving the current cell at the bottom of the loom
        let r = totalRowsWoven;
        let isEvenRow = (totalRowsWoven % 2 === 0);
        let c = isEvenRow ? currentRowStep : (LOOM_COLS - 1 - currentRowStep);

        let patternRowOffset = totalRowsWoven % GRID_SIZE;
        let patternCol = c % GRID_SIZE;

        // Immediately freeze the exact depth and thread colors for this cell permanently
        let vColor = colColors[patternCol];
        let hColor = rowColors[patternRowOffset];
        let depth = patternData[patternRowOffset][patternCol];
        loomData[r][c] = { depth: depth, vColor: vColor, hColor: hColor };

        currentRowStep++;

        if (currentRowStep >= LOOM_COLS) {
            isRowPaused = true;
        }

        lastUpdate += currentRevealSpeed;
        currentRevealSpeed = isRowPaused ? rowPause : (rowDuration / LOOM_COLS);
    }

    // ------------------------------------------------------------
    // LEFT SIDE: The 16x16 Interactive Pattern Block (2/3 of screen)
    // ------------------------------------------------------------

    // Here we draw a 17x17 grid! 
    // The top row handles columns threads. 
    // The right col handles row threads.
    for (let row = -1; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE + 1; col++) {

            // Blank out the top-right overlapping corner (does nothing)
            if (row === -1 && col === GRID_SIZE) continue;

            // Adjust thickness for the UI indicator bars
            let uiThickness = leftCellSize * 0.3;

            // Calculate XY and Dimensions based on whether it's the UI control or the main grid
            let visualX, visualY, w, h;

            if (row === -1) {
                // Top row UI (Column Colors) - Looks like a vertical thread entering
                let centerOffset = (leftCellSize - uiThickness) / 2;
                visualX = leftStartX + (col * leftCellSize) + centerOffset;
                visualY = leftStartY;
                w = uiThickness;
                h = leftCellSize;
            } else if (col === GRID_SIZE) {
                // Right col UI (Row Colors) - Looks like a horizontal thread exiting
                let centerOffset = (leftCellSize - uiThickness) / 2;
                visualX = leftStartX + (col * leftCellSize);
                visualY = leftStartY + ((row + 1) * leftCellSize) + centerOffset;
                w = leftCellSize;
                h = uiThickness;
            } else {
                // Main Grid Cell
                visualX = leftStartX + (col * leftCellSize);
                visualY = leftStartY + ((row + 1) * leftCellSize);
                w = leftCellSize;
                h = leftCellSize;
            }

            let cellColor = null;

            if (row === -1) {
                // This is the COLUMN thread assignment UI row
                cellColor = colorPalette[colColors[col]];
            } else if (col === GRID_SIZE) {
                // This is the ROW thread assignment UI column
                cellColor = colorPalette[rowColors[row]];
            } else {
                // This is the PLAYABLE 16x16 editor logic!

                // Keep the background dark
                fill(20);
                rect(visualX, visualY, w, h);

                let depth = patternData[row][col];
                let hColor = colorPalette[rowColors[row]];
                let vColor = colorPalette[colColors[col]];

                // Draw horizontal and vertical threads overlapping
                if (depth === 'u') {
                    // Underneath: Vertical thread
                    drawTaperedThread(visualX, visualY, leftCellSize, vColor, false, false);
                    // On top: Horizontal thread
                    drawTaperedThread(visualX, visualY, leftCellSize, hColor, true, true);
                } else {
                    // Underneath: Horizontal thread
                    drawTaperedThread(visualX, visualY, leftCellSize, hColor, true, false);
                    // On top: Vertical thread
                    drawTaperedThread(visualX, visualY, leftCellSize, vColor, false, true);
                }

                // Draw the cell border
                strokeWeight(1);
                stroke(40);
                noFill();
                rect(visualX, visualY, w, h);
                noStroke();
                continue; // Skip the old block rendering
            }

            if (cellColor) {
                fill(cellColor);
            } else {
                fill(20);
            }

            // UI Stroke 
            strokeWeight(1);
            stroke(20);
            rect(visualX, visualY, w, h);
        }
    }

    // Turn off stroke for right side
    noStroke();

    // ------------------------------------------------------------
    // RIGHT SIDE: The Tiled Loom Blanket (1/3 of screen)
    // ------------------------------------------------------------
    let leftWidth = width * 0.66;
    let rightWidth = width * 0.33;
    // Calculate cell size to fit the INITIAL blanket size in 90% of the right width and height
    // This locks the cell size visually forever!
    let rightCellSize = min((rightWidth * 0.9) / LOOM_COLS, (height * 0.9) / INITIAL_LOOM_ROWS);

    // Center it on the right
    let rightStartX = leftWidth + ((rightWidth - (LOOM_COLS * rightCellSize)) / 2);
    let rightStartY = (height - (INITIAL_LOOM_ROWS * rightCellSize)) / 2;

    push();

    // We want the active weaving row to stay exactly at 2/3 of the visible height
    let fixedPrintingY = rightStartY + (INITIAL_LOOM_ROWS * 0.66) * rightCellSize;
    // We calculate how much we need to translate the whole grid up/down
    // The active row is at `totalRowsWoven`. Its un-translated Y would be:
    let activeRowRawY = rightStartY + (totalRowsWoven * rightCellSize);

    // So the camera shift guarantees that `activeRowRawY` is always visually at `fixedPrintingY`
    let translateY = fixedPrintingY - activeRowRawY;
    translate(0, translateY);

    for (let row = 0; row < loomData.length; row++) {
        // Find where this raw row will end up visually
        let rawY = rightStartY + (row * rightCellSize);
        let visualY = rawY + translateY;

        // Optimize: Don't draw rows that are completely scrolled off screen
        if (visualY < -rightCellSize || visualY > height + rightCellSize) continue;

        for (let col = 0; col < LOOM_COLS; col++) {
            let x = rightStartX + (col * rightCellSize);
            let y = rawY; // translation handles the shift naturally!

            let isWoven = false;
            if (row < totalRowsWoven) {
                isWoven = true;
            } else if (row === totalRowsWoven) {
                let isEvenRow = (row % 2 === 0);
                if (isEvenRow) {
                    if (col < currentRowStep) isWoven = true;
                } else {
                    if (col >= LOOM_COLS - currentRowStep) isWoven = true;
                }
            }

            if (isWoven) {
                // We MUST rely entirely on the frozen data in `loomData`!
                // If it's not fully initialized yet (like the first frame), fallback safely
                let cellMemory = loomData[row][col];
                if (!cellMemory || cellMemory === '' || cellMemory === 'empty') {
                    // This handles completely blank cells waiting to be woven
                    fill(20);
                    rect(x, y, rightCellSize, rightCellSize);
                    continue;
                }

                let depth = cellMemory.depth;
                let hColor = colorPalette[cellMemory.hColor];
                let vColor = colorPalette[cellMemory.vColor];

                // Background
                fill(20);
                rect(x, y, rightCellSize, rightCellSize);

                if (depth === 'u') {
                    // Underneath: Vertical thread
                    drawTaperedThread(x, y, rightCellSize, vColor, false, false);
                    // On top: Horizontal thread
                    drawTaperedThread(x, y, rightCellSize, hColor, true, true);
                } else {
                    // Underneath: Horizontal thread
                    drawTaperedThread(x, y, rightCellSize, hColor, true, false);
                    // On top: Vertical thread
                    drawTaperedThread(x, y, rightCellSize, vColor, false, true);
                }
            } else {
                fill(20);
                rect(x, y, rightCellSize, rightCellSize);
            }
        }
    }
    pop();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    positionUI();
}

// Master draw function for the complex thread polygon
function drawTaperedThread(cx, cy, size, threadColor, isHorizontal, isOnTop) {
    // If the threadColor matches our active HTML pickers visually, make sure we use the active hex string instead of an old cached string
    // This allows active selection to change the canvas instantly if it hasn't fallen off the loom yet
    // (This logic is no longer needed since we pull directly from colorPalette indices)

    let maxT = size * (isOnTop ? topThreadCenter : bottomThreadCenter);
    let minT = size * (isOnTop ? topThreadEdge : bottomThreadEdge);

    let edgeDist = size * threadTaperEdge;
    let taperDist = size * threadTaperLength;

    // Safety check in case variables are pushed over 50%
    if (edgeDist + taperDist > size / 2) {
        taperDist = size / 2 - edgeDist;
        if (taperDist < 0) {
            edgeDist = size / 2;
            taperDist = 0;
        }
    }

    let halfMax = maxT / 2;
    let halfMin = minT / 2;

    // Build the set of offset distances along the thread length to plot points
    let pts = [];
    pts.push(0);
    pts.push(edgeDist);

    let taperSteps = 8; // 8 segments for the smooth sine curve gives very good resolution
    if (taperDist > 0) {
        // Curve up to max width
        for (let i = 1; i < taperSteps; i++) {
            pts.push(edgeDist + taperDist * (i / taperSteps));
        }
        pts.push(edgeDist + taperDist);

        // Mid center straightaway
        let midStraight = size - ((edgeDist + taperDist) * 2);
        if (midStraight > 0.01) {
            pts.push(size - edgeDist - taperDist);
        }

        // Curve down to min width
        for (let i = 1; i < taperSteps; i++) {
            pts.push(size - edgeDist - taperDist + taperDist * (i / taperSteps));
        }
    }
    pts.push(size - edgeDist);
    pts.push(size);

    // Easing helper
    function getHalfWidth(offset) {
        if (offset <= edgeDist + 0.01) return halfMin;
        if (offset >= size - edgeDist - 0.01) return halfMin;

        let startT1 = edgeDist;
        let endT1 = edgeDist + taperDist;
        if (offset > startT1 && offset <= endT1) {
            let p = (offset - startT1) / taperDist;
            let ease = (1 - cos(p * PI)) / 2; // Cosine easing from 0 to 1
            return halfMin + (halfMax - halfMin) * ease;
        }

        let startT2 = size - edgeDist - taperDist;
        let endT2 = size - edgeDist;
        if (offset >= startT2 && offset < endT2) {
            let p = (offset - startT2) / taperDist;
            let ease = (1 + cos(p * PI)) / 2; // Cosine easing from 1 back down to 0
            return halfMin + (halfMax - halfMin) * ease;
        }

        return halfMax;
    }
    fill(threadColor);
    beginShape();
    if (isHorizontal) {
        // Top edge
        for (let i = 0; i < pts.length; i++) {
            vertex(cx + pts[i], cy + size / 2 - getHalfWidth(pts[i]));
        }
        // Bottom edge
        for (let i = pts.length - 1; i >= 0; i--) {
            vertex(cx + pts[i], cy + size / 2 + getHalfWidth(pts[i]));
        }
    } else {
        // Left edge
        for (let i = 0; i < pts.length; i++) {
            vertex(cx + size / 2 - getHalfWidth(pts[i]), cy + pts[i]);
        }
        // Right edge
        for (let i = pts.length - 1; i >= 0; i--) {
            vertex(cx + size / 2 + getHalfWidth(pts[i]), cy + pts[i]);
        }
    }
    endShape(CLOSE);

    // Draw Drop Shadow
    if (isOnTop) {
        fill(0, 40);
        beginShape();
        if (isHorizontal) {
            for (let i = 0; i < pts.length; i++) {
                vertex(cx + pts[i], cy + size / 2 + getHalfWidth(pts[i]));
            }
            for (let i = pts.length - 1; i >= 0; i--) {
                vertex(cx + pts[i], cy + size / 2 + getHalfWidth(pts[i]) + 2);
            }
        } else {
            for (let i = 0; i < pts.length; i++) {
                vertex(cx + size / 2 + getHalfWidth(pts[i]), cy + pts[i]);
            }
            for (let i = pts.length - 1; i >= 0; i--) {
                vertex(cx + size / 2 + getHalfWidth(pts[i]) + 2, cy + pts[i]);
            }
        }
        endShape(CLOSE);
    }
}
