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
  animationElement = "";
  return animationElement;
}
function animateBulb() {
  //SET VALUE OF ANIMATIONELEMENT TO THE ANIMATION PATH/OBJECT YOU NEED TO USE
  animationElement =
    '<path class="yellow" class="st0" d="M572.1,240.1c-38.1,36.3-58,87.4-76.4,135.6"/>';
  ('<path class="blue" class="st1" d="M495.1,536.8c2.8,1.5,5.3,3.8,7.4,6.4c2.1,2.7,3.6,5.7,4.8,8.8c2.2,6.3,2.9,12.9,3.1,19.2s-0.3,12.5-0.4,18.5c-0.1,6-0.3,12,0.6,18.4c-4.1-5-6-11.6-7.1-17.9c-1.1-6.3-1.3-12.8-1.4-18.8c-0.1-6.2-0.3-12-1.1-17.8C500,548,498.3,542.4,495.1,536.8z"/>');
  ('<path class="blue" class="st1" d="M824.3,211.7c2.9,2.8,5.2,5.6,7.3,8.5c2.1,2.9,4.1,5.9,5.6,9.1c1.7,3.2,3.1,6.6,4.1,10.2c1,3.6,1.7,7.4,1.1,11.3c-2.8-2.8-5-5.6-7.1-8.5s-3.9-5.9-5.6-9.1c-1.7-3.2-3.1-6.6-4.2-10.1C824.6,219.4,823.9,215.8,824.3,211.7z"/>');
  ('<path class="blue" class="st1" d="M752.9,685.3c-1.4,3.1-3.2,5.6-5.3,7.7c-2.1,2.2-4.5,4.1-7.1,5.6c-2.7,1.5-5.6,2.7-8.8,3.1c-3.1,0.4-6.4,0.3-9.5-1c2.7-2.1,5-3.6,7.3-5.2c2.4-1.5,4.6-2.9,7-4.2c2.4-1.3,4.9-2.5,7.6-3.6S749.5,685.6,752.9,685.3z"/>');
  ('<path id="light_on_support_wires" class="wires" d="M720.6,608.2c8.3-77.3,5.9-157.1,16.1-233.3c18.2-1.3,37-7.8,47.6-25.2c11.2-66.3-56.3-23.7-46.2,23.8c-11.6,5.9-30.5-2.4-44.1-4.2L676.1,384c-0.1-4.2,3.8-4.9,6-7c32.4-17.2-12.9-67.8-43.4-51.7c-16.5,3.8-53.5,43.4-28.7,52.1c-21.9-47.4-60.4-13.2-46.1,27.6c26.2,73.1,67.4,143.5,65,224.2"/>');
  ('<path id="light_reflection_cable" class="wires" d="M672.9,870.2c-0.4,27.5,16.5,48.1,41.3,59.7c21.9,10.2,46.2,12.8,69.9,17.1c19.8,3.5,43.3,8.1,59.3,21.2c15.8,12.9,24.9,32.1,35.9,48.9c23.7,36.4,59.1,65.3,99.1,82.1c38.7,16.3,82,21.3,123.4,14.3"/>');
  ('<path id="light_reflection_bulb_bottom" class="st0" d="M684.9,723.8c81.5,31.9,11.2,63.9-53.8,63.9c-3.8,0-6.6,3.4-5.6,7c6.7,25.8,41.5,18.6,66.6,46.5"/>');

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
