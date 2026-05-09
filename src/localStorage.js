import {App} from "./app.js";

function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

// function populateStorage(projects){
//   localStorage.setItem("projects",projects);
// }

export function getFromStorage(key){
  if(!localStorage.getItem(key)){
    return null;
  }
  else{
    return JSON.parse(localStorage.getItem(key));
  }
}

export function saveToStorage(key, data){
  if (storageAvailable("localStorage")) {
    localStorage.setItem(key, JSON.stringify(data));
  
  // } else {
  // console.log("storage not available")
  } 
}