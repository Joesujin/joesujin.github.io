let canvas;

// Core dimensions
const GRID_SIZE = 16;
const LOOM_PATTERN_COLS = 6; // 6 patterns wide
const LOOM_PATTERN_ROWS = 6; // 6 patterns down
const LOOM_COLS = GRID_SIZE * LOOM_PATTERN_COLS;
const LOOM_ROWS = GRID_SIZE * LOOM_PATTERN_ROWS;

// UI Elements
let btnRed, btnGreen, btnErase;

// Local Pattern Data (16x16)
let patternData = [];

// Memory matrix for the massive loom blanket
let loomData = [];

// Timing and animation mapping
let currentStep = 0;
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
    for (let r = 0; r < LOOM_ROWS; r++) {
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

// Maps a row and column to a linear step in a snake-like path for the given width
function getStepIndex(r, c, maxCols) {
    if (r % 2 === 0) {
        // Even rows go left to right
        return (r * maxCols) + c;
    } else {
        // Odd rows go right to left
        return (r * maxCols) + (maxCols - 1 - c);
    }
}

// Gets row and col out of a step index for the snake path
function getPosFromStep(stepIndex, maxCols) {
    let r = Math.floor(stepIndex / maxCols);
    let c = stepIndex % maxCols;
    if (r % 2 !== 0) {
        c = maxCols - 1 - c;
    }
    return { r, c };
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

    // Dynamic speed based on whether we are at the edge of the row!
    let currentRevealSpeed = rowDuration / LOOM_COLS;
    if ((currentStep + 1) % LOOM_COLS === 0) {
        // If we are about to leave the end of the row, delay by the rowPause amount instead
        currentRevealSpeed = rowPause;
    }

    // Advance the global current step based on timer
    while (millis() - lastUpdate > currentRevealSpeed) {
        // Lock in the pattern permanently at this exact moment in the loom memory!
        let pos = getPosFromStep(currentStep, LOOM_COLS);
        let patternRow = pos.r % GRID_SIZE;
        let patternCol = pos.c % GRID_SIZE;
        loomData[pos.r][pos.c] = patternData[patternRow][patternCol];

        currentStep++;

        // Loop when the entire large blanket is finished
        if (currentStep >= LOOM_ROWS * LOOM_COLS) {
            currentStep = 0;
            // Erase loom memory to start fresh
            for (let r = 0; r < LOOM_ROWS; r++) {
                for (let c = 0; c < LOOM_COLS; c++) {
                    loomData[r][c] = '';
                }
            }
        }
        lastUpdate += currentRevealSpeed;

        // Recalculate inner loop speed in case we instantly wrapped a whole row
        if ((currentStep + 1) % LOOM_COLS === 0) {
            currentRevealSpeed = rowPause;
        } else {
            currentRevealSpeed = rowDuration / LOOM_COLS;
        }
    }

    // ------------------------------------------------------------
    // LEFT SIDE: The 16x16 Interactive Pattern Block (2/3 of screen)
    // ------------------------------------------------------------
    // The left grid loops its animation relative to 256 total steps constantly
    let patternCurrentStep = currentStep % (GRID_SIZE * GRID_SIZE);

    for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
            let x = leftStartX + (col * leftCellSize);
            let y = leftStartY + (row * leftCellSize);
            let stepIndex = getStepIndex(row, col, GRID_SIZE);

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
    // Calculate cell size to fit the massive dense blanket in 90% of the right width and height
    let rightCellSize = min((rightWidth * 0.9) / LOOM_COLS, (height * 0.9) / LOOM_ROWS);

    // Center it on the right
    let rightStartX = leftWidth + ((rightWidth - (LOOM_COLS * rightCellSize)) / 2);
    let rightStartY = (height - (LOOM_ROWS * rightCellSize)) / 2;

    for (let row = 0; row < LOOM_ROWS; row++) {
        for (let col = 0; col < LOOM_COLS; col++) {
            let x = rightStartX + (col * rightCellSize);
            let y = rightStartY + (row * rightCellSize);
            let stepIndex = getStepIndex(row, col, LOOM_COLS);

            let cellColor = null;

            // Determine Fill color based on the GLOBAL large loom state
            if (stepIndex < currentStep) {
                // Read from LOOM memory! (preserves history instead of strictly live updating)
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
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    positionUI();
}
