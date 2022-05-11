"use strict";

const navBar = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav-links a");
const closeBtn = document.querySelector(".close");
const hamburgerBtn = document.querySelector(".hamburger");
// const explore = document.querySelector(".explore");
// const exploreBtn = explore.querySelector(".explore-btn");
// console.log(planets[0].dataset);

// adding the hover effects on the links

hamburgerBtn.addEventListener("click", function () {
  navBar.classList.add("show");
});

closeBtn.addEventListener("click", function () {
  navBar.classList.remove("show");
});

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

const getData = async function () {
  const res = await fetch(myRequest);

  const data = await res.json();
  return data;
};

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

const crewFunc = async function () {
  const dotContainer = document.querySelector(".crew-slide-dot");
  const CrewImageContainer = document.querySelector(".crew-image");
  const crewRole = document.querySelector(".crew-role");
  const crewBio = document.querySelector(".crew-bio");
  const crewName = document.querySelector(".crew-name");

  dotContainer.addEventListener("click", function (e) {
    const dot = e.target.closest(".dot");
    if (!dot) return;
    dot.classList.add("active");
    const siblings = dot.closest(".crew-slide-dot").querySelectorAll(".dot");
    if (!siblings) return;
    siblings.forEach((sib) => {
      if (sib !== dot) sib.classList.remove("active");
    });
  });

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

  const goToSlide = function (slides, slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const data = await getData();
  let images = data.crew.map((crew) => crew.images.png);
  console.log(data.crew);
  images.forEach((img, i) => {
    CrewImageContainer.insertAdjacentHTML(
      "beforeend",
      `<img
    class="slides"
    src=${img}
    alt=""
  />`
    );
  });
  const slides = document.querySelectorAll(".slides");
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<div class="dot" data-number="${i}"></div>`
    );
  });
  console.log(slides);

  goToSlide(slides, 0);
  const dots = document.querySelectorAll(".dot");
  // console.log(dots);
  dots.forEach((dot, i) => {
    // console.log();
    dot.addEventListener("click", function () {
      let number = dot.dataset.number;
      goToSlide(slides, number);
      const crewMember = data.crew[number];
      const { role } = crewMember;
      const { bio } = crewMember;
      const { name } = crewMember;

      crewBio.textContent = bio;
      crewName.textContent = name;
      crewRole.textContent = role;
    });
  });
};

// crewFunc();
