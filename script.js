import "@babel/polyfill";
import { drawSVG } from "./morph";
("use strict");

window.addEventListener("DOMContentLoaded", getSVG);

async function getSVG() {
  const response = await fetch("./svg/car.svg");
  const carSVG = await response.text();

  window.addEventListener("click", drawSVG);

  function drawSVG() {
    document.querySelector(".firstLine").classList.remove("active");
    // document.querySelector(".car").classList.add("active");
    document
      .querySelector(".firstLine")
      .addEventListener("transitionend", drawNewSVG);
  }

  function drawNewSVG() {
    document.querySelector("#main-svg").innerHTML = carSVG;
    setTimeout(
      () => document.querySelector(".car").classList.add("active"),
      200
    );
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
