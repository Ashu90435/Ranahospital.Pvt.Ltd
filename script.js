document.addEventListener("DOMContentLoaded", function () {
  const slides = Array.from(document.querySelectorAll(".slide"));
  const dots = Array.from(document.querySelectorAll(".dot"));
  const slider = document.getElementById("heroSlider");
  const prev = document.querySelector(".slider-arrow.prev");
  const next = document.querySelector(".slider-arrow.next");

  if (!slides.length) return;

  let current = 0;
  let timer = null;

  function showSlide(index) {
    current = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === current);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === current);
    });
  }

  function nextSlide() {
    showSlide(current + 1);
  }

  function previousSlide() {
    showSlide(current - 1);
  }

  function startAutoPlay() {
    stopAutoPlay();
    timer = setInterval(nextSlide, 4500);
  }

  function stopAutoPlay() {
    if (timer !== null) {
      clearInterval(timer);
      timer = null;
    }
  }

  if (next) {
    next.addEventListener("click", function () {
      nextSlide();
      startAutoPlay();
    });
  }

  if (prev) {
    prev.addEventListener("click", function () {
      previousSlide();
      startAutoPlay();
    });
  }

  dots.forEach((dot, i) => {
    dot.addEventListener("click", function () {
      showSlide(i);
      startAutoPlay();
    });
  });

  if (slider) {
    slider.addEventListener("mouseenter", stopAutoPlay);
    slider.addEventListener("mouseleave", startAutoPlay);
  }

  showSlide(0);
  startAutoPlay();
});
