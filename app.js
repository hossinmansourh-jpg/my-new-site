// Firebase configuration (replace with your own config)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// DOM Elements
const canvas = document.getElementById('wallCanvas');
const ctx = canvas.getContext('2d');
const bookingModal = document.getElementById('bookingModal');
const bookingForm = document.getElementById('bookingForm');
const langBtn = document.getElementById('langBtn');
const zoomInBtn = document.getElementById('zoomInBtn');
const zoomOutBtn = document.getElementById('zoomOutBtn');
const selectionBtn = document.getElementById('selectionBtn');

// Canvas state
let scale = 1;
let offsetX = 0;
let offsetY = 0;
let isPanning = false;
let lastX, lastY;

// Grid constants
const GRID_SIZE = 10000; // 1000 * 10
const BOX_SIZE = 10;
const TOTAL_BOXES = 1000000;

// Render visible grid
function renderGrid() {
    ctx.save();
    ctx.setTransform(scale, 0, 0, scale, offsetX, offsetY);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#555'; // placeholder color for unbooked boxes

    // Draw only visible boxes (lazy rendering)
    const startX = Math.max(0, Math.floor(-offsetX / (scale * BOX_SIZE)));