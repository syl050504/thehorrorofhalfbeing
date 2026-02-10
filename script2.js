document.addEventListener("click", function once() {
  // Remove listener so it only runs once
  document.removeEventListener("click", once);

  // Change image
  document.querySelector(".eye").src = "img/open.png";

  // Hide main texts
  document.querySelectorAll(".main-text").forEach(el => el.classList.add("hidden-space"));

  // Change background/text color
  document.body.classList.add("light");

  // Show dream text
  const dreamText = document.getElementById("dream-text");
  dreamText.innerHTML = `I closed not my eyes that night. <br><br>
Soon my mind was filled with <br> one thought, <br> one conception, <br> <a href="3.html">one purpose</a>`;
  dreamText.style.opacity = "1";

  // Scroll into view
  dreamText.scrollIntoView({ behavior: "smooth", block: "center" });
});
