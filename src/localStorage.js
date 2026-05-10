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
      storage &&
      storage.length !== 0
    );
  }
}

export function getFromStorage(key) {
  if (!localStorage.getItem(key)) {
    return null;
  } else {
    return JSON.parse(localStorage.getItem(key));
  }
}

export function saveToStorage(key, data) {
  if (storageAvailable("localStorage")) {
    localStorage.setItem(key, JSON.stringify(data));
  }
}
