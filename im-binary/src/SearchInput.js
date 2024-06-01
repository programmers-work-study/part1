const TEMPLATE = '<input type="text">';

class SearchInput {
  constructor({ $target, onSearch, onRandom }) {
    const $searchContainer = document.createElement("div");
    $searchContainer.className = "searchContainer";

    const $searchInput = document.createElement("input");
    this.$searchInput = $searchInput;
    this.$searchInput.placeholder = "고양이를 검색해보세요.|";
    this.$searchInput.autofocus = true;
    $searchInput.className = "SearchInput";

    const $randomButton = document.createElement("button");
    this.$randomButton = $randomButton;
    this.$randomButton.textContent = "랜덤 고양이!";
    $randomButton.className = "RandomButton";

    $target.appendChild($searchContainer);
    $searchContainer.append($searchInput, $randomButton);

    $searchInput.addEventListener("keyup", e => {
      if (e.keyCode === 13) {
        onSearch(e.target.value);
      }
    });

    $randomButton.addEventListener("click", () => {
      onRandom();
    })

    $searchInput.addEventListener("click", e => {
      if (e.target.value !== "") {
        e.target.value = "";
      }
    });

    console.log("SearchInput created.", this);
  }
  render() {}
}
