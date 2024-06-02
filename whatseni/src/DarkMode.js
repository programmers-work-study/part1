export default class DarkMode {
  constructor({ $target }) {
    this.$target = $target;
    this.isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

    this.$darkmodeBox = document.createElement("div");
    this.$darkmodeBox.className = "DarkmodeContainer";

    this.$toggle = document.createElement("input");
    this.$toggle.type = "checkbox";
    this.$toggle.checked = this.isDarkMode;
    // this.$toggle.className = "DarkModeToggle";
    this.$toggle.id = "DarkModeToggle";

    this.$label = document.createElement("label");
    this.$label.htmlFor = "DarkModeToggle";

    $target.appendChild(this.$darkmodeBox);
    this.$darkmodeBox.appendChild(this.$toggle);
    this.$darkmodeBox.appendChild(this.$label);
    this.$toggle.addEventListener("change", this.toggleDarkMode.bind(this));
    this.applyDarkMode();
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    this.applyDarkMode();
  }

  applyDarkMode() {
    if (this.isDarkMode) {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }
  }
}
