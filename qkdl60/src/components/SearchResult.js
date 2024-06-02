import {storage} from "../utils/Storage.js";
import {STORE_KEY_SEARCH_RESULT} from "../constants/constants.js";
import {api} from "../utils/api.js";

export default class SearchResult {
  $target;
  data = null;
  onClick = null;
  keyword = null;
  page = 1;

  constructor({$target, initialData, onClick}) {
    this.$target = $target;
    this.data = initialData;
    this.onClick = onClick;
    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    storage.set(STORE_KEY_SEARCH_RESULT, this.data);
    this.render();
  }
  render() {
    if (!this.data || this.data.length === 0) {
      this.$target.innerHTML = `<div class="empty-result">
      검색 결과가 없네요😿😾🙀
      </div>`;
      return;
    }
    const currentItems = this.$target.querySelectorAll(".item");
    const currentItemIds = [...currentItems].map((item) => item.id);

    const newData = this.data.filter((item) => !currentItemIds.includes(item.id));
    const $pageEnd = document.querySelector(".page-end");
    const $empty = document.querySelector(".empty-result");
    if ($empty) $empty.remove();
    if (newData.length === this.data.length) {
      this.$target.innerHTML =
        this.data
          .map((item) => {
            const name = item.name.split(" ").join("");
            return `<div class="item" id="${item.id}">
    <img class="lazy" data-src="${item.url}" title="${name}" alt="${name}" />
    </div>`;
          })
          .join("") + "<div class='page-end'>끝</div>";
      this.mounted();
      return;
    } else {
      newData.forEach((item) => {
        const $item = document.createElement("div");
        $item.classList.add("item");
        $item.id = item.id;
        const $img = document.createElement("img");
        $img.classList.add("lazy");
        $img.dataset.src = item.url;
        $img.title = item.name.split(" ").join("");
        $img.alt = item.name.split(" ").join("");
        $item.appendChild($img);
        if ($pageEnd) this.$target.insertBefore($item, $pageEnd);
        else this.$target.appendChild($item);
      });
    }

    if (!$pageEnd) {
      const lastBox = document.createElement("div");
      lastBox.classList.add("page-end");
      lastBox.innerText = "끝";
      this.$target.appendChild(lastBox);
    }
    this.mounted();
  }

  mounted() {
    this.$target.addEventListener("click", (event) => {
      const $item = event.target.closest(".item");
      if (!$item) return;
      const targetId = $item.id;
      const cat = this.data.filter((cat) => cat.id === targetId)[0];
      this.onClick(cat);
    });

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.classList.contains("lazy")) {
          const $img = entry.target;
          $img.src = $img.dataset.src;
          $img.classList.remove("lazy");
          return;
        }
        if (entry.isIntersecting && entry.target.classList.contains("page-end")) {
          if (entry.target.classList.contains("searching") || !this.keyword) return;
          entry.target.classList.add("searching");
          this.page++;
          api.fetchCats(this.keyword, this.page).then(({data}) => {
            this.setState([...this.data, ...data]);
            entry.target.classList.remove("searching");
          });
        }
      });
    });
    const images = document.querySelectorAll(".lazy");
    images.forEach((image) => io.observe(image));
    const $pageEnd = document.querySelector(".page-end");
    if ($pageEnd) io.observe($pageEnd);
  }
}
