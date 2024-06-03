const sessionStorage = window.sessionStorage;

export const storage = {
  set: (key, value) => {
    const stringified = JSON.stringify(value);
    sessionStorage.setItem(key, stringified);
  },
  get: (key) => {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },
};
