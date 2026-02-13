document.addEventListener("click", function once() {
  document.removeEventListener("click", once);
  document.querySelector(".eye").src = "img/open.png";
  document.querySelectorAll(".main-text").forEach(el => el.classList.add("hidden-space"));
  document.body.classList.add("light");

  const dreamText = document.getElementById("dream-text");
  dreamText.innerHTML = `I closed not my eyes that night. <br><br>
Soon my mind was filled with <br> one thought, <br> one conception, <br> <a href="3.html">one purpose</a>`;
  dreamText.style.opacity = "1";

  dreamText.scrollIntoView({ behavior: "smooth", block: "center" });
});
