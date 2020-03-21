import "@babel/polyfill";
let flubber = require("flubber");
let d3 = require("d3");
("use strict");

export function drawSVG(
  originalDOMPath,
  innerSVG,
  originalLine,
  newOutline,
  newOutlineClass,
  SVGDetailPaths,
  SVGContainer,
  SVGName
) {
  let interpolator = flubber.interpolate(originalLine, newOutline);

  d3.select(originalDOMPath)
    .transition()
    .duration(1000)
    .attrTween("d", function() {
      return interpolator;
    })
    .on("end", drawRest);

  function drawRest() {
    console.log("draw some more now");
    SVGDetailPaths.forEach(oneElement => {
      innerSVG.appendChild(oneElement);
    });
    SVGContainer.classList.add(SVGName);
    originalDOMPath.classList.add(newOutlineClass);
    setTimeout(() => {
      SVGContainer.classList.add("active");
      originalDOMPath.classList.add(newOutlineClass);
    }, 110);
  }
}
