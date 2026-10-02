```js
// Hide the loading overlay once the page (including images) has fully loaded
window.addEventListener('load', () => {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.style.display = 'none';
    }

    // Optional: Initialize canvas or other heavy components after load
    const canvas = document.getElementById('mosaicCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        // Example: draw a placeholder background
        ctx.fillStyle = '#555';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
});

// Simple modal toggle for demonstration
const modal = document.getElementById('exampleModal');
const closeBtn = document.getElementById('closeModal');
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        if (modal) modal.style.display = 'none';
    });
}
```