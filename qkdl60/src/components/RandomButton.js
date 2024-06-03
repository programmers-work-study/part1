export default class RandomButton {
  constructor({$target, onClick}) {
    this.$target = $target;
    const $randomButton = document.createElement("button");
    $randomButton.textContent = "랜덤버튼";
    this.$target.appendChild($randomButton);
    $randomButton.addEventListener("click", onClick);
  }
}
