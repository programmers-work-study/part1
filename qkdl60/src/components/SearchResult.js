export default class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;

  constructor({$target, initialData, onClick}) {
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
  //TODO
  render() {
    this.$searchResult.innerHTML = this.data
      .map(
        (cat) => `
          <div class="item"  >
            <img class="lazy" data-src=${cat.url} title=${cat.name.split(" ").join("")} alt=${cat.name.split(" ").join("")} />
          </div>
        `
      )
      .join("");

    this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
      $item.addEventListener("click", () => {
        this.onClick(this.data[index]);
      });
    });
    //TODO render에서 mouted로 분리 필요
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.classList.contains("lazy")) {
          const $img = entry.target;
          $img.src = $img.dataset.src;
          $img.classList.remove("lazy");
        }
      });
    });
    const images = document.querySelectorAll(".lazy");
    images.forEach((image) => io.observe(image));
  }
}
