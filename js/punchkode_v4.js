let canvas;

// Core dimensions
const GRID_SIZE = 16;
const LOOM_PATTERN_COLS = 6; // 6 patterns wide
const START_PATTERN_ROWS = 9; // 9 patterns down (1 full cloth loop)
const MAX_PATTERN_ROWS = 45; // loop safely in multiples of 9

const LOOM_COLS = GRID_SIZE * LOOM_PATTERN_COLS;
const INITIAL_LOOM_ROWS = GRID_SIZE * START_PATTERN_ROWS;


// UI Elements Removed per user request

// True physical loom variables
// Editor Grid data & Pattern Banks
let patterns = []; // Array of 8 pattern objects: { patternData: [], colColors: [], rowColors: [] }
let activePatternIndex = 0; // Currently selected pattern
let copiedPatternIndex = null; // Currently copied pattern for pasting

// Cloth Composition Grid
const CLOTH_COLS = 6;
const CLOTH_ROWS = 9;
let clothData = []; // Stores integers 0-7 representing pattern indices

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

// --- UI Positioning Configuration ---
// Adjust these objects to anchor UI elements to different corners and set distances!
let patternBankConfig = {
    anchorX: 'left',   // 'left' or 'right'
    anchorY: 'bottom', // 'top' or 'bottom'
    offsetX: 50,       // Distance from the X anchor edge
    offsetY: 80,       // Distance from the Y anchor edge
    buttonSize: 15,
    gap: 5
};

let clothLayoutConfig = {
    anchorX: 'left',
    anchorY: 'bottom',
    offsetX: 500,      // Distance from the X anchor edge
    offsetY: 50,       // Distance from the Y anchor edge
    cellSize: 15
};

let editorGridConfig = {
    anchorX: 'left',
    anchorY: 'top',
    offsetX: 50,
    offsetY: 50,
    maxHeightPercent: 0.7 // How much of the screen height the grid is allowed to take up
};

let loomConfig = {
    anchorX: 'right',
    anchorY: 'top',
    offsetX: 100,
    offsetY: 0,
    widthPercent: 0.5,
    heightPercent: 1.0
};

let paletteConfig = {
    anchorX: 'left',
    anchorY: 'bottom',
    offsetX: 50,
    offsetY: 40
};
// ------------------------------------

let bankStartX = 0, bankStartY = 0, bankSize = 0;
let clothStartX = 0, clothStartY = 0, clothCellSize = 0;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.class('punchkode-bg');

    noStroke(0);

    lastUpdate = millis();

    // The target depth ('u' or 'd') assigned when a mouse drag begins
    window.dragTargetState = null;

    // Create 3 user-selectable color pickers and synced text inputs
    uiContainer = createDiv(''); // Keep a global reference to easily position it in windowResized

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

    // Initialize 26 pattern banks (A-Z)
    for (let p = 0; p < 26; p++) {
        let pData = {
            patternData: [],
            colColors: [],
            rowColors: []
        };
        for (let i = 0; i < GRID_SIZE; i++) {
            pData.rowColors.push(0); // Default color 0
            pData.colColors.push(1); // Default color 1

            let row = [];
            for (let j = 0; j < GRID_SIZE; j++) {
                row.push('u'); // Default depth 'u'
            }
            pData.patternData.push(row);
        }
        patterns.push(pData);
    }

    // Initialize Cloth Composition Grid (6x9)
    for (let r = 0; r < CLOTH_ROWS; r++) {
        let row = [];
        for (let c = 0; c < CLOTH_COLS; c++) {
            row.push(0); // Default to pattern A (index 0)
        }
        clothData.push(row);
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

    // Attempt to load previously saved session
    loadFromLocal();

    console.log("Punchkode Version 3: True Loom Editor Initialized!");
}

// Global UI container ref for resizing
let uiContainer;

function positionUI() {
    applyResponsiveLayout();

    // 1. Editor Grid UI Setup
    leftCellSize = min(
        ((width * (1.0 - loomConfig.widthPercent)) - (editorGridConfig.offsetX * 2)) / (GRID_SIZE + 2),
        (height * editorGridConfig.maxHeightPercent) / (GRID_SIZE + 2)
    );

    let editorWidth = (GRID_SIZE + 2) * leftCellSize;
    let editorHeight = (GRID_SIZE + 2) * leftCellSize;

    if (editorGridConfig.anchorX === 'left') {
        leftStartX = editorGridConfig.offsetX;
    } else {
        leftStartX = width - editorWidth - editorGridConfig.offsetX;
    }

    if (editorGridConfig.anchorY === 'top') {
        leftStartY = editorGridConfig.offsetY;
    } else {
        leftStartY = height - editorHeight - editorGridConfig.offsetY;
    }

    // 2. Pattern Bank UI Setup
    bankSize = patternBankConfig.buttonSize;
    let buttonsPerRow = width < 800 ? 6 : 6; // Fixed to 6 columns
    let numRows = Math.ceil(26 / buttonsPerRow);

    let bankWidth = buttonsPerRow * bankSize + (buttonsPerRow - 1) * patternBankConfig.gap;
    let bankHeight = numRows * bankSize + (numRows - 1) * patternBankConfig.gap;

    if (patternBankConfig.anchorX === 'left') {
        bankStartX = patternBankConfig.offsetX;
    } else {
        bankStartX = width - bankWidth - patternBankConfig.offsetX;
    }

    if (patternBankConfig.anchorY === 'top') {
        bankStartY = patternBankConfig.offsetY;
    } else {
        bankStartY = height - bankHeight - patternBankConfig.offsetY;
    }

    // 3. Cloth Grid UI Setup
    clothCellSize = clothLayoutConfig.cellSize;
    let clothWidth = CLOTH_COLS * clothCellSize;
    let clothHeight = CLOTH_ROWS * clothCellSize;

    if (clothLayoutConfig.anchorX === 'left') {
        clothStartX = clothLayoutConfig.offsetX;
    } else {
        clothStartX = width - clothWidth - clothLayoutConfig.offsetX;
    }

    if (clothLayoutConfig.anchorY === 'top') {
        clothStartY = clothLayoutConfig.offsetY;
    } else {
        clothStartY = height - clothHeight - clothLayoutConfig.offsetY;
    }

    // 4. Color Palette UI Setup
    if (uiContainer) {
        let px = paletteConfig.anchorX === 'left' ? paletteConfig.offsetX : (width - 350 - paletteConfig.offsetX);
        let py = paletteConfig.anchorY === 'top' ? paletteConfig.offsetY : (height - paletteConfig.offsetY);
        uiContainer.position(px, py);
    }
}

function applyResponsiveLayout() {
    let isPortrait = width < height || width < 800;

    // Default (Landscape/Desktop)
    editorGridConfig.anchorX = 'left';
    editorGridConfig.anchorY = 'top';
    editorGridConfig.offsetX = 50;
    editorGridConfig.offsetY = 50;
    editorGridConfig.maxHeightPercent = 0.7;

    loomConfig.anchorX = 'right';
    loomConfig.anchorY = 'top';
    loomConfig.offsetX = 100;
    loomConfig.offsetY = 0;
    loomConfig.widthPercent = 0.5;
    loomConfig.heightPercent = 1.0;

    clothLayoutConfig.anchorX = 'left';
    clothLayoutConfig.anchorY = 'bottom';
    clothLayoutConfig.offsetX = 500;
    clothLayoutConfig.offsetY = 50;
    clothLayoutConfig.cellSize = 15;

    paletteConfig.anchorX = 'left';
    paletteConfig.anchorY = 'bottom';
    paletteConfig.offsetX = 50;
    paletteConfig.offsetY = 40;

    if (isPortrait) {
        // Stacked vertically for Portrait / Mobile
        editorGridConfig.anchorX = 'left';
        editorGridConfig.anchorY = 'top';
        editorGridConfig.offsetX = 20;
        editorGridConfig.offsetY = 20;
        editorGridConfig.maxHeightPercent = 0.45;

        loomConfig.anchorX = 'left';
        loomConfig.anchorY = 'bottom';
        loomConfig.offsetX = 0;
        loomConfig.offsetY = 0;
        loomConfig.widthPercent = 1.0;
        loomConfig.heightPercent = 0.35;

        patternBankConfig.anchorX = 'left';
        patternBankConfig.anchorY = 'bottom';
        patternBankConfig.offsetX = 20;
        patternBankConfig.offsetY = height * 0.35 + 80;
        patternBankConfig.buttonSize = 25;
        patternBankConfig.gap = 8;

        clothLayoutConfig.anchorX = 'right';
        clothLayoutConfig.anchorY = 'bottom';
        clothLayoutConfig.offsetX = 20;
        clothLayoutConfig.offsetY = height * 0.35 + 80;
        clothLayoutConfig.cellSize = 12;

        paletteConfig.anchorX = 'left';
        paletteConfig.anchorY = 'bottom';
        paletteConfig.offsetX = 20;
        paletteConfig.offsetY = height * 0.35 + 20;
    }
}

function applyGridClick(col, row, isClick) {
    let p = patterns[activePatternIndex];

    // Only process UI margin clicks on a discrete click, not a drag
    if (isClick) {
        // Top row bounds checking for column UI clicks
        if (row === -1 && col >= 0 && col < GRID_SIZE) {
            p.colColors[col] = (p.colColors[col] + 1) % colorPalette.length;

            // Holding SHIFT while clicking flips the column uniformly for convenience
            if (keyIsDown(SHIFT)) {
                let targetState = (p.patternData[0][col] === 'u') ? 'd' : 'u';
                for (let r = 0; r < GRID_SIZE; r++) {
                    p.patternData[r][col] = targetState;
                }
            }
            return;
        }

        // Right col bounds checking for row UI clicks
        if (col === GRID_SIZE && row >= 0 && row < GRID_SIZE) {
            p.rowColors[row] = (p.rowColors[row] + 1) % colorPalette.length;

            // Holding SHIFT while clicking flips the row uniformly for convenience
            if (keyIsDown(SHIFT)) {
                let targetState = (p.patternData[row][0] === 'u') ? 'd' : 'u';
                for (let c = 0; c < GRID_SIZE; c++) {
                    p.patternData[row][c] = targetState;
                }
            }
            return;
        }

        // Left col bounds checking for row flip UI clicks
        if (col === -1 && row >= 0 && row < GRID_SIZE) {
            for (let c = 0; c < GRID_SIZE; c++) {
                p.patternData[row][c] = (p.patternData[row][c] === 'u') ? 'd' : 'u';
            }
            return;
        }

        // Bottom row bounds checking for col flip UI clicks
        if (row === GRID_SIZE && col >= 0 && col < GRID_SIZE) {
            for (let r = 0; r < GRID_SIZE; r++) {
                p.patternData[r][col] = (p.patternData[r][col] === 'u') ? 'd' : 'u';
            }
            return;
        }
    }

    // Playable 16x16 editor bounds
    if (col >= 0 && col < GRID_SIZE && row >= 0 && row < GRID_SIZE) {
        if (isClick && window.dragTargetState) {
            p.patternData[row][col] = window.dragTargetState;
        } else if (window.dragTargetState) {
            // Apply the dragged depth continuously
            p.patternData[row][col] = window.dragTargetState;
        }
    }
}

function mousePressed() {
    // Check for [Copy] button click
    let copyX = bankStartX + 110;
    let copyY = bankStartY - 25;
    if (mouseX >= copyX && mouseX <= copyX + 40 && mouseY >= copyY && mouseY <= copyY + 20) {
        copiedPatternIndex = activePatternIndex;
        return;
    }

    // Check for [Paste] button click
    let pasteX = copyX + 50;
    let pasteY = copyY;
    if (mouseX >= pasteX && mouseX <= pasteX + 40 && mouseY >= pasteY && mouseY <= pasteY + 20) {
        if (copiedPatternIndex !== null) {
            // Deep copy the state from copiedPatternIndex into activePatternIndex
            let sourceP = patterns[copiedPatternIndex];

            // We must deep clone the 2D array and 1D color arrays to prevent linking references!
            patterns[activePatternIndex] = {
                patternData: sourceP.patternData.map(row => [...row]),
                colColors: [...sourceP.colColors],
                rowColors: [...sourceP.rowColors]
            };

            saveToLocal();
        }
        return;
    }

    // Check if clicked inside Pattern Bank
    let buttonsPerRow = 6;
    for (let i = 0; i < 26; i++) {
        let gridCol = i % buttonsPerRow;
        let gridRow = Math.floor(i / buttonsPerRow);
        let bx = bankStartX + gridCol * (bankSize + patternBankConfig.gap);
        let by = bankStartY + gridRow * (bankSize + patternBankConfig.gap);

        if (mouseX >= bx && mouseX <= bx + bankSize && mouseY >= by && mouseY <= by + bankSize) {
            activePatternIndex = i;
            return;
        }
    }

    // Check if clicked inside Cloth Layout Grid
    for (let r = 0; r < CLOTH_ROWS; r++) {
        for (let c = 0; c < CLOTH_COLS; c++) {
            let cx = clothStartX + c * clothCellSize;
            let cy = clothStartY + r * clothCellSize;

            if (mouseX >= cx && mouseX <= cx + clothCellSize && mouseY >= cy && mouseY <= cy + clothCellSize) {
                clothData[r][c] = activePatternIndex;
                return;
            }
        }
    }

    // Check if clicked inside the color pickers or hex inputs (if so, ignore canvas click)
    // p5.js DOM elements usually handle this natively, but just to be safe.

    // We expand the click detection bounds slightly to grab the row= -1 and col= 16 UI bars!
    let expandedVisualStartX = leftStartX + leftCellSize; // the actual 16x16 starts offset by 1
    let expandedVisualStartY = leftStartY + leftCellSize; // because the UI row/col are at 0

    // Did they click literally anywhere near the Left side?
    if (mouseX >= leftStartX && mouseX < leftStartX + ((GRID_SIZE + 2) * leftCellSize) &&
        mouseY >= leftStartY && mouseY < leftStartY + ((GRID_SIZE + 2) * leftCellSize)) {

        // Because of the UI row/cols on the top and left, visual coordinates are offset
        let mappedCol = floor((mouseX - leftStartX) / leftCellSize) - 1;
        let mappedRow = floor((mouseY - leftStartY) / leftCellSize) - 1;

        // Determine what the target state for dragging should be BEFORE applying the click
        if (mappedCol >= 0 && mappedCol < GRID_SIZE && mappedRow >= 0 && mappedRow < GRID_SIZE) {
            let p = patterns[activePatternIndex];
            let currentDepth = p.patternData[mappedRow][mappedCol];
            window.dragTargetState = (currentDepth === 'u') ? 'd' : 'u';
        }

        applyGridClick(mappedCol, mappedRow, true);
    }
}

function mouseDragged() {
    // Check if dragging inside Cloth Layout Grid
    for (let r = 0; r < CLOTH_ROWS; r++) {
        for (let c = 0; c < CLOTH_COLS; c++) {
            let cx = clothStartX + c * clothCellSize;
            let cy = clothStartY + r * clothCellSize;

            if (mouseX >= cx && mouseX <= cx + clothCellSize && mouseY >= cy && mouseY <= cy + clothCellSize) {
                clothData[r][c] = activePatternIndex;
                return;
            }
        }
    }

    if (mouseX >= leftStartX && mouseX < leftStartX + ((GRID_SIZE + 2) * leftCellSize) &&
        mouseY >= leftStartY && mouseY < leftStartY + ((GRID_SIZE + 2) * leftCellSize)) {

        let mappedCol = floor((mouseX - leftStartX) / leftCellSize) - 1;
        let mappedRow = floor((mouseY - leftStartY) / leftCellSize) - 1;

        applyGridClick(mappedCol, mappedRow, false);
    }
}

function mouseReleased() {
    // Save progress anytime the mouse lets go
    saveToLocal();

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

            if (totalRowsWoven >= loomData.length) {
                // Add 1 full cloth worth of rows to preserve the pattern modulo!
                let rowsToAdd = GRID_SIZE * CLOTH_ROWS;
                for (let r = 0; r < rowsToAdd; r++) {
                    loomData.push(new Array(LOOM_COLS).fill(''));
                }

                // Enforce max memory without breaking modulo alignment
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

        // Determine which pattern bank applies to this macro-block in the Cloth grid
        let metaRow = Math.floor(totalRowsWoven / GRID_SIZE) % CLOTH_ROWS;
        let metaCol = Math.floor(c / GRID_SIZE);
        let activePatternIdxForLoom = clothData[metaRow][metaCol];
        let pLoom = patterns[activePatternIdxForLoom];

        // Immediately freeze the exact depth and thread colors for this cell permanently
        let vColor = pLoom.colColors[patternCol];
        let hColor = pLoom.rowColors[patternRowOffset];
        let depth = pLoom.patternData[patternRowOffset][patternCol];
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

    // Here we draw a 18x18 grid! 
    // The top row handles columns threads. 
    // The right col handles row threads.
    // The left col handles row flip buttons.
    // The bottom row handles col flip buttons.
    for (let row = -1; row <= GRID_SIZE; row++) {
        for (let col = -1; col <= GRID_SIZE; col++) {

            // Skip corner cells entirely
            if ((row === -1 && col === -1) ||
                (row === -1 && col === GRID_SIZE) ||
                (row === GRID_SIZE && col === -1) ||
                (row === GRID_SIZE && col === GRID_SIZE)) {
                continue;
            }

            let uiThickness = leftCellSize * 0.3;
            let centerOffset = (leftCellSize - uiThickness) / 2;
            let visualX = leftStartX + (col + 1) * leftCellSize;
            let visualY = leftStartY + (row + 1) * leftCellSize;

            let p = patterns[activePatternIndex];

            if (row === -1 && col >= 0 && col < GRID_SIZE) {
                // Top row UI (Column Colors)
                fill(colorPalette[p.colColors[col]]);
                rect(visualX + centerOffset, visualY, uiThickness, leftCellSize);
            } else if (col === GRID_SIZE && row >= 0 && row < GRID_SIZE) {
                // Right col UI (Row Colors)
                fill(colorPalette[p.rowColors[row]]);
                rect(visualX, visualY + centerOffset, leftCellSize, uiThickness);
            } else if (col === -1 && row >= 0 && row < GRID_SIZE) {
                // Left col UI (Row Flip Buttons)
                fill(40);
                stroke('#555');
                strokeWeight(1);
                rect(visualX + leftCellSize * 0.1, visualY + leftCellSize * 0.1, leftCellSize * 0.8, leftCellSize * 0.8, 6);

                noStroke();
                fill(150);
                textSize(leftCellSize * 0.4);
                textAlign(CENTER, CENTER);
                text("<>", visualX + leftCellSize / 2, visualY + leftCellSize / 2);
            } else if (row === GRID_SIZE && col >= 0 && col < GRID_SIZE) {
                // Bottom row UI (Col Flip Buttons)
                fill(40);
                stroke('#555');
                strokeWeight(1);
                rect(visualX + leftCellSize * 0.1, visualY + leftCellSize * 0.1, leftCellSize * 0.8, leftCellSize * 0.8, 6);

                noStroke();
                fill(150);
                textSize(leftCellSize * 0.4);
                textAlign(CENTER, CENTER);
                push();
                translate(visualX + leftCellSize / 2, visualY + leftCellSize / 2);
                rotate(PI / 2);
                text("<>", 0, 0);
                pop();
            } else if (col >= 0 && col < GRID_SIZE && row >= 0 && row < GRID_SIZE) {
                // Main Grid Cell
                fill(20);
                noStroke();
                rect(visualX, visualY, leftCellSize, leftCellSize);

                let depth = p.patternData[row][col];
                let hColor = colorPalette[p.rowColors[row]];
                let vColor = colorPalette[p.colColors[col]];

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
                rect(visualX, visualY, leftCellSize, leftCellSize);
                noStroke();
            }
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

    // Draw the UI panels
    drawUI();
}

function drawUI() {
    // Top active pattern label
    fill(255);
    textSize(24);
    textAlign(LEFT, BOTTOM);
    textFont('monospace');
    text("Pattern [" + String.fromCharCode(65 + activePatternIndex) + "]", leftStartX + leftCellSize, leftStartY - 15);

    // 1. Draw Pattern Bank Buttons (A-Z in 6 cols)
    fill(255);
    textSize(16);
    textAlign(LEFT, BOTTOM);
    text("Pattern Bank", bankStartX, bankStartY - 10);

    // Draw Copy Button
    let copyX = bankStartX + 110;
    let copyY = bankStartY - 25;
    fill(40); stroke('#555'); strokeWeight(1);
    rect(copyX, copyY, 40, 20, 4);
    noStroke(); fill(200); textSize(11); textAlign(CENTER, CENTER);
    text("Copy", copyX + 20, copyY + 10);

    // Draw Paste Button
    let pasteX = copyX + 50;
    let pasteY = copyY;
    fill(40); stroke('#555'); strokeWeight(1);
    rect(pasteX, pasteY, 40, 20, 4);
    noStroke(); fill(copiedPatternIndex !== null ? 255 : 100); textSize(11); textAlign(CENTER, CENTER);
    text("Paste", pasteX + 20, pasteY + 10);

    let buttonsPerRow = 6;
    for (let i = 0; i < 26; i++) {
        let gridCol = i % buttonsPerRow;
        let gridRow = Math.floor(i / buttonsPerRow);
        let bx = bankStartX + gridCol * (bankSize + patternBankConfig.gap);
        let by = bankStartY + gridRow * (bankSize + patternBankConfig.gap);

        if (i === activePatternIndex) {
            stroke('#fff');
            strokeWeight(3);
            fill(80);
        } else if (i === copiedPatternIndex) {
            stroke('#ffaa00');
            strokeWeight(2);
            fill(60);
        } else {
            stroke('#555');
            strokeWeight(1);
            fill(40);
        }
        rect(bx, by, bankSize, bankSize, 6); // rounded buttons

        noStroke();
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(bankSize * 0.45);
        text(String.fromCharCode(65 + i), bx + bankSize / 2, by + bankSize / 2);
    }

    // 2. Draw Cloth Layout Grid (6 cols x 9 rows)
    fill(255);
    textAlign(LEFT, BOTTOM);
    textSize(16);
    text("Cloth Layout", clothStartX, clothStartY - 10);

    for (let r = 0; r < CLOTH_ROWS; r++) {
        for (let c = 0; c < CLOTH_COLS; c++) {
            let cx = clothStartX + c * clothCellSize;
            let cy = clothStartY + r * clothCellSize;

            stroke('#555');
            strokeWeight(1);
            fill(30);
            rect(cx, cy, clothCellSize, clothCellSize, 2);

            let patternIdx = clothData[r][c];
            noStroke();
            fill('#ddd');
            textSize(12);
            textAlign(CENTER, CENTER);
            text(String.fromCharCode(65 + patternIdx), cx + clothCellSize / 2, cy + clothCellSize / 2);
        }
    }
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

function saveToLocal() {
    let payload = {
        patterns: patterns,
        clothData: clothData,
        colorPalette: colorPalette
    };
    localStorage.setItem('punchkode_v4', JSON.stringify(payload));
}

function loadFromLocal() {
    let saved = localStorage.getItem('punchkode_v4');
    if (saved) {
        try {
            let data = JSON.parse(saved);
            if (data.patterns && data.clothData) {
                patterns = data.patterns;

                // Backwards compatibility: If an old save file with only 8 patterns is loaded, 
                // expand the active memory array out to 26 so we don't crash when someone clicks 'I'
                while (patterns.length < 26) {
                    let pData = { patternData: [], colColors: [], rowColors: [] };
                    for (let i = 0; i < GRID_SIZE; i++) {
                        pData.rowColors.push(0);
                        pData.colColors.push(1);
                        let row = [];
                        for (let j = 0; j < GRID_SIZE; j++) {
                            row.push('u');
                        }
                        pData.patternData.push(row);
                    }
                    patterns.push(pData);
                }

                clothData = data.clothData;

                if (data.colorPalette) {
                    colorPalette = data.colorPalette;
                    // Keep the HTML UI pickers in sync with the loaded palette
                    for (let i = 0; i < 3; i++) {
                        if (pickers[i]) pickers[i].value(colorPalette[i]);
                        if (hexInputs[i]) hexInputs[i].value(colorPalette[i]);
                    }
                }
            }
        } catch (e) {
            console.error("Failed to load local storage session:", e);
        }
    }
}
