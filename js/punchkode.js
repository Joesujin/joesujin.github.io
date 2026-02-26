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
const CLOTH_ROWS = 9;
const CLOTH_COLS = 6;
let clothData = []; // Stores integers 0-7 representing pattern indices

// UI elements for the palette
let pickers = [];
let hexInputs = [];
let colorPalette = ['#E2E8CE', '#262626', '#FF7F11']; // 3 available colors
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
let rightStartX = 0, rightStartY = 0, rightCellSize = 7.7;
let miniStartX = 0, miniStartY = 0, miniCellSize = 3;

// Track sliders for external updates
let threadLookSliders = {};

// --- MODULE LAYOUT CONFIGURATION ---
// Tweak these values to adjust the locations and sizes of modules on the 2160x1620 fixed screen
// Use 'anchorX' (left, right, center) and 'anchorY' (top, bottom, center) to anchor items.
// Provide 'x' and 'y' to offset the module from that anchor!
const LAYOUT = {
    editor: {
        anchorX: 'left', anchorY: 'top',
        x: 100,
        y: 100,
        cellSize: 45
    },
    patternBank: {
        anchorX: 'left', anchorY: 'bottom',
        x: 150,
        y: 400,
        buttonSize: 35,
        gap: 8
    },
    clothGrid: {
        anchorX: 'left', anchorY: 'bottom',
        x: 540,
        y: 360,
        cellSize: 35
    },
    colorPalette: {
        anchorX: 'left', anchorY: 'bottom',
        x: 150,
        y: 300
    },
    devSliders: {
        anchorX: 'left', anchorY: 'bottom',
        x: 150,
        y: 80
    },
    loom: {
        anchorX: 'right', anchorY: 'top',
        x: 400, // Shifted left to make room for mini loom
        y: 750
    },
    miniLoom: {
        anchorX: 'right', anchorY: 'top',
        x: 80, // from right edge
        y: 750,
        cellSize: 3
    },
    punchcards: {
        anchorX: 'right', anchorY: 'bottom',
        x: 450, //  from right edge
        y: 350, //  from bottom edge
        scale: 7
    }
};

let bankStartX = 0, bankStartY = 0, bankSize = 0;
let clothStartX = 0, clothStartY = 0, clothCellSize = 0;
let punchStartX = 0, punchStartY = 0;


let devUIContainer; // Global reference for scaling
let mainWrapper; // Wrapper div for scaling
let uiLayer; // Explicit overlay wrapper synced with canvas scale

let fontsLoaded = false;

function setup() {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'hidden';
    document.body.style.backgroundColor = '#151515';
    document.body.style.display = 'block';
    document.body.style.width = '100vw';
    document.body.style.height = '100vh';

    // The p5 canvas MUST be scaled directly rather than placed inside a scaled parent div.
    // Otherwise, p5's internal `mouseX` tracking completely desynchronizes from the DOM.
    canvas = createCanvas(2160, 1620); // Fixed resolution!
    canvas.class('punchkode-bg');
    canvas.style('position', 'absolute');
    canvas.style('transform-origin', 'top left');
    canvas.style('top', '0');
    canvas.style('left', '0');

    uiLayer = createDiv('');
    uiLayer.style('position', 'absolute');
    uiLayer.style('width', '2160px');
    uiLayer.style('height', '1620px');
    uiLayer.style('transform-origin', 'top left');
    uiLayer.style('pointer-events', 'none'); // Pass clicks to canvas below
    uiLayer.style('top', '0');
    uiLayer.style('left', '0');

    noStroke(0);

    lastUpdate = millis();

    // Prevent any drawing loop logic until the CSS variable font is 100% ready
    document.fonts.ready.then(() => {
        fontsLoaded = true;
    });

    // The target depth ('u' or 'd') assigned when a mouse drag begins
    window.dragTargetState = null;

    // Create 3 user-selectable color pickers and synced text inputs
    uiContainer = createDiv(''); // Keep a global reference to easily position it in windowResized
    uiContainer.parent(uiLayer);
    uiContainer.style('pointer-events', 'auto');

    // --- DEV SLIDERS ---
    devUIContainer = createDiv('');
    devUIContainer.parent(uiLayer);
    devUIContainer.style('pointer-events', 'auto');
    devUIContainer.style('display', 'flex');
    devUIContainer.style('flex-wrap', 'wrap');
    devUIContainer.style('width', '500px'); // 3x2 grid
    devUIContainer.style('gap', '25px');

    function createDevSlider(name, minVal, maxVal, stepVal, startVal, updateFn) {
        let s = createSlider(minVal, maxVal, startVal, stepVal);
        s.parent(devUIContainer);
        s.style('width', '140px'); // Fill enough space for 3 columns
        s.input(() => {
            updateFn(s.value());
        });
        threadLookSliders[name] = s;
    }

    createDevSlider('topThreadCenter', 0.1, 1.0, 0.01, topThreadCenter, v => topThreadCenter = v);
    createDevSlider('topThreadEdge', 0.1, 1.0, 0.01, topThreadEdge, v => topThreadEdge = v);
    createDevSlider('bottomThreadCenter', 0.1, 1.0, 0.01, bottomThreadCenter, v => bottomThreadCenter = v);
    createDevSlider('bottomThreadEdge', 0.1, 1.0, 0.01, bottomThreadEdge, v => bottomThreadEdge = v);
    createDevSlider('threadTaperEdge', 0.01, 1.0, 0.01, threadTaperEdge, v => threadTaperEdge = v);
    createDevSlider('threadTaperLength', 0.01, 0.9, 0.01, threadTaperLength, v => threadTaperLength = v);
    // ----------------------------------------------------------------
    uiContainer.style('display', 'flex');
    uiContainer.style('gap', '15px');

    for (let i = 0; i < 3; i++) {
        let group = createDiv('');
        group.parent(uiContainer);
        group.style('display', 'flex');

        let picker = createInput(colorPalette[i], 'color');
        picker.parent(group);
        picker.style('width', '45px');
        picker.style('height', '45px');
        picker.style('padding', '0');
        picker.style('border', 'none');

        let hexIn = createInput(colorPalette[i], 'text');
        hexIn.parent(group);
        hexIn.style('width', '100px');
        hexIn.style('height', '45px');
        hexIn.style('font-size', '18px');
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

    windowResized();

    // Attempt to load previously saved session (or fallback to defaults and save them)
    loadFromLocal();

    console.log("Punchkode Version 5: Synchronized Loom Editor Initialized!");
}

// Global UI container ref for resizing
let uiContainer;

function positionUI() {
    // Helper tool to automatically resolve anchors
    function resolvePos(config, w = 0, h = 0) {
        // Fallback to startX/startY fields for backwards compatibility with user's previous edits
        let px = config.x !== undefined ? config.x : (config.startX || 0);
        let py = config.y !== undefined ? config.y : (config.startY || 0);

        if (config.anchorX === 'right') px = 2160 - px - w;
        if (config.anchorX === 'center') px = 1080 - w / 2 + px;

        if (config.anchorY === 'bottom') py = 1620 - py - h;
        if (config.anchorY === 'center') py = 810 - h / 2 + py;

        return { x: px, y: py };
    }

    // 1. Editor Grid UI Setup
    leftCellSize = LAYOUT.editor.cellSize;
    let editorDim = GRID_SIZE * leftCellSize;
    let pEditor = resolvePos(LAYOUT.editor, editorDim, editorDim);
    leftStartX = pEditor.x;
    leftStartY = pEditor.y;

    // 2. Pattern Bank UI Setup
    bankSize = LAYOUT.patternBank.buttonSize;
    let bankW = 6 * bankSize + 5 * LAYOUT.patternBank.gap;
    let bankH = 5 * bankSize + 4 * LAYOUT.patternBank.gap;
    let pBank = resolvePos(LAYOUT.patternBank, bankW, bankH);
    bankStartX = pBank.x;
    bankStartY = pBank.y;

    // 3. Cloth Grid UI Setup
    clothCellSize = LAYOUT.clothGrid.cellSize;
    let clothW = CLOTH_COLS * clothCellSize;
    let clothH = CLOTH_ROWS * clothCellSize;
    let pCloth = resolvePos(LAYOUT.clothGrid, clothW, clothH);
    clothStartX = pCloth.x;
    clothStartY = pCloth.y;

    // 4. Color Palette Setup
    let pPal = resolvePos(LAYOUT.colorPalette, 280, 50); // Hardcoded approximate DOM dimension
    if (uiContainer) {
        uiContainer.style('position', 'absolute');
        uiContainer.style('left', pPal.x + 'px');
        uiContainer.style('top', pPal.y + 'px');
    }

    // Dev Sliders Setup
    let pSliders = resolvePos(LAYOUT.devSliders, 500, 100);
    LAYOUT.devSliders.resolvedX = pSliders.x; // store in LAYOUT to use in drawUI
    LAYOUT.devSliders.resolvedY = pSliders.y;
    if (devUIContainer) {
        devUIContainer.style('position', 'absolute');
        devUIContainer.style('left', pSliders.x + 'px');
        devUIContainer.style('top', pSliders.y + 'px');
    }

    // 5. Loom Setup
    let loomW = LOOM_COLS * rightCellSize;
    let pLoom = resolvePos(LAYOUT.loom, loomW, 1620);
    rightStartX = pLoom.x;
    rightStartY = pLoom.y;

    // 5b. Mini Loom Setup
    miniCellSize = LAYOUT.miniLoom.cellSize;
    let miniW = LOOM_COLS * miniCellSize;
    let pMini = resolvePos(LAYOUT.miniLoom, miniW, 1620);
    miniStartX = pMini.x;
    miniStartY = pMini.y;

    // 6. Punchcard layout
    punchCardConfig = { scale: LAYOUT.punchcards.scale };
    let cardW = 16 * 4.25 * LAYOUT.punchcards.scale;
    let cardH = 34 * LAYOUT.punchcards.scale;
    let pCards = resolvePos(LAYOUT.punchcards, cardW, cardH);
    punchStartX = pCards.x;
    punchStartY = pCards.y;
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
    // Check for [Copy], [Paste], [Reset] button clicks
    let btnY = bankStartY - 25;
    let copyX = bankStartX + 110;
    let pasteX = copyX + 50;
    let resetX = bankStartX + 210;
    let isInBtn = (bx) => mouseX >= bx && mouseX <= bx + 40 && mouseY >= btnY && mouseY <= btnY + 20;

    if (isInBtn(copyX)) {
        copiedPatternIndex = activePatternIndex;
        return;
    }

    if (isInBtn(pasteX)) {
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

    if (isInBtn(resetX)) {
        let p = patterns[activePatternIndex];
        for (let i = 0; i < GRID_SIZE; i++) {
            p.rowColors[i] = 0;
            p.colColors[i] = 1;
            for (let j = 0; j < GRID_SIZE; j++) {
                p.patternData[i][j] = 'u';
            }
        }
        saveToLocal();
        return;
    }

    // Check if clicked inside Pattern Bank
    let buttonsPerRow = 6;
    for (let i = 0; i < 26; i++) {
        let gridCol = i % buttonsPerRow;
        let gridRow = Math.floor(i / buttonsPerRow);
        let bx = bankStartX + gridCol * (bankSize + LAYOUT.patternBank.gap);
        let by = bankStartY + gridRow * (bankSize + LAYOUT.patternBank.gap);

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
    // Wait for Doto to be parsed by the browser cache so it does not fallback render onto canvas buffer
    if (!fontsLoaded) return;

    // Clear background
    background(21);

    // Draw the grid and UI elements
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
        // Safely bounds-check metaRow and metaCol to prevent 'undefined' crashes
        let metaRow = Math.floor(Math.abs(totalRowsWoven) / GRID_SIZE) % CLOTH_ROWS;
        let metaCol = Math.floor(c / GRID_SIZE) % CLOTH_COLS;
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

            let uiThickness = leftCellSize * 0.35; // Thinner color thread selector strips
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
    // RIGHT SIDE: The Tiled Loom Blanket
    // ------------------------------------------------------------

    push();

    // The active row is at `totalRowsWoven`. Its un-translated Y would be:
    let activeRowRawY = rightStartY + (totalRowsWoven * rightCellSize);

    // Camera shift guarantees that `activeRowRawY` is always visually at `rightStartY`
    // (This causes previously woven rows to scroll upwards!)
    let translateY = rightStartY - activeRowRawY;
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

    // Draw the UI panels first so the threads can lay on top of them
    drawUI();

    // Overlay the scrolling Jacquard Punchcards!
    // They are fully anchored to their own config settings and scale!
    drawPunchCards(punchStartX, punchStartY, LAYOUT.punchcards.scale, totalRowsWoven);

    // ------------------------------------------------------------
    // FAR RIGHT SIDE: The Compressed "Mini" Loom
    // ------------------------------------------------------------
    push();

    let miniTranslateY = miniStartY - (totalRowsWoven * miniCellSize);
    translate(0, miniTranslateY);

    for (let row = 0; row < loomData.length; row++) {
        let rawY = miniStartY + (row * miniCellSize);
        let visualY = rawY + miniTranslateY;

        // Optimize: Don't draw rows that are completely scrolled off screen
        if (visualY < -miniCellSize || visualY > height + miniCellSize) continue;

        for (let col = 0; col < LOOM_COLS; col++) {
            let x = miniStartX + (col * miniCellSize);
            let y = rawY;

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
                let cellMemory = loomData[row][col];
                if (!cellMemory || cellMemory === '' || cellMemory === 'empty') {
                    fill(20);
                    rect(x, y, miniCellSize, miniCellSize);
                    continue;
                }

                let depth = cellMemory.depth;
                let hColor = colorPalette[cellMemory.hColor];
                let vColor = colorPalette[cellMemory.vColor];

                // Background
                fill(20);
                rect(x, y, miniCellSize, miniCellSize);

                noStroke();
                // Simple solid rectangle mapping replacing the complex bezier tapered thread rendering
                if (depth === 'u') {
                    // Underneath: Vertical thread, On top: Horizontal thread
                    fill(hColor);
                    rect(x, y + 1, miniCellSize, miniCellSize - 1);
                } else {
                    // Underneath: Horizontal thread, On top: Vertical thread
                    fill(vColor);
                    rect(x + 1, y, miniCellSize - 1, miniCellSize);
                }
            } else {
                fill(20);
                rect(x, y, miniCellSize, miniCellSize);
            }
        }
    }

    pop();

    // Re-evaluate mouse pointer interactions every frame
    checkHoverState();
}

function checkHoverState() {
    let isHoveringHitbox = false;

    // 1. Check Copy & Paste & Reset Buttons
    let btnY = bankStartY - 25;
    let copyX = bankStartX + 110;
    let pasteX = copyX + 50;
    let resetX = bankStartX + 210;
    let isInBtn = (bx) => mouseX >= bx && mouseX <= bx + 40 && mouseY >= btnY && mouseY <= btnY + 20;

    if (isInBtn(copyX) || isInBtn(pasteX) || isInBtn(resetX)) {
        isHoveringHitbox = true;
    }

    // 2. Check Pattern Bank Grid
    let bxEnd = bankStartX + 6 * (bankSize + LAYOUT.patternBank.gap);
    let byEnd = bankStartY + 5 * (bankSize + LAYOUT.patternBank.gap);
    if (mouseX >= bankStartX && mouseX <= bxEnd && mouseY >= bankStartY && mouseY <= byEnd) isHoveringHitbox = true;

    // 3. Check Cloth Grid
    let cxEnd = clothStartX + CLOTH_COLS * clothCellSize;
    let cyEnd = clothStartY + CLOTH_ROWS * clothCellSize;
    if (mouseX >= clothStartX && mouseX <= cxEnd && mouseY >= clothStartY && mouseY <= cyEnd) isHoveringHitbox = true;

    // 4. Check Playable 16x16 Editor Bounds + flip UI Buttons (expanded borders)
    let editorWidth = (GRID_SIZE + 2) * leftCellSize;
    if (mouseX >= leftStartX && mouseX <= leftStartX + editorWidth &&
        mouseY >= leftStartY && mouseY <= leftStartY + editorWidth) {
        isHoveringHitbox = true;
    }

    if (isHoveringHitbox) {
        cursor(HAND);
    } else {
        cursor(ARROW);
    }
}

function drawUI() {
    // Top active pattern label
    fill(255);
    textSize(20);
    textAlign(LEFT, BASELINE);
    textFont('monospace');
    text(`Pattern [${String.fromCharCode(65 + activePatternIndex)}]`, leftStartX, leftStartY - 10);

    // 1. Draw Pattern Bank Buttons (A-Z in 6 cols)
    fill(255);
    textSize(16);
    textAlign(LEFT, BOTTOM);
    text("Pattern Bank", bankStartX, bankStartY - 10);

    // Draw Copy, Paste, Reset Buttons
    let btnY = bankStartY - 25;
    let copyX = bankStartX + 110;
    let pasteX = copyX + 50;
    let resetX = bankStartX + 210;

    fill(40); stroke('#555'); strokeWeight(1);
    rect(copyX, btnY, 40, 20, 4);
    rect(pasteX, btnY, 40, 20, 4);
    rect(resetX, btnY, 40, 20, 4);

    noStroke(); fill(200); textSize(11); textAlign(CENTER, CENTER);
    text("Copy", copyX + 20, btnY + 10);
    fill(copiedPatternIndex !== null ? 255 : 100);
    text("Paste", pasteX + 20, btnY + 10);
    fill(255);
    text("Clear pattern", resetX + 20, btnY + 10);

    // Erase the region to ensure p5.js completely flushes old thick strokes
    fill(21);
    noStroke();
    let pad = 10;
    rect(bankStartX - pad, bankStartY - pad, 6 * (bankSize + LAYOUT.patternBank.gap) + pad * 2, 5 * (bankSize + LAYOUT.patternBank.gap) + pad * 2);

    let buttonsPerRow = 6;

    // Pass 1: Draw ALL buttons with default unselected styles
    for (let i = 0; i < 26; i++) {
        let gridCol = i % buttonsPerRow;
        let gridRow = Math.floor(i / buttonsPerRow);
        let bx = bankStartX + gridCol * (bankSize + LAYOUT.patternBank.gap);
        let by = bankStartY + gridRow * (bankSize + LAYOUT.patternBank.gap);

        stroke('#555');
        strokeWeight(1);
        fill(40);
        rect(bx, by, bankSize, bankSize, 6);

        noStroke();
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(bankSize * 0.45);
        text(String.fromCharCode(65 + i), bx + bankSize / 2, by + bankSize / 2);
    }

    // Pass 2: Draw the highlights EXACTLY on top to prevent borders overlapping
    let draws = [];
    if (copiedPatternIndex !== null && copiedPatternIndex !== activePatternIndex) draws.push(copiedPatternIndex);
    draws.push(activePatternIndex);

    for (let j = 0; j < draws.length; j++) {
        let i = draws[j];
        if (i === null) continue;

        let gridCol = i % buttonsPerRow;
        let gridRow = Math.floor(i / buttonsPerRow);
        let bx = bankStartX + gridCol * (bankSize + LAYOUT.patternBank.gap);
        let by = bankStartY + gridRow * (bankSize + LAYOUT.patternBank.gap);

        let isActive = (i === activePatternIndex);
        let isCopied = (i === copiedPatternIndex);

        if (isActive && isCopied) {
            stroke('#fff');
            strokeWeight(3);
            fill(80);
            rect(bx, by, bankSize, bankSize, 6);
            stroke('#ffaa00');
            strokeWeight(2);
            noFill();
            rect(bx + 3, by + 3, bankSize - 6, bankSize - 6, 4);
        } else if (isActive) {
            stroke('#fff');
            strokeWeight(3);
            fill(80);
            rect(bx, by, bankSize, bankSize, 6);
        } else if (isCopied) {
            stroke('#ffaa00');
            strokeWeight(2);
            fill(60);
            rect(bx, by, bankSize, bankSize, 6);
        }

        noStroke();
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(bankSize * 0.45);
        text(String.fromCharCode(65 + i), bx + bankSize / 2, by + bankSize / 2);
    }

    // 2. Draw Cloth Layout Grid (6 cols x 9 rows)
    fill(21);
    noStroke();
    rect(clothStartX - pad, clothStartY - pad, CLOTH_COLS * clothCellSize + pad * 2, CLOTH_ROWS * clothCellSize + pad * 2);

    fill(255);
    textAlign(LEFT, BOTTOM);
    textSize(16);
    text("Cloth Layout", clothStartX, clothStartY - 10);

    // Pass 1: Draw standard Unselected cells
    for (let r = 0; r < CLOTH_ROWS; r++) {
        for (let c = 0; c < CLOTH_COLS; c++) {
            let patternIdx = clothData[r][c];

            if (patternIdx !== activePatternIndex) {
                let cx = clothStartX + c * clothCellSize;
                let cy = clothStartY + r * clothCellSize;
                stroke('#555');
                strokeWeight(1);
                fill(30);
                rect(cx, cy, clothCellSize, clothCellSize, 2);

                noStroke();
                fill('#ddd');
                textSize(12);
                textAlign(CENTER, CENTER);
                text(String.fromCharCode(65 + patternIdx), cx + clothCellSize / 2, cy + clothCellSize / 2);
            }
        }
    }

    // Pass 2: Draw Highlighted active cells layered on top
    for (let r = 0; r < CLOTH_ROWS; r++) {
        for (let c = 0; c < CLOTH_COLS; c++) {
            let patternIdx = clothData[r][c];

            if (patternIdx === activePatternIndex) {
                let cx = clothStartX + c * clothCellSize;
                let cy = clothStartY + r * clothCellSize;
                stroke('#fff');
                strokeWeight(2);
                fill(80);
                rect(cx, cy, clothCellSize, clothCellSize, 2);

                noStroke();
                fill('#ddd');
                textSize(12);
                textAlign(CENTER, CENTER);
                text(String.fromCharCode(65 + patternIdx), cx + clothCellSize / 2, cy + clothCellSize / 2);
            }
        }
    }

    // 3. Draw Hand-drawn "THREAD Loook" text above sliders
    push();
    translate(LAYOUT.devSliders.resolvedX, LAYOUT.devSliders.resolvedY - 40); // Align perfectly above resolved DOM sliders
    rotate(-0.05); // slight hand-drawn tilt
    textSize(34);
    fill(255);
    // Rough marker-style rendering
    textStyle(BOLD);
    text("THREAD Loook", 0, 0);

    // Draw little hand-drawn scribbles for the slider tracks just like the mockup
    strokeWeight(4);
    stroke(255);
    noFill();
    rotate(0.05); // counter rotate for lines to match horizontal DOM sliders closely
    bezier(0, 55, 30, 52, 60, 58, 140, 55);
    bezier(150, 55, 180, 52, 210, 58, 290, 55);
    bezier(0, 105, 30, 102, 60, 108, 140, 105);
    bezier(150, 105, 180, 102, 210, 108, 290, 105);
    pop();

    // 4. Draw Styled Logo "PUNCH KODE LOOM" in the center column
    push();

    noStroke();
    let leftEndX = leftStartX + (GRID_SIZE + 2) * leftCellSize - 200;
    let centerX = (leftEndX + rightStartX) / 2;
    let centerY = height / 2 + 200; // Positioned centrally in the vertical span
    fill(20);
    rect(centerX, centerY, 500, 1200)
    textAlign(LEFT, TOP);
    fill(255);
    noStroke();
    textFont("Doto");
    textSize(80);
    textLeading(75); // tight vertical spacing for stacked look
    text("punch\ncode\nloom", centerX, centerY);
    pop();



    // Draw Tribute Text
    push();
    noStroke();
    centerY = height / 2 + 450; // Positioned centrally in the vertical span

    textAlign(LEFT, TOP);
    fill(205);
    noStroke();
    textFont("Doto");
    textSize(40);
    textLeading(40); // tight vertical spacing for stacked look
    text("a tribute \nto the \nJacquard \nPunch Cards", centerX, centerY);
    pop();
}

function windowResized() {
    if (!canvas) return; // Prevent resizing before setup completes
    resizeCanvas(2160, 1620); // enforce canvas size

    let scaleX = windowWidth / 2160;
    let scaleY = windowHeight / 1620;
    let s = min(scaleX, scaleY);

    let scaledW = 2160 * s;
    let scaledH = 1620 * s;
    let offX = (windowWidth - scaledW) / 2;
    let offY = (windowHeight - scaledH) / 2;

    canvas.style('left', offX + 'px');
    canvas.style('top', offY + 'px');
    canvas.style('width', scaledW + 'px');
    canvas.style('height', scaledH + 'px');
    canvas.style('transform', 'none'); // Explicitly remove any transforms so p5.js calculates scrollWidth reliably

    // The HTML DOM inputs still need the affine scale since their internal coords are absolute 2160 math
    if (uiLayer) {
        uiLayer.style('transform', `scale(${s})`);
        uiLayer.style('left', offX + 'px');
        uiLayer.style('top', offY + 'px');
    }

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
        colorPalette: colorPalette,
        threadLook: {
            topThreadCenter: topThreadCenter,
            topThreadEdge: topThreadEdge,
            bottomThreadCenter: bottomThreadCenter,
            bottomThreadEdge: bottomThreadEdge,
            threadTaperEdge: threadTaperEdge,
            threadTaperLength: threadTaperLength
        }
    };
    localStorage.setItem('punchkode_v5', JSON.stringify(payload));
}

function loadFromData(data) {
    if (data.patterns && data.clothData) {
        // Deep copy to prevent modifying the default cached object directly
        patterns = JSON.parse(JSON.stringify(data.patterns));

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

        clothData = JSON.parse(JSON.stringify(data.clothData));

        // Backwards compatibility: pad rows and columns if older save only had smaller dimensions
        while (clothData.length < CLOTH_ROWS) {
            let emptyRow = [];
            for (let c = 0; c < CLOTH_COLS; c++) {
                emptyRow.push(0);
            }
            clothData.push(emptyRow);
        }

        for (let r = 0; r < clothData.length; r++) {
            while (clothData[r].length < CLOTH_COLS) {
                clothData[r].push(0);
            }
        }

        if (data.colorPalette) {
            colorPalette = JSON.parse(JSON.stringify(data.colorPalette));
            // Keep the HTML UI pickers in sync with the loaded palette
            for (let i = 0; i < 3; i++) {
                if (pickers[i]) pickers[i].value(colorPalette[i]);
                if (hexInputs[i]) hexInputs[i].value(colorPalette[i]);
            }
        }

        if (data.threadLook) {
            topThreadCenter = data.threadLook.topThreadCenter || topThreadCenter;
            topThreadEdge = data.threadLook.topThreadEdge || topThreadEdge;
            bottomThreadCenter = data.threadLook.bottomThreadCenter || bottomThreadCenter;
            bottomThreadEdge = data.threadLook.bottomThreadEdge || bottomThreadEdge;
            threadTaperEdge = data.threadLook.threadTaperEdge || threadTaperEdge;
            threadTaperLength = data.threadLook.threadTaperLength || threadTaperLength;

            // Sync the sliders
            for (let key in data.threadLook) {
                if (threadLookSliders[key]) {
                    threadLookSliders[key].value(data.threadLook[key]);
                }
            }
        }
    }
}

function loadFromLocal() {
    let saved = localStorage.getItem('punchkode_v5');
    if (saved) {
        try {
            let data = JSON.parse(saved);
            loadFromData(data);
        } catch (e) {
            console.error("Failed to load local storage session:", e);
        }
    } else if (typeof window.defaultSaveData !== "undefined" && window.defaultSaveData) {
        // If no local save exists yet, fall back to the defaults and IMMEDIATELY save it!
        loadFromData(window.defaultSaveData);
        saveToLocal();
    }
}

function drawPunchCards(startX, startY, cellSize, totalRowsWoven) {
    let cardW = 16 * cellSize; // Span 1 pattern (16 holes)
    let cardH = 4 * cellSize;
    let cardGap = Math.max(4, cellSize * 0.4); // Noticeable gap between physical cards

    // Lock the cards right below their anchored Y position
    let cardsStartY = startY;

    function getChainY(r) {
        return r * cellSize + Math.floor(r / 4) * cardGap;
    }

    let activeChainY = getChainY(totalRowsWoven);

    // We start from 1 card BEFORE the current one to ensure smooth scroll out of view
    let firstCard = Math.floor(totalRowsWoven / 4) - 1;
    if (firstCard < 0) firstCard = 0;

    // Helper to calculate the exact onscreen needle coordinate for the Loom's active row
    let loomY = rightStartY;

    // PASS 1: The 'Down' threads (Drawn UNDER the punch cards, connecting to the loom)
    let R = totalRowsWoven;
    let targetK = Math.floor(R / 4);
    let targetR = R % 4;
    let targetCardIndex = targetK - firstCard;

    if (targetCardIndex >= 0 && targetCardIndex < 6) {
        let cy = cardsStartY + getChainY(targetK * 4) - activeChainY;
        let metaRow = Math.floor(R / GRID_SIZE) % CLOTH_ROWS;
        let patternRow = R % GRID_SIZE;

        for (let metaCol = 0; metaCol < 6; metaCol++) {
            let cx = startX + (metaCol * 16 * cellSize);
            if (cx > 2160) continue;

            let patternIdx = clothData[metaRow][metaCol];
            let p = patterns[patternIdx];

            for (let patternCol = 0; patternCol < 16; patternCol++) {
                let depth = p.patternData[patternRow][patternCol];
                if (depth !== 'u') {
                    let holeX = cx + (patternCol * cellSize) + (cellSize / 2);
                    let holeY = cy + (targetR * cellSize) + (cellSize / 2);

                    let threadColIdx = p.colColors[patternCol];
                    let threadColor = color(colorPalette[threadColIdx]);
                    // Down threads are now solid
                    stroke(threadColor);
                    strokeWeight(3);
                    let loomX = rightStartX + (metaCol * 16 + patternCol) * rightCellSize + (rightCellSize / 2);

                    let offx = 10;
                    let offy = -190;
                    line(holeX, holeY, holeX + offx, holeY + offy);
                    line(holeX + offx, holeY + offy, loomX, loomY);

                    // Structural Bar (Horizontal)
                    stroke(200, 150);
                    strokeWeight(0.5);
                    line(holeX + offx, holeY + offy, holeX - 40, holeY + offy);

                    // Refined Bezier
                    noFill();
                    strokeWeight(3.5);
                    stroke(threadColor);
                    bezier(holeX, holeY, holeX - 100, holeY + 100, loomX, loomY + 400, loomX + 50, loomY + 800);
                }
            }
        }
    }

    // We use a clipping mask for the Cards so they cleanly hide as they feed "upwards" into the void
    drawingContext.save();
    drawingContext.beginPath();
    drawingContext.rect(0, startY - 140, width, height);
    drawingContext.clip();

    // PASS 2: Draw the cardboard backing
    for (let metaCol = 0; metaCol < 6; metaCol++) {
        let cx = startX + (metaCol * 16 * cellSize);
        if (cx > 2160) continue;
        for (let i = 0; i < 6; i++) {
            let K = firstCard + i;
            let cy = cardsStartY + getChainY(K * 4) - activeChainY;

            fill('#D2B48C');
            stroke('#A88D6A');
            strokeWeight(2);
            let hGap = cardGap;
            rect(cx + hGap / 2, cy, cardW - hGap, cardH, 4);
        }
    }

    // PASS 3: Draw the punched holes (dark voids)
    for (let metaCol = 0; metaCol < 6; metaCol++) {
        let cx = startX + (metaCol * 16 * cellSize);
        if (cx > 2160) continue;
        for (let i = 0; i < 6; i++) {
            let K = firstCard + i;
            let cy = cardsStartY + getChainY(K * 4) - activeChainY;

            noStroke();
            fill(20);

            for (let r = 0; r < 4; r++) {
                let R = K * 4 + r;
                let metaRow = Math.floor(R / GRID_SIZE) % CLOTH_ROWS;
                let patternRow = R % GRID_SIZE;

                let patternIdx = clothData[metaRow][metaCol];
                let p = patterns[patternIdx];

                for (let patternCol = 0; patternCol < 16; patternCol++) {
                    let depth = p.patternData[patternRow][patternCol];
                    if (depth === 'u') {
                        let holeX = cx + (patternCol * cellSize) + (cellSize / 2);
                        let holeY = cy + (r * cellSize) + (cellSize / 2);
                        circle(holeX, holeY, cellSize * 0.6);
                    }
                }
            }
        }
    }

    drawingContext.restore();

    // PASS 4: Extruded 'Up' thread lines coming OUT of the holes (Drawn OVER the punch cards & holes)
    if (targetCardIndex >= 0 && targetCardIndex < 6) {
        let cy = cardsStartY + getChainY(targetK * 4) - activeChainY;
        let metaRow = Math.floor(R / GRID_SIZE) % CLOTH_ROWS;
        let patternRow = R % GRID_SIZE;

        for (let metaCol = 0; metaCol < 6; metaCol++) {
            let cx = startX + (metaCol * 16 * cellSize);
            if (cx > 2160) continue;

            let patternIdx = clothData[metaRow][metaCol];
            let p = patterns[patternIdx];

            for (let patternCol = 0; patternCol < 16; patternCol++) {
                let depth = p.patternData[patternRow][patternCol];
                if (depth === 'u') {
                    let holeX = cx + (patternCol * cellSize) + (cellSize / 2);
                    let holeY = cy + (targetR * cellSize) + (cellSize / 2);
                    let threadColIdx = p.colColors[patternCol];
                    let threadColor = color(colorPalette[threadColIdx]);
                    threadColor.setAlpha(220); // Up threads are now softer opacity

                    let offx = -60;
                    let offy = -140;

                    // Structural Bar (Horizontal)
                    stroke(200, 150);
                    strokeWeight(0.5);
                    line(holeX + offx, holeY + offy, holeX + 40, holeY + offy);

                    // Restored Thread logic
                    stroke(threadColor);
                    strokeWeight(0.5);
                    let loomX = rightStartX + (metaCol * 16 + patternCol) * rightCellSize + (rightCellSize / 2);

                    line(holeX, holeY, holeX + offx, holeY + offy);
                    line(holeX + offx, holeY + offy, loomX, loomY + 10);
                }
            }
        }
    }
    // End of drawPunchCards
}
