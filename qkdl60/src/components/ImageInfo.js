export default class ImageInfo {
  $target = null;
  data = null;

  constructor({$target, data}) {
    //TODO 고양이 정보 api 요청하기
    this.$target = $target;
    this.data = data;
    this.$target.addEventListener("click", (event) => {
      if (event.target && (event.target.classList.contains("dimmed") || event.target.classList.contains("close"))) {
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
  //TODO visible 상태로 컨트롤,fetch시 로딩으로  로딩 완료후 업데이트
  render() {
    if (!this.data || !this.data.visible) {
      if (this.$target.classList.contains("visible")) this.$target.classList.replace("visible", "hidden");
      this.$target.innerHTML = "";
      return;
    }
    const {name, url, temperament, origin} = this.data.image;
    if (!name || !temperament || !origin) {
      this.$target.innerHTML = `
      <div class="dimmed">
        <div class="content-wrapper">
        loading🙀🙀🙀🙀...
        </div>
      </div>`;
      if (this.$target.classList.contains("hidden")) this.$target.classList.replace("hidden", "visible");
      return;
    }

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
    if (this.$target.classList.contains("hidden")) this.$target.classList.replace("hidden", "visible");
  }
}
