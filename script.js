import "@babel/polyfill";
import { drawSVG } from "./morph";
("use strict");

window.addEventListener("DOMContentLoaded", getSVG);

async function getSVG() {
  const response = await fetch("./svg/car.svg");
  const carSVG = await response.text();
  document.querySelector("#main-svg").innerHTML = carSVG;

  window.addEventListener("click", drawSVG);
  let counter = 0;
  function drawSVG() {
    if (counter === 0) {
      document.querySelector(".car").classList.remove("active");
      counter++;
    } else {
      document.querySelector(".car").classList.add("active");
      counter = 0;
    }
  }

  // const parentSVG = document.querySelector("svg");
  // const originalPath = document.querySelector("#changeThis");
  // const innerSVG = document.querySelector("#pasteHere");
  // const carInline = document.querySelectorAll(".path");
  // const carOutline = document.querySelector("#outline").getAttribute("d");
  // const carOutlineClass = document.querySelector("#outline").classList[0];
  // const halfBox = originalPath.getAttribute("d");

  // drawSVG(
  //   originalPath,
  //   innerSVG,
  //   halfBox,
  //   carOutline,
  //   carOutlineClass,
  //   carInline,
  //   parentSVG,
  //   "car"
  // );
}
