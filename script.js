import "@babel/polyfill";
import { drawSVG } from "./morph";
("use strict");

window.addEventListener("DOMContentLoaded", getSVG);

async function getSVG() {
  const response = await fetch("./svg/car.svg");
  const bulbSVG = await response.text();
  document.querySelector("#svg-container").innerHTML = bulbSVG;

  const parentSVG = document.querySelector("svg");
  const originalPath = document.querySelector("#changeThis");
  const innerSVG = document.querySelector("#pasteHere");
  const carInline = document.querySelectorAll(".path");
  const carOutline = document.querySelector("#outline").getAttribute("d");
  const carOutlineClass = document.querySelector("#outline").classList[0];
  const halfBox = originalPath.getAttribute("d");

  drawSVG(
    originalPath,
    innerSVG,
    halfBox,
    carOutline,
    carOutlineClass,
    carInline,
    parentSVG,
    "car"
  );
}
