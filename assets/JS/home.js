"use strict";
//////////////////////////////
// element variables
const btnRightSlider = document.querySelector(".slider__btn--right");
const btnLeftSlider = document.querySelector(".slider__btn--left");
const slides = document.querySelectorAll(".hero__slide");
const hero = document.querySelector(".hero");

//////////////////////////////
// slider
const maxSlide = slides.length;
let curSlide = 1;
let slideInterval;

const nextSlide = function () {
  slides.forEach((slide) => {
    slide.classList.remove("hero__slide--active");
  });

  if (curSlide === slides.length) curSlide = 1;
  else curSlide++;

  document
    .querySelector(`.hero__slide--${curSlide}`)
    .classList.add("hero__slide--active");
};

const prevSlide = function () {
  slides.forEach((slide) => {
    slide.classList.remove("hero__slide--active");
  });

  if (curSlide === 1) curSlide = maxSlide;
  else curSlide--;

  document
    .querySelector(`.hero__slide--${curSlide}`)
    .classList.add("hero__slide--active");
};

btnRightSlider.addEventListener("click", nextSlide);

btnLeftSlider.addEventListener("click", prevSlide);

const startSlideInterval = () => (slideInterval = setInterval(nextSlide, 5000));

const stopSlideInterval = () => clearInterval(slideInterval);

hero.addEventListener("mouseenter", stopSlideInterval);
hero.addEventListener("mouseleave", startSlideInterval);
