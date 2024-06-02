export default class ImageInfo {
  constructor({ $target, data, onClose }) {
    this.$target = $target;
    this.data = data;
    this.onClose = onClose;

    this.$imageInfo = document.createElement("div");
    this.$imageInfo.className = "ImageInfo Modal";
    $target.appendChild(this.$imageInfo);

    this.render();
    this.bindEvents();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    if (this.data.visible) {
      this.$imageInfo.style.display = "block";
      this.$imageInfo.innerHTML = `
        <div class="content">
          <img src="${this.data.image.url}" alt="${this.data.image.name}" />
          <p>${this.data.image.name}</p>
          <button class="close">Close</button>
        </div>
      `;
    } else {
      this.$imageInfo.style.display = "none";
    }
  }

  bindEvents() {
    this.$imageInfo.addEventListener("click", (e) => {
      if (e.target.className === "close" || e.target === this.$imageInfo) {
        this.onClose();
      }
    });

    window.addEventListener("keyup", (e) => {
      if (e.key === "Escape") {
        this.onClose();
      }
    });
  }
}
