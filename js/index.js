const toggle = document.getElementById("toggleDark");
const body = document.body;
const favicon = document.getElementById("favicon");

function updateFavicon(isLight) {
  favicon.href = isLight ? "pics/pfp.png" : "pics/yt.png";
}

toggle.addEventListener("change", () => {
  body.classList.toggle("light-theme");
  localStorage.setItem("theme", body.classList.contains("light-theme") ? "light" : "dark");
});

window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    body.classList.add("light-theme");
    toggle.checked = true;
  }
});

const roles = ["UI DESIGNER", "ENGINEER", "VIDEOGRAPHER"];
let currentRole = 0;
let currentText = '';
let isDeleting = false;
const speed = 100;
const typeTarget = document.getElementById("typewriter");

function typeEffect() {
  const fullText = roles[currentRole];

  if (isDeleting) {
    currentText = fullText.substring(0, currentText.length - 1);
  } else {
    currentText = fullText.substring(0, currentText.length + 1);
  }

  typeTarget.textContent = currentText;

  if (!isDeleting && currentText === fullText) {
    setTimeout(() => isDeleting = true, 1000);
  } else if (isDeleting && currentText === '') {
    isDeleting = false;
    currentRole = (currentRole + 1) % roles.length;
  }

  setTimeout(typeEffect, isDeleting ? speed / 2 : speed);
}
const track = document.querySelector('.carousel-track');
const cards = Array.from(document.querySelectorAll('.project-card'));
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

let currentIndex = 0;

function updateCarousel() {
  cards.forEach((card, i) => {
    card.classList.remove('active');
  });

  cards[currentIndex].classList.add('active');

  const cardWidth = cards[0].offsetWidth + 32; 
  const visibleWidth = track.offsetWidth;
  const totalWidth = cardWidth * cards.length;

  const offset = (visibleWidth / 2) - (cardWidth / 2);
  const maxOffset = totalWidth - visibleWidth;

  let translateX = Math.min(cardWidth * currentIndex, maxOffset);
  track.style.transform = `translateX(${offset - translateX}px)`;
}

nextBtn.addEventListener('click', () => {
  if (currentIndex < cards.length - 1) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }
  updateCarousel();
});

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = cards.length - 1;
  }
  updateCarousel();
});

setInterval(() => {
  currentIndex = (currentIndex + 1) % cards.length;
  updateCarousel();
}, 10000);

window.addEventListener('resize', updateCarousel);

updateCarousel();
typeEffect();
