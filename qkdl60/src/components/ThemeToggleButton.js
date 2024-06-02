import {THEME_DARK_MODE_CLASS_NAME} from "../constants/constants.js";
export default class ThemeToggleButton {
  data = {isDarkMode: false};
  constructor({$target}) {
    this.$target = $target;
    //boolean 으로 dark
    this.setState(window.matchMedia("(prefers-color-scheme: dark)").matches);
    this.render();
  }

  setState(value) {
    this.data.isDarkMode = value;
    const $body = document.querySelector("body");

    if (this.data.isDarkMode) {
      if ($body.classList.contains(THEME_DARK_MODE_CLASS_NAME)) return;
      $body.classList.add(THEME_DARK_MODE_CLASS_NAME);
    } else {
      if (!$body.classList.contains(THEME_DARK_MODE_CLASS_NAME)) return;
      $body.classList.remove(THEME_DARK_MODE_CLASS_NAME);
    }
  }
  render() {
    const $toggleButton = document.createElement("input");
    $toggleButton.setAttribute("type", "checkbox");
    $toggleButton.classList.add("theme-toggle-button");
    this.$target.appendChild($toggleButton);

    $toggleButton.addEventListener("change", () => {
      this.setState(!this.data.isDarkMode);
    });
  }
}
