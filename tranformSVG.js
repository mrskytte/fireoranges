"use strict";
import { morphSVG } from "./morph";

export function tranformSVG(selectedEvent, eventSVG, parentSVG) {
  console.log(selectedEvent);
  parentSVG.classList.remove("active");
  const originalPath = document.querySelector("#main-svg #outline");
  originalPath.classList.remove("svg-elem-1");
  const originalOutline = originalPath.getAttribute("d");
  const newOutline = document
    .querySelector(`#${selectedEvent} #outline`)
    .getAttribute("d");
  const innerSVG = document.querySelector("#innerSVG");
  const innerPaths = document.querySelectorAll(`#${selectedEvent} .path`);
  const outlineClass = document.querySelector(`#${selectedEvent} #outline`)
    .classList[0];
  const newStyle = document.querySelector(`#${selectedEvent} style`).innerHTML;

  morphSVG(originalPath, originalOutline, newOutline);

  drawSVG(
    innerPaths,
    innerSVG,
    selectedEvent,
    originalPath,
    outlineClass,
    newStyle
  );
  document.querySelector(`#${selectedEvent}-container`).innerHTML = eventSVG;

  function drawSVG(
    SVGDetailPaths,
    innerSVG,
    SVGName,
    originalDOMPath,
    newOutlineClass,
    newStyle
  ) {
    document.querySelector("#main-svg style").innerHTML = newStyle;
    innerSVG.innerHTML = "";
    SVGDetailPaths.forEach(oneElement => {
      innerSVG.appendChild(oneElement);
    });
    parentSVG.classList.add(SVGName);
    parentSVG.classList.remove(parentSVG.classList[0]);
    originalDOMPath.removeAttribute("class");
    originalDOMPath.classList.add(newOutlineClass);
    setTimeout(() => {
      parentSVG.classList.add("active");
    });
  }
}
