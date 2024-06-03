class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;

  constructor({ $target, initialData, onClick }) {
    this.$searchResult = document.createElement("ul");
    this.$searchResult.className = "SearchResult";
    $target.appendChild(this.$searchResult);

    this.data = initialData;
    this.onClick = onClick;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
    if(this.data.length === 0) {
      this.$searchResult.innerHTML = `<p>지금 찾은 고양이는 없는 고양이 입니다.<p>`
    }
  }

  render() {
    this.$searchResult.innerHTML = this.data
      .map(
        cat => `
          <li class="item">
            <img src=${cat.url} alt=${cat.name} />
          </li>
        `
      )
      .join("");

    this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
      $item.addEventListener("click", () => {
        this.onClick(this.data[index]);
      });
    });
  }
}
