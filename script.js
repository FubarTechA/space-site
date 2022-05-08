"use strict";

const navBar = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav-links a");
// const explore = document.querySelector(".explore");
// const exploreBtn = explore.querySelector(".explore-btn");
const planetImg = document.querySelector(".planet-img");

const planetDiv = document.querySelector(".planet-div");
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

planetDiv.addEventListener("click", function (e) {
  const planet = e.target.closest(".planet");
  if (!planet) return;
  let number = planet.dataset.number;
  // console.log(number);
  // console.log(planetImg);
  const getData = async function () {
    const res = await fetch(myRequest);

    const data = await res.json();
    const planetInfo = data.destinations[number];
    let { png } = planetInfo.images;
    planetImg.setAttribute("src", png);
  };

  getData();
});

// console.log(number);
