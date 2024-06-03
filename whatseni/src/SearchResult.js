export default class SearchResult {
  constructor({ $target, initialData, onClick }) {
    this.$searchResult = document.createElement("div");
    this.$searchResult.className = "SearchResult";

    this.$searchNoResult = document.createElement("div");
    this.$searchNoResult.className = "SearchNoResult";
    this.$searchNoResult.innerHTML = "<p class=\"NoResultContainer\">검색 결과가 없습니다.</p>";
    $target.appendChild(this.$searchResult);
    $target.appendChild(this.$searchNoResult);

    this.data = initialData;
    this.onClick = onClick;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  showNoResult() {
    this.$searchResult.style.display = "none";
    this.$searchNoResult.style.display = "block";
  }

  showResult() {
    this.$searchResult.style.display = "grid";
    this.$searchNoResult.style.display = "none";
    this.$searchResult.innerHTML = this.data
      .map(
        (cat) => `
        <div class="item">
          <img src="${cat.url}" alt="${cat.name}" />
        </div>
      `
      )
      .join("");

    this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
      $item.addEventListener("click", () => {
        this.onClick(this.data[index]);
      });
    });
  }

  render() {
    if (this.data && this.data.length > 0) {
      this.showResult();
    } else {
      this.showNoResult();
    }
  }
}
