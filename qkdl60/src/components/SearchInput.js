const TEMPLATE = '<input type="text">';
export default class SearchInput {
  constructor({$target, onSearch}) {
    const $searchInput = document.createElement("input");
    this.$searchInput = $searchInput;
    this.$searchInput.placeholder = "고양이를 검색해보세요.|";

    $searchInput.className = "searchInput";

    $target.appendChild($searchInput);

    $searchInput.addEventListener("keyup", (e) => {
      if (e.keyCode === 13) {
        if (e.target.value.trim().length === 0) return;
        onSearch(e.target.value);
      }
    });
    $searchInput.addEventListener("focus", (event) => {
      if (event.target.value) event.target.value = "";
    });
    this.$searchInput.focus();
  }

  render() {}
}
