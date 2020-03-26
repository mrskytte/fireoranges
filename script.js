import "@babel/polyfill";
import { tranformSVG } from "./tranformSVG";
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

    const array = await Promise.all([timelineSVG, kiteSVG, bulbSVG, cityscapeSVG, carSVG]);
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
    document.querySelector(`.container:nth-child(${i + 1})`).innerHTML = SVGs[i - 1];
  }
  timelineSVG = SVGs[0];
  kiteSVG = SVGs[1];
  bulbSVG = SVGs[2];
  cityscapeSVG = SVGs[3];
  carSVG = SVGs[4];
}

function drawInitialTimeline() {
  document.querySelector("#main-svg").innerHTML = document.querySelector("#timeline-container").innerHTML;
  parentSVG = document.querySelector("#main-svg svg");
  parentSVG.setAttribute("id", "primarySVG");
  setTimeout(() => {
    parentSVG.classList.add("active");
    document.querySelector("#main-svg svg #outline").addEventListener("transitionend", () => {
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
  let animationElement;
  if (event === "timeline") {
    animationElement = animateTimeline;
  }
  if (event === "kite") {
    animationElement = animateKite;
  }
  if (event === "bulb") {
    animationElement = animateBulb;
  }
  if (event === "cityscape") {
    animationElement = animateCityscape;
  }
  if (event === "car") {
    animationElement = animateCar;
  }
  animationSVG.innerHTML = animationElement;
}

function animateKite() {
  //SET VALUE OF ANIMATIONELEMENT TO THE ANIMATION PATH/OBJECT YOU NEED TO USE
  animationElement =
    '<path class="blue-path" id="_two_" data-name="&lt;two&gt;" d="M495,131c-25.41,30.92-181.54,179.94-245.61,214.41C197.21,373.49,134.66,376.09,99,355.81c-38.66-22-57-89-27.52-133.76a77.25,77.25,0,0,1,107-22,61.81,61.81,0,0,1,17.62,85.61,49.45,49.45,0,0,1-68.49,14.09,39.55,39.55,0,0,1-11.27-54.79,31.65,31.65,0,0,1,43.83-9A25.32,25.32,0,0,1,167.37,271a20.25,20.25,0,0,1-28.05,5.77c-6.21-4.09-7.73-13.79-4.62-22.44" transform="translate(-55.4 -130.05)" fill="none" stroke="#1225ff" stroke-miterlimit="10" stroke-width="5"/><path class="blue-path" id="_one_" data-name="&lt;one&gt;" d="M91.5,554.5c45-6.09,203.79-42.09,283.69-21.28,65.06,16.95,118.6,50.26,132.61,94.67,15.19,48.11-21.35,118-80.4,132.48a87.68,87.68,0,0,1-106-64.33,70.13,70.13,0,0,1,51.47-84.79,56.1,56.1,0,0,1,67.82,41.17,44.88,44.88,0,0,1-32.93,54.26,35.9,35.9,0,0,1-43.41-26.34,28.73,28.73,0,0,1,21.08-34.73,23,23,0,0,1,27.78,16.86c2,8.2-4.22,17.44-13.49,22.23" transform="translate(-55.4 -130.05)" fill="none" stroke="#1225ff" stroke-miterlimit="10" stroke-width="5"/><path class="blue-path" id="_one_2" data-name="&lt;one&gt;" d="M480.37,288.81c43.26-5.85,195.89-40.46,272.68-20.45,62.54,16.29,114,48.3,127.47,91C895.11,405.6,860,472.8,803.23,486.68a84.26,84.26,0,0,1-101.87-61.83,67.41,67.41,0,0,1,49.47-81.49A53.92,53.92,0,0,1,816,382.93a43.14,43.14,0,0,1-31.65,52.16,34.52,34.52,0,0,1-41.73-25.33,27.61,27.61,0,0,1,20.26-33.38,22.08,22.08,0,0,1,26.7,16.21c1.93,7.88-4.05,16.76-13,21.36" transform="translate(-55.4 -130.05)" fill="none" stroke="#1225ff" stroke-miterlimit="10" stroke-width="5"/>';
  return animationElement;
}
function animateBulb() {
  //SET VALUE OF ANIMATIONELEMENT TO THE ANIMATION PATH/OBJECT YOU NEED TO USE
  animationElement = "";
  return animationElement;
}
function animateCityscape() {
  //SET VALUE OF ANIMATIONELEMENT TO THE ANIMATION PATH/OBJECT YOU NEED TO USE
  animationElement = "";
  return animationElement;
}
function animateCar() {
  //SET VALUE OF ANIMATIONELEMENT TO THE ANIMATION PATH/OBJECT YOU NEED TO USE
  animationElement = "";
  return animationElement;
}
