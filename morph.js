import "@babel/polyfill";
let flubber = require("flubber");
let d3 = require("d3");
("use strict");

export function drawCat(originalLine, newOutline, newInline) {
  let interpolator = flubber.interpolate(originalLine, newOutline);

  d3.select("path")
    .transition()
    .duration(1000)
    .attrTween("d", function() {
      return interpolator;
    })
    .on("end", drawRest);

  function drawRest() {
    console.log("draw some more now");
    const innerSVG = document.querySelector("#pasteHere");
    newInline.forEach(oneElement => {
      innerSVG.appendChild(oneElement);
    });
    setTimeout(
      () => document.querySelector("svg").classList.add("active"),
      100
    );
  }
}
