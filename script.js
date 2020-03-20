import "@babel/polyfill";
let flubber = require("flubber");
let d3 = require("d3");
("use strict");

window.addEventListener("DOMContentLoaded", getSVG);

document.querySelector("h1").textContent = "Hey Daddy";

async function getSVG() {
  const response = await fetch("./svg/cat.svg");
  const catSVG = await response.text();
  document.querySelector("#svg-container").innerHTML = catSVG;
  const catInline = document.querySelectorAll(".path");
  const catOutline = document.querySelector("#outline").getAttribute("d");
  const halfBox = "M10 10 L 10 300 300 300 Q 250 150 300 10";
  drawCat(halfBox, catOutline);
  function drawCat(originalLine, newLine) {
    let interpolator = flubber.interpolate(originalLine, newLine);

    d3.select("path")
      .transition()
      .duration(1000)
      .attrTween("d", function() {
        return interpolator;
      })
      .on("end", drawRest);
  }

  function drawRest() {
    console.log("draw some more now");
    const innerSVG = document.querySelector("#pasteHere");
    catInline.forEach(oneElement => {
      innerSVG.appendChild(oneElement);
    });
    setTimeout(
      () => document.querySelector("svg").classList.add("active"),
      100
    );
  }
}
