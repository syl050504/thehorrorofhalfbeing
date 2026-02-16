const ferrisIcons = document.querySelectorAll('#circleContainer .icon');
const circleContainer = document.getElementById('circleContainer');
const sidebar = document.getElementById('sidebar');
const sidebarLeft = document.getElementById('sidebar-left');
const closeBtn = document.getElementById('closeBtn');
const closeBtnLeft = document.getElementById('closeBtnLeft');
const sidebarTitle = document.getElementById('sidebarTitle');
const sidebarText = document.getElementById('sidebarText');
const sidebarHover = document.getElementById('sidebarHover');

let angle = 0;
let animationId = null;
const radius = 320;

function placeIcons() {
    const total = ferrisIcons.length || 1;

    ferrisIcons.forEach((icon, i) => {
        const a = (360 / total) * i + angle;
        icon.style.transform = `rotate(${a}deg) translate(${radius}px) rotate(${-a}deg)`;
    });
}

function animate() {
    angle += 0.2;
    placeIcons();
    animationId = requestAnimationFrame(animate);
}

document.addEventListener('DOMContentLoaded', () => {
    placeIcons();
    requestAnimationFrame(animate);
});

// Helper: split a block of text into two roughly equal parts (by words)
function splitTextInHalf(text) {
    if (!text) return ["", ""];
    // prefer explicit '|' separator
    if (text.indexOf('|') !== -1) {
        const parts = text.split('|');
        return [parts[0].trim(), parts.slice(1).join('|').trim()];
    }
    const words = text.trim().split(/\s+/);
    if (words.length <= 8) {
        // short text, put all in left column
        return [text.trim(), ''];
    }
    const half = Math.ceil(words.length / 2);
    const left = words.slice(0, half).join(' ');
    const right = words.slice(half).join(' ');
    return [left, right];
}

// When an icon is clicked, populate the sidebar title and two columns
ferrisIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        // icons may have title in a title attribute or data-title; accept both
        const title = icon.dataset.title || icon.getAttribute('data-title') || icon.getAttribute('title') || '';
        const full = icon.dataset.text || icon.getAttribute('data-text') || '';
        const hover = icon.dataset.hover || icon.getAttribute('data-hover') || '';

        // first, check for a matching sidebar-item in the #sidebarData area
        let left = '';
        let right = '';
        const sidebarData = document.getElementById('sidebarData');
        if (sidebarData && title) {
            const item = sidebarData.querySelector(`.sidebar-item[data-key="${CSS.escape(title)}"]`);
            if (item) {
                const l = item.querySelector('.left');
                const r = item.querySelector('.right');
                left = l ? l.innerHTML.trim() : '';
                right = r ? r.innerHTML.trim() : '';
            }
        }

        // fallback to data attributes or splitting the data-text
        if (!left && !right) {
            left = icon.dataset.left || '';
            right = icon.dataset.right || '';
            if (!left && !right) {
                [left, right] = splitTextInHalf(full);
            }
        }

        if (sidebarTitle) sidebarTitle.textContent = title;
        const leftEl = document.getElementById('colLeft');
        const rightEl = document.getElementById('colRight');
        if (leftEl) leftEl.innerHTML = left ? `
        
<div class="text-block">
  <span class="source-label">Frankenstein</span>
  <p>${left}</p>
</div>
` : '';

if (rightEl) rightEl.innerHTML = right ? `
<div class="text-block">
  <span class="source-label">The Circular Ruins</span>
  <p>${right}</p>
</div>
` : '';


        // show overlay and sidebar
        const overlay = document.getElementById('overlay');
        if (overlay) overlay.classList.add('visible');
        if (sidebar) sidebar.classList.add('open');
    });
});

function closeBothSidebars() {
    if (sidebar) sidebar.classList.remove('open');
    const overlay = document.getElementById('overlay');
    if (overlay) overlay.classList.remove('visible');
    if (!animationId) requestAnimationFrame(animate);
}
 

// Close when overlay (background) is clicked
const overlay = document.getElementById('overlay');
if (overlay) overlay.addEventListener('click', closeBothSidebars);

// When opening the sidebar, show the overlay as well
// We want to keep the wheel visible behind overlay (overlay dims it)
const openSidebar = () => {
    if (sidebar) sidebar.classList.add('open');
    const overlay = document.getElementById('overlay');
    if (overlay) overlay.classList.add('visible');
};

// Note: sidebar is opened in the click handler above (which also populates columns).
