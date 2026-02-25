let canvas;

// Core dimensions
const GRID_SIZE = 16;
const LOOM_PATTERN_COLS = 6; // 6 patterns wide
const START_PATTERN_ROWS = 6; // 6 patterns down
const MAX_PATTERN_ROWS = 60; // hold up to 60 patterns in memory!

const LOOM_COLS = GRID_SIZE * LOOM_PATTERN_COLS;
const INITIAL_LOOM_ROWS = GRID_SIZE * START_PATTERN_ROWS;

// UI Elements
let btnRed, btnGreen, btnErase;

// Local Pattern Data (16x16)
let patternData = [];

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

// Grid bounds for click detection
let leftStartX = 0, leftStartY = 0, leftCellSize = 0;

// The currently selected brush tool ('r', 'c', or '')
let activeBrush = 'r';

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.class('punchkode-bg');

    noStroke(0);

    lastUpdate = millis();

    // Initialize an empty 16x16 pattern array default filled with Red
    for (let r = 0; r < GRID_SIZE; r++) {
        let row = [];
        for (let c = 0; c < GRID_SIZE; c++) {
            row.push('r'); // Start fully populated with 'r'
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

    // Set up DOM Tool Buttons
    btnRed = createButton('1');
    btnRed.style('color', '#fff');
    styleButton(btnRed, '#ff4d4d');
    btnRed.mousePressed(() => { activeBrush = 'r'; updateBtnStates(); });

    btnGreen = createButton('2');
    btnGreen.style('color', '#333');
    styleButton(btnGreen, '#c2f0c2');
    btnGreen.mousePressed(() => { activeBrush = 'c'; updateBtnStates(); });

    btnErase = createButton('3: Erase');
    styleButton(btnErase, '#333');
    btnErase.style('color', '#fff');
    btnErase.mousePressed(() => { activeBrush = ''; updateBtnStates(); });

    updateBtnStates();
    positionUI();

    console.log("Punchkode Split-Grid Editor Initialized!");
}

function styleButton(btn, bgColor) {
    btn.style('background-color', bgColor);
    btn.style('border', '2px solid transparent');
    btn.style('border-radius', '4px');
    btn.style('min-width', '40px');
    btn.style('height', '40px');
    btn.style('cursor', 'pointer');
    btn.style('padding', '0 10px');
    btn.style('font-family', 'sans-serif');
    btn.style('font-weight', 'bold');
}

function keyPressed() {
    if (key === '1') {
        activeBrush = 'r';
        updateBtnStates();
    } else if (key === '2') {
        activeBrush = 'c';
        updateBtnStates();
    } else if (key === '3') {
        activeBrush = '';
        updateBtnStates();
    }
}

function updateBtnStates() {
    // Highlight the active brush
    btnRed.style('border', activeBrush === 'r' ? '2px solid #fff' : '2px solid transparent');
    btnGreen.style('border', activeBrush === 'c' ? '2px solid #fff' : '2px solid transparent');
    btnErase.style('border', activeBrush === '' ? '2px solid #fff' : '2px solid transparent');
}

// Pull color from the internal array
function getPatternColor(row, col) {
    let val = patternData[row][col];
    if (val === 'r') return '#ff4d4d'; // Red
    if (val === 'c') return '#c2f0c2'; // Green
    return null;
}

function positionUI() {
    let leftWidth = width * 0.66;
    leftCellSize = min((leftWidth * 0.8) / GRID_SIZE, (height * 0.8) / GRID_SIZE);
    leftStartX = (leftWidth - (GRID_SIZE * leftCellSize)) / 2;
    leftStartY = (height - (GRID_SIZE * leftCellSize)) / 2;

    // Position buttons below the grid
    let btnY = leftStartY + (GRID_SIZE * leftCellSize) + 20;

    // Group them together in the center of the left area
    let totalBtnWidth = (40 * 3) + 20; // 3 buttons + gaps
    let startXBtn = leftStartX + ((GRID_SIZE * leftCellSize) - totalBtnWidth) / 2;

    btnRed.position(startXBtn, btnY);
    btnGreen.position(startXBtn + 50, btnY);
    btnErase.position(startXBtn + 100, btnY);
}

function applyGridClick(col, row) {
    if (col >= 0 && col < GRID_SIZE && row >= 0 && row < GRID_SIZE) {
        // Overwrite the cell with whatever brush is active
        patternData[row][col] = activeBrush;
    }
}

function mousePressed() {
    // Check if click is inside the left pattern grid
    if (mouseX >= leftStartX && mouseX < leftStartX + (GRID_SIZE * leftCellSize) &&
        mouseY >= leftStartY && mouseY < leftStartY + (GRID_SIZE * leftCellSize)) {

        let col = floor((mouseX - leftStartX) / leftCellSize);
        let row = floor((mouseY - leftStartY) / leftCellSize);

        applyGridClick(col, row);
    }
}

function mouseDragged() {
    if (mouseX >= leftStartX && mouseX < leftStartX + (GRID_SIZE * leftCellSize) &&
        mouseY >= leftStartY && mouseY < leftStartY + (GRID_SIZE * leftCellSize)) {

        let col = floor((mouseX - leftStartX) / leftCellSize);
        let row = floor((mouseY - leftStartY) / leftCellSize);

        applyGridClick(col, row);
    }
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

        loomData[r][c] = patternData[patternRowOffset][patternCol];

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

    for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
            let x = leftStartX + (col * leftCellSize);
            let y = leftStartY + (row * leftCellSize);

            let cellColor = getPatternColor(row, col);

            // All cells always show their true color
            if (cellColor) {
                fill(cellColor);
            } else {
                fill(20); // Blank matches background
            }

            // Re-apply stroke for the editor frame so users can see the grid to click!
            stroke(40);
            strokeWeight(1);
            rect(x, y, leftCellSize, leftCellSize);
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

            let cellColor = null;
            if (isWoven) {
                let val = loomData[row][col];
                if (val === 'r') cellColor = '#ff4d4d'; // Red
                else if (val === 'c') cellColor = '#c2f0c2'; // Green

                if (cellColor) {
                    fill(cellColor);
                } else {
                    fill(20);
                }
            } else {
                fill(20);
            }

            rect(x, y, rightCellSize, rightCellSize);
        }
    }
    pop();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    positionUI();
}
