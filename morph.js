import "@babel/polyfill";
let flubber = require("flubber");
let d3 = require("d3");
("use strict");

export function drawSVG(
  originalPath,
  innerSVG,
  originalLine,
  newOutline,
  newInline,
  svgContainer
) {
  let interpolator = flubber.interpolate(originalLine, newOutline);

  d3.select(originalPath)
    .transition()
    .duration(1000)
    .attrTween("d", function() {
      return interpolator;
    })
    .on("end", drawRest);

  function drawRest() {
    console.log("draw some more now");
    newInline.forEach(oneElement => {
      innerSVG.appendChild(oneElement);
    });
    setTimeout(() => svgContainer.classList.add("active"), 100);
  }
}
