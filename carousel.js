const prev_desktop = document.getElementsByClassName("prev")[0];
const prev_mobile = document.getElementsByClassName("prev")[1];
const next_desktop = document.getElementsByClassName("next")[0];
const next_mobile = document.getElementsByClassName("next")[1];
const carousel = document.querySelector(".carousel");
const card = document.querySelector(".card-partners");
const track = document.querySelector(".list-card-partners");
let width = card.offsetWidth;
let index = 0;
window.addEventListener("resize", function () {
  width = card.offsetWidth;
});

const debounce = (func, delay) => {
  let debounceTimer;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};

prev_mobile.disabled = true;
prev_desktop.disabled = true;
const onNext = debounce((gap, itemsInRow) => {
  index = index + 1;
  prev_mobile.disabled = false;
  prev_desktop.disabled = false;
  track.style.transform = `translateX(${index * -width - gap * index}px)`;
  if (carousel.scrollWidth <= (itemsInRow + 1) * width + itemsInRow * gap) {
    next_mobile.disabled = true;
    next_desktop.disabled = true;
  }
}, 200);
const onPrev = debounce((gap) => {
  next_mobile.disabled = false;
  next_desktop.disabled = false;
  index = index - 1;
  if (index === 0) {
    prev_mobile.disabled = true;
    prev_desktop.disabled = true;
  }
  track.style.transform = `translateX(${index * -width - gap * index}px)`;
}, 200);
