```js
// ==== Constants ====
const GRID_SIZE = 1000;          // 1000 × 1000 squares
const CELL_SIZE = 50;            // 50px per cell
const CANVAS_SIZE = GRID_SIZE * CELL_SIZE; // 50,000px
const INERTIA_FRICTION = 0.95;   // 0.95 per frame
const LONG_PRESS_DURATION = 600; // ms

// ==== DOM Elements ====
const canvas = document.getElementById('gridCanvas');
const ctx = canvas.getContext('2d');
const zoomInBtn = document.getElementById('zoomInBtn');
const zoomOutBtn = document.getElementById('zoomOutBtn');
const panBtn = document.getElementById('panBtn');
const selectBtn = document.getElementById('selectBtn');
const infoModal = document.getElementById('infoModal');
const ownerInfo = document.getElementById('ownerInfo');
const closeInfo = document.getElementById('closeInfo');
const bookingForm = document.getElementById('bookingForm');
const closeBooking = document.getElementById('closeBooking');
const selectedCount = document.getElementById('selectedCount');
const confirmBooking = document.getElementById('confirmBooking');

// ==== State ====
let scale = 1;                   // current zoom
let offsetX = 0, offsetY = 0;   // pan offset
let isPanning = false;           // pan mode
let isSelecting = false;         // selection mode
let selectionRect = null;        // {x, y, w, h}
let lastMousePos = null;
let velocity = {x:0, y:0};
let animationFrame = null;

// ==== Helper Functions ====
function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function getTransformMatrix() {
    return ctx.setTransform(scale, 0, 0, scale, offsetX, offsetY);
}

function screenToWorld(x, y) {
    const rect = canvas.getBoundingClientRect();
    const wx = (x - rect.left - offsetX) / scale;
    const wy = (y - rect.top - offsetY) / scale;
    return {x: wx, y: wy};
}

function worldToScreen(x, y) {
    return {
        x: x * scale + offsetX + canvas.getBoundingClientRect().left,
        y: y * scale + offsetY + canvas.getBoundingClientRect().top
    };
}

function getCellAt(x, y) {
    const col = Math.floor(x / CELL_SIZE);
    const row = Math.floor(y / CELL_SIZE);
    if (col < 0 || row < 0 || col >= GRID_SIZE || row >= GRID_SIZE) return null;
    return {col, row};
}

function cellId(col, row) {
    return `${col}_${row}`;
}

// ==== Rendering ====
function render() {
    getTransformMatrix();
    ctx.clearRect(-offsetX/scale, -offsetY/scale, canvas.width/scale, canvas.height/scale);

    // Determine visible area in world coords
    const {left, top} = screenToWorld(0, 0);
    const {right, bottom} = screenToWorld(canvas.width, canvas.height);
    const startCol = clamp(Math.floor(left / CELL_SIZE), 0, GRID_SIZE);
    const endCol = clamp(Math.ceil(right / CELL_SIZE), 0, GRID_SIZE);
    const startRow = clamp(Math.floor(top / CELL_SIZE), 0, GRID_SIZE);
    const endRow = clamp(Math.ceil(bottom / CELL_SIZE), 0, GRID_SIZE);

    // Draw grid lines (only visible cells)
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 0.5;

    for (let col = startCol; col <= endCol; col++) {
        const x = col * CELL_SIZE;
        ctx.beginPath();
        ctx.moveTo(x, startRow * CELL_SIZE);
        ctx.lineTo(x, endRow * CELL_SIZE);
        ctx.stroke();
    }

    for (let row = startRow; row <= endRow; row++) {
        const y