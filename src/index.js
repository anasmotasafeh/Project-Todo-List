import "./style.css"
import {init} from "./domHandler.js"
import {App} from "./app.js"
import {getFromStorage} from "./localStorage.js"

window.addEventListener("DOMContentLoaded", () => {
  if (getFromStorage("projects") !== null){
    App.hydrate(getFromStorage("projects"));
  }
  init();
});
