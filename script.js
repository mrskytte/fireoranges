import "@babel/polyfill";
let flubber = require("flubber");
let d3 = require("d3");
("use strict");

window.addEventListener("DOMContentLoaded", getSVG);

document.querySelector("h1").textContent = "Hey Daddy";

async function getSVG() {
  const response = await fetch("./svg/girl.svg");
  const girlSVG = await response.text();
  document.querySelector("#svg-container").innerHTML = girlSVG;
  const girlOutline = document.querySelector("#Outline path").getAttribute("d");
  const test = "M100,100 L200,100 L150,200Z";
  const halfBox = "M10 10 L 10 300 300 300 Q 250 150 300 10";
  console.log(girlOutline);
  drawGirl(halfBox, girlOutline);
}

function drawGirl(originalLine, newLine) {
  let myPathElement = document.querySelector("#changeThis");
  let interpolator = flubber.interpolate(originalLine, newLine);

  d3.select("path")
    .transition()
    .duration(1000)
    .attrTween("d", function() {
      return interpolator;
    });
}
