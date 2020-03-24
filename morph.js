import "@babel/polyfill";
let flubber = require("flubber");
let d3 = require("d3");
("use strict");

export function morphSVG(originalDOMPath, originalLine, newOutline) {
  let interpolator = flubber.interpolate(originalLine, newOutline);

  d3.select(originalDOMPath)
    .transition()
    .duration(1000)
    .attrTween("d", function() {
      return interpolator;
    });
}
