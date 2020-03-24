import "@babel/polyfill";
import { morphSVG } from "./morph";
import { svg, interpolateInferno, transition } from "d3";
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

function init() {
  appendSVGs();
  drawInitialTimeline();
  prepareEventListener("#first-circle", tranformSVG, "kite", kiteSVG);
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
  setTimeout(() => parentSVG.classList.add("active"), 100);
}

function prepareEventListener(point, callback, event, eventSVG) {
  document
    .querySelector(point)
    .addEventListener("click", () => callback(event, eventSVG));
  document
    .querySelector("#main-svg svg #outline")
    .addEventListener("transitionend", () => {
      document.querySelector(point).classList.add("active");
    });
}

document.querySelector("#timeline-btn").addEventListener("click", () => {
  tranformSVG("timeline", timelineSVG);
});
document.querySelector("#kite-btn").addEventListener("click", () => {
  tranformSVG("kite", kiteSVG);
});
document.querySelector("#car-btn").addEventListener("click", () => {
  tranformSVG("car", carSVG);
});
document.querySelector("#city-btn").addEventListener("click", () => {
  tranformSVG("cityscape", cityscapeSVG);
});
document.querySelector("#bulb-btn").addEventListener("click", () => {
  tranformSVG("bulb", bulbSVG);
});

function tranformSVG(selectedEvent, eventSVG) {
  console.log(eventSVG);
  parentSVG.classList.remove("active");
  const originalPath = document.querySelector("#main-svg #outline");
  originalPath.classList.remove("svg-elem-1");
  const originalOutline = originalPath.getAttribute("d");
  const newOutline = document
    .querySelector(`#${selectedEvent} #outline`)
    .getAttribute("d");
  const innerSVG = document.querySelector("#innerSVG");
  const innerPaths = document.querySelectorAll(`#${selectedEvent} .path`);
  const outlineClass = document.querySelector(`#${selectedEvent} #outline`)
    .classList[0];
  const newStyle = document.querySelector(`#${selectedEvent} style`).innerHTML;

  morphSVG(originalPath, originalOutline, newOutline);

  drawSVG(
    innerPaths,
    innerSVG,
    selectedEvent,
    originalPath,
    outlineClass,
    newStyle
  );
  console.log(eventSVG);
  document.querySelector(`#${selectedEvent}-container`).innerHTML = eventSVG;
}

function drawSVG(
  SVGDetailPaths,
  innerSVG,
  SVGName,
  originalDOMPath,
  newOutlineClass,
  newStyle
) {
  document.querySelector("#main-svg style").innerHTML = newStyle;
  innerSVG.innerHTML = "";
  SVGDetailPaths.forEach(oneElement => {
    innerSVG.appendChild(oneElement);
  });
  parentSVG.classList.add(SVGName);
  parentSVG.classList.remove(parentSVG.classList[0]);
  originalDOMPath.removeAttribute("class");
  originalDOMPath.classList.add(newOutlineClass);
  setTimeout(() => {
    parentSVG.classList.add("active");
  });
}
