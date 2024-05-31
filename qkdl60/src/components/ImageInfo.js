export default class ImageInfo {
  $target = null;
  data = null;

  constructor({$target, data}) {
    this.$target = $target;
    this.data = data;
    this.$target.addEventListener("click", (event) => {
      if (event.target && (event.target.classList.contains("dimmed") || event.target.classList.contains("close"))) {
        console.log("hi");
        this.setState(null);
      }
    });
    document.addEventListener("keyup", (event) => {
      if (event.key !== "Escape") return;
      if (!this.data) return;
      this.setState(null);
    });
    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    if (!this.data || !this.data.visible) {
      this.$target.innerHTML = "";
      return;
    }
    const {name, url, temperament, origin} = this.data.image;
    this.$target.innerHTML = `
    <div class="dimmed">
    <div class="content-wrapper">
    <div class="title">
    <span>${name}</span>
    <button class="close">x</ㅠ>
    </div>
    <img src="${url}" alt="${name}"/>
    <div class="description">
    <div>성격: ${temperament}</div>
    <div>태생: ${origin}</div>
    </div>
    </div>
    </div>
    `;
    if (!this.$target.classList.contains("hidden")) {
      this.$target.classList.remove("hidden");
      this.$target.classList.add("visible");
    }
  }
}
