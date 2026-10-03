```js
/* ==================================================
   1️⃣  Hide the loading overlay / modal backdrop
   2️⃣  Ensure it disappears after page load
   ================================================== */
(function () {
  // Utility to hide overlay elements once the page is ready
  const hideLoadingOverlay = () => {
    const overlays = document.querySelectorAll(
      '.loading-overlay, .loading-backdrop, .modal-backdrop'
    );
    overlays.forEach(el => {
      if (el) el.style.display = 'none';
    });
  };

  // 1. Hide overlay on DOMContentLoaded (prevents flicker)
  document.addEventListener('DOMContentLoaded', hideLoadingOverlay);

  // 2. Double‑check after window load (full assets loaded)
  window.addEventListener('load', () => {
    // Small timeout to allow any async operations to finish
    setTimeout(hideLoadingOverlay, 200);
  });

  /* ==================================================
     3️⃣  Optional: Add a quick fade‑out effect for the overlay
     ================================================== */
  const applyFadeOut = () => {
    const overlay = document.querySelector('.loading-overlay, .loading-backdrop, .modal-backdrop');
    if (!overlay) return;
    overlay.style.transition = 'opacity 0.5s ease-out';
    overlay.style.opacity = '0';
    setTimeout(() => {
      overlay.style.display = 'none';
    }, 500);
  };

  // Uncomment the line below if you prefer fade‑out over instant hide
  // window.addEventListener('load', applyFadeOut);

  /* ==================================================
     4️⃣  Prevent accidental horizontal scrolling on touch devices
     ================================================== */
  const preventHorizontalScroll = e => {
    if (e.deltaX !== 0) {
      e.preventDefault();
    }
  };
  window.addEventListener('wheel', preventHorizontalScroll, { passive: false });

  /* ==================================================
     5️⃣  Expose functions for debugging (optional)
     ================================================== */
  window.debug = {
    hideLoadingOverlay,
    applyFadeOut,
    preventHorizontalScroll
  };
})();
```