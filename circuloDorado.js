// JavaScript para controlar el slider

let slides = document.querySelectorAll(".slide");
let currentIndex = 0;
slides[currentIndex].classList.add("active");

document.getElementById("prev").addEventListener("click", function () {
  slides[currentIndex].classList.remove("active");
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  slides[currentIndex].classList.add("active");
});

document.getElementById("next").addEventListener("click", function () {
  slides[currentIndex].classList.remove("active");
  currentIndex = (currentIndex + 1) % slides.length;
  slides[currentIndex].classList.add("active");
});
