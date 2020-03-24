import "@babel/polyfill";
import {
  tranformSVG
} from "./tranformSVG";
("use strict");

window.addEventListener("DOMContentLoaded", getSVGs);

let parentSVG;
const SVGs = [];

let timelineSVG;
let kiteSVG;
let bulbSVG;
let cityscapeSVG;
let carSVG;

function getSVGs() {
  const SVGArray = async () => {
    const timelineSVG = getSVG("./svg/timeline.svg");
    const kiteSVG = getSVG("./svg/kite.svg");
    const bulbSVG = getSVG("./svg/bulb.svg");
    const cityscapeSVG = getSVG("./svg/cityscape.svg");
    const carSVG = getSVG("./svg/car.svg");

    const array = await Promise.all([
      timelineSVG,
      kiteSVG,
      bulbSVG,
      cityscapeSVG,
      carSVG
    ]);
    return array;
  };
  SVGArray().then(svgs => {
    svgs.forEach(svg => SVGs.push(svg));
    init();
  });
}
async function getSVG(url) {
  const response = await fetch(url);
  const SVG = await response.text();
  return SVG;
}

const activeButtons = {
  firstCircle: true,
  secondCircle: false,
  thirdCircle: false,
  fourthCircle: false
};

function init() {
  appendSVGs();
  drawInitialTimeline();
  prepareTimeline();
}

function appendSVGs() {
  for (let i = 1; i < 6; i++) {
    document.querySelector(`.container:nth-child(${i + 1})`).innerHTML =
      SVGs[i - 1];
  }
  timelineSVG = SVGs[0];
  kiteSVG = SVGs[1];
  bulbSVG = SVGs[2];
  cityscapeSVG = SVGs[3];
  carSVG = SVGs[4];
}

function drawInitialTimeline() {
  document.querySelector("#main-svg").innerHTML = document.querySelector(
    "#timeline-container"
  ).innerHTML;
  parentSVG = document.querySelector("#main-svg svg");
  parentSVG.setAttribute("id", "primarySVG");
  setTimeout(() => {
    parentSVG.classList.add("active");
    document
      .querySelector("#main-svg svg #outline")
      .addEventListener("transitionend", () => {
        document.querySelector("#first-circle").classList.add("active");
      });
  }, 100);
  document.querySelector("#timeline-btn").addEventListener("click", () => {
    console.log(parentSVG);
    tranformSVG("timeline", timelineSVG, parentSVG);
    if (activeButtons.thirdCircle) {
      console.log("called");
      activeButtons.fourthCircle = true;
    } else if (activeButtons.secondCircle) {
      console.log("called");
      activeButtons.thirdCircle = true;
    } else if (activeButtons.firstCircle) {
      console.log("called");
      activeButtons.secondCircle = true;
    }
    prepareTimeline();
  });
}

function prepareTimeline() {
  if (activeButtons.firstCircle) {
    prepareEventListener("#first-circle", "kite", kiteSVG);
  }
  if (activeButtons.secondCircle) {
    prepareEventListener("#second-circle", "bulb", bulbSVG);
  }
  if (activeButtons.thirdCircle) {
    prepareEventListener("#third-circle", "cityscape", cityscapeSVG);
  }
  if (activeButtons.fourthCircle) {
    prepareEventListener("#fourth-circle", "car", carSVG);
  }
}

function prepareEventListener(point, event, eventSVG) {
  document.querySelector(point).addEventListener("click", () => {
    tranformSVG(event, eventSVG, parentSVG);
    animateEvent(event);
  });

  document.querySelector(point).addEventListener(
    "transitionend",
    () => {
      document.querySelector(point).classList.add("active");
    },
    100
  );
}

function animateEvent(event) {
  const animationSVG = document.querySelector("#animation-container");

  if (event === "kite") {
    const animationElement = animateKite;
  }
  if (event === "bulb") {
    const animationElement = animateBulb;
  }
  if (event === "cityscape") {
    const animationElement = animateCityscape;
  }
  if (event === "car") {
    const animationElement = animateCar;
  }

  animationSVG.innerHTML = animationElement;
}

function animateKite() {
  //SET VALUE OF ANIMATION ELEMENT TO THE ANIMATION PATH/OBJECT YOU NEED TO USE
  animationElement = "";
  return animationElement;
}

function animateBulb() {
  //SET VALUE OF ANIMATION ELEMENT TO THE ANIMATION PATH/OBJECT YOU NEED TO USE
  animationElement = "";
  return animationElement;
}

function animateCityscape() {
  //SET VALUE OF ANIMATION ELEMENT TO THE ANIMATION PATH/OBJECT YOU NEED TO USE
  animationElement = "";
  return animationElement;
}

function animateCar() {
  //SET VALUE OF ANIMATION ELEMENT TO THE ANIMATION PATH/OBJECT YOU NEED TO USE
  animationElement = "";
  return animationElement;
}