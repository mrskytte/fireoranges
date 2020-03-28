import "@babel/polyfill";
import { tranformSVG } from "./tranformSVG";
("use strict");

window.addEventListener("DOMContentLoaded", init);

let parentSVG;
const SVGs = [];

let timelineSVG;
let kiteSVG;
let bulbSVG;
let cityscapeSVG;
let washingmachineSVG;
let carSVG;
let finalTimelineSVG;
let animations;

function init() {
  loadFrontpage();
  getSVGs();
  getAnimationSVGs();
}

async function getAnimationSVGs() {
  const response = await fetch("./animation-elements.json");
  animations = await response.json();
}

async function loadFrontpage() {
  const response = await fetch("./svg/frontpage.svg");
  const svg = await response.text();
  document.querySelector("#main-svg").innerHTML = svg;
  document
    .querySelector("#main-svg #buttonwrap")
    .addEventListener("click", start);
}

function getSVGs() {
  const SVGArray = async () => {
    const timelineSVG = getSVG("./svg/timeline.svg");
    const kiteSVG = getSVG("./svg/kite.svg");
    const bulbSVG = getSVG("./svg/bulb.svg");
    const cityscapeSVG = getSVG("./svg/cityscape.svg");
    const washingmachineSVG = getSVG("./svg/washingmachine.svg");
    const carSVG = getSVG("./svg/car.svg");
    const finalSVG = getSVG("./svg/final-timeline.svg");
    const array = await Promise.all([
      timelineSVG,
      kiteSVG,
      bulbSVG,
      cityscapeSVG,
      washingmachineSVG,
      carSVG,
      finalSVG
    ]);
    return array;
  };
  SVGArray().then(svgs => {
    svgs.forEach(svg => SVGs.push(svg));
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
  fourthCircle: false,
  fifthCircle: false
};

function start() {
  appendSVGs();
  drawInitialTimeline();
  prepareTimeline();
}

function appendSVGs() {
  for (let i = 1; i < 8; i++) {
    document.querySelector(`.container:nth-child(${i + 1})`).innerHTML =
      SVGs[i - 1];
  }
  timelineSVG = SVGs[0];
  kiteSVG = SVGs[1];
  bulbSVG = SVGs[2];
  cityscapeSVG = SVGs[3];
  washingmachineSVG = SVGs[4];
  carSVG = SVGs[5];
  finalTimelineSVG = SVGs[6];
}

function activateFinalState() {
  document.querySelector("#main-svg svg").classList.add("final-timeline");
  document.querySelector("body").classList.add("final");
  prepareTimeline();
  setTimeout(() => location.reload(), 10000);
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
    prepareEventListener("#fourth-circle", "washingmachine", washingmachineSVG);
  }
  if (activeButtons.fifthCircle) {
    prepareEventListener("#fifth-circle", "car", carSVG);
  }
}

function prepareEventListener(point, event, eventSVG) {
  document.querySelector(point).addEventListener("click", () => {
    tranformSVG(event, eventSVG, parentSVG);
    animateEvent(event);
    activateTimelineButton();
  });

  document.querySelector(point).addEventListener(
    "transitionend",
    () => {
      document.querySelector(point).classList.add("active");
    },
    100
  );
}

function activateTimelineButton() {
  const timelineButton = document.querySelector("#buttonwrap");
  timelineButton.addEventListener("click", () => {
    if (activeButtons.fifthCircle) {
      tranformSVG("final-timeline", finalTimelineSVG, parentSVG);
      activateFinalState();
    } else {
      animateEvent("timeline");
      tranformSVG("timeline", timelineSVG, parentSVG);
      if (activeButtons.fourthCircle) {
        activeButtons.fifthCircle = true;
      } else if (activeButtons.thirdCircle) {
        activeButtons.fourthCircle = true;
      } else if (activeButtons.secondCircle) {
        activeButtons.thirdCircle = true;
      } else if (activeButtons.firstCircle) {
        activeButtons.secondCircle = true;
      }
    }
    prepareTimeline();
  });
}

function animateEvent(event) {
  const animationSVG = document.querySelector("#animation-container");
  console.log(event);
  let animationElement = animations[event];
  animationSVG.innerHTML = animationElement;
}
