export default class SearchInput {
  constructor({ $target, onSearch }) {
    this.$target = $target;
    this.onSearch = onSearch;

    this.$input = document.createElement("input");
    this.$input.placeholder = "Search for cats...";
    this.$input.type = "text";
    this.$input.className = "SearchInput";
    $target.appendChild(this.$input);

    this.$input.addEventListener("focus", () => {
      this.$input.value = "";
    });

    this.$input.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        this.onSearch(this.$input.value);
        this.saveRecentKeyword(this.$input.value);
      }
    });

    this.$input.focus();
    this.renderRecentKeywords();
  }

  saveRecentKeyword(keyword) {
    let recentKeywords = JSON.parse(localStorage.getItem("recentKeywords")) || [];
    if (!recentKeywords.includes(keyword)) {
      recentKeywords.unshift(keyword);
      if (recentKeywords.length > 5) {
        recentKeywords.pop();
      }
      localStorage.setItem("recentKeywords", JSON.stringify(recentKeywords));
    }
  }

  renderRecentKeywords() {
    const recentKeywords = JSON.parse(localStorage.getItem("recentKeywords")) || [];
    const $recentKeywordsContainer = document.createElement("div");
    $recentKeywordsContainer.className = "RecentKeywords";
    this.$target.appendChild($recentKeywordsContainer);

    recentKeywords.forEach(keyword => {
      const $keyword = document.createElement("div");
      $keyword.className = "Keyword";
      $keyword.textContent = keyword;
      $keyword.addEventListener("click", () => {
        this.onSearch(keyword);
      });
      $recentKeywordsContainer.appendChild($keyword);
    });
  }
}
