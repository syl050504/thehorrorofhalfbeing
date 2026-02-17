const ferrisIcons = document.querySelectorAll('#circleContainer .icon');
const circleContainer = document.getElementById('circleContainer');
const sidebar = document.getElementById('sidebar');
const sidebarTitle = document.getElementById('sidebarTitle');

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
    animationId = requestAnimationFrame(animate);
});

function splitTextInHalf(text) {
    if (!text) return ["", ""];
    if (text.indexOf('|') !== -1) {
        const parts = text.split('|');
        return [parts[0].trim(), parts.slice(1).join('|').trim()];
    }
    const words = text.trim().split(/\s+/);
    if (words.length <= 8) {
        return [text.trim(), ''];
    }
    const half = Math.ceil(words.length / 2);
    const left = words.slice(0, half).join(' ');
    const right = words.slice(half).join(' ');
    return [left, right];
}

ferrisIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        cancelAnimationFrame(animationId);
        animationId = null;
    });

    icon.addEventListener('mouseleave', () => {
        cancelAnimationFrame(animationId);
        animationId = requestAnimationFrame(animate);
    });

    icon.addEventListener('click', () => {
        const title = icon.dataset.title || icon.getAttribute('data-title') || icon.getAttribute('title') || '';
        const full = icon.dataset.text || icon.getAttribute('data-text') || '';

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

        if (leftEl) {
            leftEl.innerHTML = left ? `
                <div class="original-content">
                    <div class="text-block">
                        <span class="source-label">Frankenstein</span>
                        <p>${left}</p>
                    </div>
                </div>
                <div class="hover-title">Frankenstein</div>
            ` : '';
        }

        if (rightEl) {
            rightEl.innerHTML = right ? `
                <div class="original-content">
                    <div class="text-block">
                        <span class="source-label">The Circular Ruins</span>
                        <p>${right}</p>
                    </div>
                </div>
                <div class="hover-title">The Circular Ruins</div>
            ` : '';
        }

        const overlay = document.getElementById('overlay');
        if (overlay) overlay.classList.add('visible');
        if (sidebar) sidebar.classList.add('open');
    });
});

function closeBothSidebars() {
    if (sidebar) sidebar.classList.remove('open');
    const overlay = document.getElementById('overlay');
    if (overlay) overlay.classList.remove('visible');
    cancelAnimationFrame(animationId);
    animationId = requestAnimationFrame(animate);
}

const overlay = document.getElementById('overlay');
if (overlay) overlay.addEventListener('click', closeBothSidebars);

// Hover functionality for columns
const leftEl = document.getElementById('colLeft');
const rightEl = document.getElementById('colRight');

if (leftEl) {
    leftEl.addEventListener('mouseenter', function () {
        this.classList.add('show-title');
    });

    leftEl.addEventListener('mouseleave', function () {
        this.classList.remove('show-title');
    });
}

if (rightEl) {
    rightEl.addEventListener('mouseenter', function () {
        this.classList.add('show-title');
    });

    rightEl.addEventListener('mouseleave', function () {
        this.classList.remove('show-title');
    });
}