const grid = document.querySelector('.icongrid');
const gridIcons = document.querySelectorAll('.icongrid .icon');
const ferrisIcons = document.querySelectorAll('#circleContainer .icon');
const circleContainer = document.getElementById('circleContainer');
const sidebar = document.getElementById('sidebar');
const closeBtn = document.getElementById('closeBtn');
const sidebarTitle = document.getElementById('sidebarTitle');
const sidebarText = document.getElementById('sidebarText');
const sidebarHover = document.getElementById('sidebarHover');


let angle = 0;
let animationId;
const radius = 320;

/* Place icons around circle */
function placeIcons() {
  const total = ferrisIcons.length;

  ferrisIcons.forEach((icon, i) => {
    const a = (360 / total) * i + angle;
    icon.style.transform =
      `rotate(${a}deg) translate(${radius}px) rotate(${-a}deg)`;
  });
}

/* Animate */
function animate() {
  angle += 0.2;
  placeIcons();
  animationId = requestAnimationFrame(animate);
}

gridIcons.forEach(icon => {
  icon.addEventListener('click', () => {
    document.querySelector('.icongrid').style.display = 'none';
    circleContainer.style.display = 'block';
    sidebar.classList.add('open');

    sidebarTitle.textContent = icon.dataset.title || '';

    // main text
    sidebarText.textContent = icon.dataset.text || '';

    // hover text (for now, duplicate or replace later)
    sidebarHover.textContent = icon.dataset.hover || icon.dataset.text || '';

    animate();
  });
});


/* Close sidebar */
closeBtn.addEventListener('click', () => {
  sidebar.classList.remove('open');
  circleContainer.style.display = 'none';
  // remove the inline display override so the stylesheet's layout (flex) applies
  grid.style.display = '';

  cancelAnimationFrame(animationId);
  angle = 0;
});
