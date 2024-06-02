export default class SearchHistory {
  data = [];
  constructor({$target, onClick}) {
    this.$target = $target;
    this.render();

    this.$target.addEventListener("click", (event) => {
      if (!event.target || !event.target.classList.contains("history-item")) return;
      const keyword = event.target.dataset.keyword;
      onClick(keyword);
    });
  }

  setState(value) {
    this.data = [value, ...this.data];
    if (this.data.length > 5) this.data.pop();
    this.render();
  }

  render() {
    this.$target.innerHTML = this.template();
  }

  template() {
    return `<div class="historyContainer" >
    <span>최근 검색어 : </span>
    ${this.data.map((item) => `<span class="history-item" data-keyword=${item}>${item}</span>`).join(" / ")}
    </div> `;
  }
}
