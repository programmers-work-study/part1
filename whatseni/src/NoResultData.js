export default class NoResultData {
  $noResultComponent = null;
  constructor() {
    this.$noResultComponent = document.createElement("div");
    this.$noResultComponent.className = "loading-container";
    this.$noResultComponent.innerHTML = `
      <div class="loading"></div>
      <div id="loading-text">loading</div>
    `;
  }
}