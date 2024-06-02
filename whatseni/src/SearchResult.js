export default class SearchResult {
  constructor({ $target, initialData, onClick }) {
    this.$searchResult = document.createElement("div");
    this.$searchResult.className = "SearchResult";
    $target.appendChild(this.$searchResult);

    this.data = initialData;
    this.onClick = onClick;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    if (this.data.length > 0) {
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
    } else {
      this.$searchResult.innerHTML = "<p>No results found.</p>";
    }
  }
}
