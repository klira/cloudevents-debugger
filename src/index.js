import "regenerator-runtime/runtime";
import { h, render } from "preact";
import App from "./App.js";

let rootEl = null;
let currentEl = null;
const update = () => {
  if (!rootEl) {
    rootEl = document.getElementById("root");
  }
  currentEl = render(<App />, rootEl, currentEl);
};

document.addEventListener("DOMContentLoaded", () => {
  update();
});
