"use strict";

const navBar = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav-links a");
const slides = document.querySelectorAll(".slides");
const dotContainer = document.querySelector(".crew-slide-dot");
// const explore = document.querySelector(".explore");
// const exploreBtn = explore.querySelector(".explore-btn");
// console.log(planets[0].dataset);

// adding the hover effects on the links
// console.log(navLinks);

navLinks.forEach((link) => {
  link.addEventListener("mouseover", function () {
    link.closest(".nav-links").classList.add("hover");
  });
});

navLinks.forEach((link) => {
  link.addEventListener("mouseout", function () {
    link.closest(".nav-links").classList.remove("hover");
  });
});

navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    link.closest(".nav-links").classList.add("active");
    // e.preventDefault();
    // const siblings = link.closest(".nav").querySelectorAll(".nav-links");
    // siblings.forEach((sib) => {
    //   if (sib === link) return;
    //   sib.classList.remove("active");
    // });
  });
});

// planets.forEach((planet) => console.log(planet));

// exploreBtn.addEventListener("mouseover", function () {
//   explore.classList.add("active");
// });

// exploreBtn.addEventListener("mouseout", function () {
//   explore.classList.remove("active");
// });

const myInit = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  mode: "cors",
  cache: "default",
};

let myRequest = new Request("./data.json");

// const getData = async function () {
//   const res = await fetch(myRequest);
//   // console.log(res);

//   const data = await res.json();
//   console.log(data);
// };

// getData();

// let number = undefined;

const getData = async function () {
  const res = await fetch(myRequest);

  const data = await res.json();
  return data;
};

// console.log(number);

const destinationFunction = function () {
  const planetDiv = document.querySelector(".planet-div");
  const planetImg = document.querySelector(".planet-img");
  const planetName = document.querySelector(".planet-name");
  const planetDistance = document.querySelector(".planet-distance");
  const planetTravelTime = document.querySelector(".planet-travel-time");
  const planetInformation = document.querySelector(".info");

  planetDiv.addEventListener("mouseover", function (e) {
    const planet = e.target.closest(".planet");
    if (!planet) return;
    planet.classList.add("hover");
  });

  planetDiv.addEventListener("mouseout", function (e) {
    const planet = e.target.closest(".planet");
    if (!planet) return;
    planet.classList.remove("hover");
  });

  planetDiv.addEventListener("click", function (e) {
    const planet = e.target.closest(".planet");
    if (!planet) return;
    const siblings = planet.closest(".planet-div").querySelectorAll(".planet");
    if (!siblings) return;
    planet.classList.add("active");
    siblings.forEach((sib) => {
      if (sib !== planet) {
        sib.classList.remove("active");
      }
    });

    const { number } = planet.dataset;

    const planetFunc = async function () {
      const data = await getData();
      const planetInfo = data.destinations[number];
      const { png } = planetInfo.images;
      const { name } = planetInfo;
      const { description } = planetInfo;
      const { distance } = planetInfo;
      const { travel } = planetInfo;
      planetImg.setAttribute("src", png);
      planetName.textContent = name;
      planetInformation.textContent = description;
      planetDistance.textContent = distance;
      planetTravelTime.textContent = travel;
    };
    planetFunc();
  });
};

// destinationFunction();

dotContainer.addEventListener("mouseover", function (e) {
  const dot = e.target.closest(".dot");
  if (!dot) return;
  dot.classList.add("hover");
});

dotContainer.addEventListener("mouseout", function (e) {
  const dot = e.target.closest(".dot");
  if (!dot) return;
  dot.classList.remove("hover");
});

slides.forEach(function (_, i) {
  dotContainer.insertAdjacentHTML("beforeend", '<div class="dot"></div>');
});

const goToSlide = function (slide) {
  slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));
};

goToSlide();
