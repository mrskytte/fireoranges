import "@babel/polyfill";

("use strict");

window.addEventListener("DOMContentLoaded", getSVG);

document.querySelector("h1").textContent = "Hey Daddy";

async function getSVG() {
  const response = await fetch("./svg/girl.svg");
  const girlSVG = await response.text();
  document.querySelector("#svg-container").innerHTML = girlSVG;
}
