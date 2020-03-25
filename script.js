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
  secondCircle: true,
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
  //SET VALUE OF ANIMATION ELEMENT TO THE ANIMATION PATH / OBJECT YOU NEED TO USE
  animationElement = "";
  return animationElement;
}

function animateBulb() {
  //SET VALUE OF ANIMATION ELEMENT TO THE ANIMATION PATH / OBJECT YOU NEED TO USE
  animationElement = "";
  return animationElement;
}

function animateCityscape() {
  //SET VALUE OF ANIMATION ELEMENT TO THE ANIMATION PATH/OBJECT YOU NEED TO USE
  var animationElement = '<path id="yellow-line" class="st0" d="M69.9,873.1c33.4-1,77.9,2.8,98.8,31.7c0.3,0.5,0.8,0.9,1.3,1.4l0,0c1,0.8,1.9,2,2.3,3.3c9.3,29.6-13.1,63.2-40.4,75.8c-4.5,2.1-9.5,3-14.4,2.2c-28.5-4.4,3.8-49.4,18.7-60.8c25.3-22.3,60-30,92.4-35.3c46-5.9,92.7-5.6,139-2.7c28.8,1.9,53.9-19.1,57.5-47.7c5.5-44.3,1.3-101,66.1-115.4c37.7,2.7,42.8-72.1,70-64.3c3.8,1,6.9,4,8.5,7.4c8.3,17.4,22,27.4,42.3,28.1c61.5,12.6,38.2,8.1,70.9-25.1c2.4-2.6,5.8-4.2,9.3-4.8c46.8-7,53.3-37.3,75.7-71c31.8-19.1,43.2,12.1,68.6,19.1c70.9,15.7,94.6-29.1,94.7-92.9c-1.4-47.4,51.8-61.6,67.4-100c17.1-60.3,17.5-124.2,22.9-185.5l0,0l4.3,42.4l0,0c14.9,20.6,7.8,51.5,23.9,72.3c1.2,1.5,2.4,2.8,3.7,4.2c18.6,18.9,21.7,42.5,22.2,67.2c0.2,13.5,4.1,26.7,11.4,38.1c34.9,54.9,44.9,32.1,48.7,141.3c3.6,19.4-2.2,44.7,11.6,60.3c36,46.7,24.8,117.4,40.1,173.3c6.5,24.5,57.2,75.4,58,23.2c14.8-46.6,52.6-80.4,47.8-134.8c91.9-229.5,161,35.7,188.5-151.6c1.3-9.1,12-13.2,19.1-7.7l0,0c2.7,2.1,4.4,5.2,4.5,8.7c5.8,109.6,189.9,28.6,208.6,142.8c48.7,132.3-14.2,161.6,163.8,185.4l125.5,35c-36.1-120.5,161.4-109,7-0.6l1.7,3.5c77.6,20.7,155.4-55.1,225.5-83.7"/>';

  return animationElement;
}

function animateCar() {
  //SET VALUE OF ANIMATION ELEMENT TO THE ANIMATION PATH/OBJECT YOU NEED TO USE
  animationElement = "";
  return animationElement;
}