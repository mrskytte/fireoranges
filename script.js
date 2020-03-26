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
  secondCircle: true,
  thirdCircle: true,
  fourthCircle: true
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
    animateEvent("timeline");
    tranformSVG("timeline", timelineSVG, parentSVG);
    if (activeButtons.thirdCircle) {
      activeButtons.fourthCircle = true;
    } else if (activeButtons.secondCircle) {
      activeButtons.thirdCircle = true;
    } else if (activeButtons.firstCircle) {
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

function animateTimeline() {
  //SET VALUE OF ANIMATIONELEMENT TO THE ANIMATION PATH/OBJECT YOU NEED TO USE
  animationElement =
    '<path id="yellow_line" class="yellow" d="M-49.5,815.9c0,0,64.5,28.6,182.7-58.6s96.7-162.7,77.4-160.8c-19.4,1.9-114.2,114.3,27.2,185.9c0,0,51.6,33.8,139.1-7.1C481.4,726.5,495.4,641.5,494.8,628c-0.5-13.5-11.5-69.8-128,52.8s-22.5,307.8,243,216.6S1278,657.5,1463.4,728s438,71,476-81.7s-37.5-309.8-203.7-317.1c-166.2-7.4-344.4,52.2-446,245.7s158.8,448.2,458.7,389.2c300-58.9,568.8-138.2,568.8-138.2"/><path id="blue" class="blue" d="M2303.7,649.7c-75.2,1.4-149.6,31.5-204.6,82.8c-10.9,10.2-23.1,22.1-38,21.5c-10.1-0.4-19-6.5-27.1-12.6c-26.3-19.7-52.4-41.3-83.9-50.6s-70.7-2.5-88.3,25.3c-6.5,10.3-10.1,23.2-20.2,29.9c-22.1,14.7-47.7-11.4-72.1-22c-27.4-11.9-59.9-2.7-84.5,14.1s-43.5,40.6-64.5,61.8c-7.6,7.6-15.9,15.2-26.2,18.4c-30.4,9.5-57.5-21.9-70.9-50.8c-76.5-165.3-27.7-375.2-129.8-525.9c-18.5-27.3-47.6-53.9-80.1-48.3c-28.3,4.8-46.9,32.1-57.7,58.6c-40.8,99.3-19.6,212,2.6,317.1c4.8,22.7,3,55.4-20,58.1c-29.1,3.4-31.8-44.3-55.1-62c-24.3-18.4-59.7,4.5-72.9,32c-13.1,27.4-15.7,60.1-34.5,84c-4.1,5.2-9.3,10.1-15.8,11.3c-8.1,1.4-16-3.2-22.2-8.6c-22.8-20-32.1-50.9-46.7-77.5c-14.6-26.6-41.3-52.2-71.1-46.7c-28.9,5.3-44.8,36.7-51.9,65.2c-18.1,73-8,152.5-37.8,221.5c-3.1,7.2-7,14.6-13.8,18.6c-17.6,10.2-37.7-9.1-46.9-27.2c-33.2-65.1-39.3-148.9-97.8-192.7c-11.1-8.3-24.3-14.8-38.2-14.2c-52.8,2.3-61.6,94.7-114.1,100.5c-47.6,5.3-78.3-67.8-125.5-59.3c-22.8,4.1-37.6,26.5-45.7,48.3s-13.1,45.6-28.4,63.1c-15.3,17.5-46.3,24.2-60.7,6c-6.6-8.3-8-19.4-8.6-30c-1.8-32,0.8-67.8-20.6-91.7c-27.5-30.8-80.1-21.9-111.8,4.5s-50.2,65-75.2,97.8c-44.7,58.5-154.2,7.6-227,18.7"/><path id="yellow" class="yellow" d="M-98.7,953.3c219.6,6.1,442.2,79.7,655.1,25.5c152.4-38.8,286.4-144.9,359.1-284.4c35.6-68.3,56.5-152.1,23.3-221.6c-35-73.4-124.8-110.4-205.3-98.8S583,438,533.3,502.4c-57.4,74.4-91.8,167.8-88.2,261.6s46.9,187.1,121.5,244.2c46.4,35.5,102.5,56.3,158.9,71.4c64.9,17.4,132.5,28.3,199.3,20.6c77.3-8.9,149.8-42.2,216.6-82c149.7-89.2,276.4-211.3,406.6-327.1c31.4-27.9,63.8-56,102.6-72.2c38.7-16.3,85.5-19.1,121.3,2.8c21.2,13,36.8,33.3,52.3,52.8c42.5,53.8,89,106.4,148.7,140.1c59.7,33.7,135.2,45.8,197.1,16.3c132.7-63.3,129-262.1,236.8-362"/>';
  return animationElement;
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
  animationElement =
    '<path id="yellow_line" class="yellow" d="M-49.5,815.9c0,0,64.5,28.6,182.7-58.6s96.7-162.7,77.4-160.8c-19.4,1.9-114.2,114.3,27.2,185.9c0,0,51.6,33.8,139.1-7.1c104.5-48.8,118.5-133.8,117.9-147.3c-0.5-13.5-11.5-69.8-128,52.8s-22.5,307.8,243,216.6s668.2-239.9,853.6-169.4s438,71,476-81.7s-37.5-309.8-203.7-317.1c-166.2-7.4-344.4,52.2-446,245.7c-101.6,193.5,158.8,448.2,458.7,389.2c300-58.9,568.8-138.2,568.8-138.2"/>';
  return animationElement;
}
function animateCar() {
  //SET VALUE OF ANIMATIONELEMENT TO THE ANIMATION PATH/OBJECT YOU NEED TO USE
  animationElement =
    '<path id="yellow_line" class="yellow" d="M351,615.8c20.6-22.7,21.2-69.2-6.2-83s-62-4.7-85.5,15c-35.3,29.6-49,80.6-39.4,125.7c9.6,45.1,40,84.1,78,110.3c64.4,44.5,159.4,50.9,217.9-1.2c43.7-38.9,59.3-100.5,63.8-158.9s0.5-117.9,15-174.6C620.8,346.8,711.6,264,815.9,247.3c20.1-3.2,44.2-2.6,56.3,13.8c6.7,9.1,7.9,20.9,8.2,32.1c3.5,133.1-91.7,246.1-136.5,371.5c-9.6,26.7-16.9,55.1-13.1,83.3c4.8,35.9,27.8,67.6,57,89.1c29.4,21.7,65.5,34.2,102,35.4c104.5,3.4,194.9-87.8,219-189.5s-4.9-209-48.6-304c-12.7-27.7-27-59.2-15.3-87.4c6.7-16.2,21.1-28,35.9-37.5c42.1-26.9,92.5-40.4,142.4-38.3c28.1,1.2,57.1,7.9,78.8,25.9c19.8,16.5,31.5,40.8,39.6,65.3c33.5,101.7,11.1,220.1-57.5,302.4c-34.1,41-77.9,72.7-115.5,110.5c-37.6,37.8-70.2,85.2-72.4,138.5c-3.1,74,56.5,140.6,127.1,163.1s148.2,8.2,216.7-20c69.5-28.7,135.1-73.8,172.4-139.1c37.3-65.3,40.6-153.2-5.3-212.8c-32.6-42.4-87.1-69.1-104.6-119.7c-20.5-59.3,20-122.2,65.6-165.3c43.6-41.1,96.9-76.1,156.6-81.1c68.9-5.7,137.2,31.2,179,86.3c41.7,55.1,58.9,126,58.1,195.1c-1,82.7-28.4,167.5-87.3,225.5c-58.9,58-152,83.9-228.2,51.8c-53.1-22.3-92.4-68.7-121.9-118.1c-34.3-57.4-58-121.1-69.5-187c-15-85.5-10.9-177.6-53.9-253.1c-12.7-22.3-30.1-43-53.3-53.8c-44.9-21-98.4-0.4-139.1,27.9c-51.2,35.6-95.6,88.2-101.2,150.3c-3.8,43,11.2,85.2,25.2,126C1168.1,638,1199,748.8,1176,856c-8,37.1-23.6,74.6-53.7,97.7c-51.4,39.6-125.9,25-184.9-1.9c-29.7-13.5-59-30.4-78.5-56.5c-43.9-58.4-25.6-141.8,3.2-209c28.8-67.2,67.1-136.1,57.2-208.5c-7.7-57-44.9-106.1-88.1-144c-97.2-85.3-245-124.4-358.7-63.1c-30.2,16.3-58.1,40.8-68.1,73.6c-10.6,34.9,1.1,73.3,21.1,103.8c20,30.5,47.6,55,72.9,81.2c84.5,87.2,147.3,200.2,154.4,321.4c1.5,25.4-0.5,53.5-18.3,71.7c-25.1,25.6-67.9,18.7-100.9,4.6c-120-51.1-204.4-176.5-206.6-306.9c-0.3-16.8,4.2-38.1,20.7-41.5C348.9,591,349.9,603.4,351,615.8"/><path id="blue_4" class="blue" d="M895.5,642.6c35.3-49.5,71.4-99.1,116.2-140.1c69.7-63.8,162.2-105.6,256.7-103.3c94.5,2.3,189.2,52.5,234.3,135.6c10,18.4,17.6,38.3,30.2,55c22.7,30.1,58.9,46.7,95.1,57.2c36.2,10.5,73.8,16,108.8,29.9c42.5,16.8,79.3,45.2,115.4,73.2c17.8,13.8,35.8,27.8,48.9,46.1c13,18.3,20.6,41.9,14.7,63.6c-8.4,31.3-43.1,50.2-75.5,49.4c-13.7-0.3-27.4-3.4-41.1-2.6c-54.6,3.3-97.8,67.4-150.9,54.3c-41.6-10.2-61.6-63.6-103.4-73c-25.5-5.7-51,6.8-75.9,14.4c-78.1,23.8-161.5-0.4-241.4-17.2c-7.1-1.5-14.3-2.9-21.4-1.8c-10.9,1.7-19.9,9.1-28.7,15.9c-28,21.8-59.4,40-94.1,47.5c-34.6,7.5-72.8,3.4-102.1-16.5c-22.6-15.4-39.2-39.2-63.7-51.4c-38.9-19.3-88.2-4.7-127.1-23.9c-7.2-3.5-14.1-8.5-17.5-15.7c-7.7-16.5,5.6-34.6,17.6-48.4C833.5,741.5,868.9,702.4,895.5,642.6"/><path id="blue_3" class="blue" d="M501.3,441.2c46.3-19.5,96.1-30.8,146.4-33.3c35-1.7,72.9,1.8,99.8,24.4c6.5,5.5,12.4,12.4,13.8,20.8c2.6,16.6-12.9,30-26.7,39.6c-56.8,39.6-113.7,79.2-170.5,118.8c-23.8,16.6-48.1,33.6-64.4,57.6c-16.3,23.9-23.1,56.6-9.3,82c15.4,28.4,50.6,39.4,82.8,42.6c20.8,2,42.5,1.7,61.7-6.7c27.8-12.2,46-39.4,59-66.9c16.7-35,27.8-73.4,26.1-112.1c-1.7-38.7-17.5-77.8-47.3-102.5c-30.3-25.2-71.4-33.3-110.8-35.6c-29.4-1.7-61.2,0.1-84.6,17.9c-12.2,9.3-21.1,22.3-27.6,36.2c-16.7,35.5-17.2,80.3,6.1,111.9c20.1,27.2,53.7,40.5,86,50.3c36.7,11.2,74.1,19.7,111.5,28.3c55.4,12.7,112.9,25.4,168.5,13.6"/><path id="blue_2" class="blue" d="M1050.3,896.2c-12.1-9.4-24.4-19.1-32.8-31.9c-8.4-12.8-12.3-29.5-6.5-43.7c3.7-9,10.9-16.2,19-21.8c18.9-13.2,44.3-18.6,65.7-9.8s36.2,33.4,30.2,55.7c-3.7,13.8-14.3,24.7-25.4,33.6c-8.2,6.5-17.2,12.5-27.4,14.9C1062.9,895.5,1058.1,903.2,1050.3,896.2"/><path id="blue_1" class="blue" d="M1650.5,902.5c-13.8-3-17.4-6-27.5-15.8s-16.4-24.2-14.1-38.1c2.4-14.5,13.7-26.5,27-32.7s28.5-7.5,43.2-7c21.8,0.7,46,6.6,57.8,25c13.2,20.6,4,50.5-16.1,64.4C1700.6,912.2,1673.1,911.9,1650.5,902.5"/>';
  return animationElement;
}

const darkBtn = document.querySelector("#timeline-btn-two");
const outline = document.querySelector("#outline");
outline.style.fill = "red";
darkBtn.addEventListener("click", changeTimeline);

function changeTimeline() {}
