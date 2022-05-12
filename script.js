"use strict";

const navBar = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav-links a");
const closeBtn = document.querySelector(".close");
const hamburgerBtn = document.querySelector(".hamburger");

// FUNCTION TO DISPLAY AND HIDE THE SIDE MENU ON SMALLER SCREENS
hamburgerBtn.addEventListener("click", function () {
  navBar.classList.add("show");
});

closeBtn.addEventListener("click", function () {
  navBar.classList.remove("show");
});

// CREATING THE HOVER EFFECTS ON THE NAVLINKS
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

// navLinks.forEach((link) => {
//   link.addEventListener("click", function (e) {
//     link.closest(".nav-links").classList.add("active");
//   });
// });

// FETCHING THE JSON FILE
const myInit = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  mode: "cors",
  cache: "default",
};

let myRequest = new Request("./data.json");

// ASYNC FUNCTION THAT RETURNS THE DATA.JSON FILE
const getData = async function () {
  const res = await fetch(myRequest);

  const data = await res.json();
  return data;
};

// FUNCTION FOR THE INDEX.HTML PAGE
const indexFunc = function () {
  const explore = document.querySelector(".explore");
  const exploreBtn = explore.querySelector(".explore-btn");

  // HIDING AND DISPLAYING THE EXPLORE BUTTON ANIMATION
  exploreBtn.addEventListener("mouseover", function () {
    explore.classList.add("active");
  });

  exploreBtn.addEventListener("mouseout", function () {
    explore.classList.remove("active");
  });
};

// indexFunc();

// FUNCTION FOR THE DESTINATION PAGE
const destinationFunction = function () {
  const planetDiv = document.querySelector(".planet-div");
  const planetImg = document.querySelector(".planet-img");
  const planetName = document.querySelector(".planet-name");
  const planetDistance = document.querySelector(".planet-distance");
  const planetTravelTime = document.querySelector(".planet-travel-time");
  const planetInformation = document.querySelector(".info");

  // HOVER EVECTS FOR THE PLANETS
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

  // FUNCTION TO DISPLAY DESTINATION INFO BASED ON PLANET CLICKED
  planetDiv.addEventListener("click", function (e) {
    const planet = e.target.closest(".planet");
    if (!planet) return;
    const siblings = planet.closest(".planet-div").querySelectorAll(".planet");
    if (!siblings) return;
    // ADDING THE ACTIVE CLASS TO THE CLICKED
    planet.classList.add("active");
    // REMOVING THE ACTIVE CLASS FROM SIBLINGS OF THE CLICKED
    siblings.forEach((sib) => {
      if (sib !== planet) {
        sib.classList.remove("active");
      }
    });

    const { number } = planet.dataset;

    // CHANGING THE TEXTCONTENT AND IMAGE OF PLANET BASED ON CLICKED
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

// FUNCTION FOR CREW.HTML PAGE
const crewFunc = async function () {
  const dotContainer = document.querySelector(".crew-slide-dot");
  const CrewImageContainer = document.querySelector(".crew-image");
  const crewRole = document.querySelector(".crew-role");
  const crewBio = document.querySelector(".crew-bio");
  const crewName = document.querySelector(".crew-name");

  // ADDING THE HOVER AND ACTIVE STATES AND CHANGING INFO BAESED ON CLICKED
  dotContainer.addEventListener("click", function (e) {
    const dot = e.target.closest(".dot");
    if (!dot) return;

    // ADDING THE ACTIVE CLASS TO THE CLICKED
    dot.classList.add("active");
    const siblings = dot.closest(".crew-slide-dot").querySelectorAll(".dot");
    if (!siblings) return;

    // REMOVING THE ACTIVE CLASS FROM ALL SIBLINGS OF CLICKED
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
  const dot = document.querySelectorAll(".dot");
  // console.log(dot);
  dot.forEach((dot) => {
    if (dot.dataset.number === "0") {
      dot.classList.add("active");
      console.log(dot);
    }
  });
  console.log(slides);

  goToSlide(slides, 0);
  const dots = document.querySelectorAll(".dot");

  dots.forEach((dot) => {
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

crewFunc();

const techFunc = function () {
  const options = document.querySelectorAll(".option");
  const techName = document.querySelector(".tech-name");
  const techNote = document.querySelector(".tech-note");
  const techImg = document.querySelector(".tech-img img");

  if (screen.width < 912) {
    techImg.setAttribute(
      "src",
      "/assets/technology/image-launch-vehicle-landscape.jpg"
    );
  }
  if (screen.width > 912) {
    techImg.setAttribute(
      "src",
      "/assets/technology/image-launch-vehicle-portrait.jpg"
    );
  }

  options.forEach((opt) => {
    opt.addEventListener("mouseover", function () {
      opt.classList.add("hover");
    });
  });

  options.forEach((opt) => {
    opt.addEventListener("mouseout", function () {
      opt.classList.remove("hover");
    });
  });

  options.forEach((opt) => {
    opt.addEventListener("click", function () {
      const siblings = opt.closest(".tech-opt").querySelectorAll(".option");
      siblings.forEach((sib) => {
        if (sib !== opt) sib.classList.remove("active");
      });

      opt.classList.add("active");
      const { num } = opt.dataset;

      const techAsync = async function () {
        const data = await getData();
        const tech = data.technology[num];
        console.log(tech);
        let { description } = tech;
        let { name } = tech;
        let { images } = tech;
        // console.log(techImg.getAttribute("src").split("/").pop().split("-"));
        console.log(images.portrait);
        console.log(screen.width);
        if (screen.width < 912) {
          techImg.setAttribute("src", images.landscape);
        } else {
          techImg.setAttribute("src", images.portrait);
        }

        techName.textContent = name;
        techNote.textContent = description;
        // let;
      };

      techAsync();
    });
  });
};

// techFunc();
