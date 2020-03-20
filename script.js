import "@babel/polyfill";
import { drawCat } from "./morph";
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
  drawCat(halfBox, catOutline, catInline);
}
