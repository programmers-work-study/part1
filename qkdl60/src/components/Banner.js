import {api} from "../utils/api.js";
export default class Banner {
  data = [];
  currentIndex = 0;
  constructor({$target}) {
    this.$target = $target;
    api.fetchRandom50().then(({data}) => {
      const sliced = data.slice(0, 5);
      this.setState(sliced);
    });
    this.render();
    this.$target.addEventListener("click", (event) => {
      const $carouselContainer = document.querySelector(".carousel__container");

      if (!event.target.classList.contains("carousel__button") || !$carouselContainer) return;
      if (event.target.classList.contains("left")) {
        this.currentIndex--;
        if (this.currentIndex < 0) this.currentIndex = 4;
        $carouselContainer.style.transform = `translate(${-200 * this.currentIndex}px)`;
        return;
      }
      if (event.target.classList.contains("right")) {
        this.currentIndex++;
        if (this.currentIndex > 4) this.currentIndex = 0;
        $carouselContainer.style.transform = `translate(${-200 * this.currentIndex}px)`;
        return;
      }
    });
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    this.$target.innerHTML = this.template();
  }
  template() {
    return `
    <button class='carousel__button left'>${"<"}</button>
    <button class='carousel__button right'>${">"}</button>
    <div class='carousel__current'>
    <div class="carousel__container">
    ${this.data
      .map(
        (cat) => `
    <div class="carousel__item" >
      <img src=${cat.url} alt="cat_image">
    </div> 
    `
      )
      .join("")}
    </div>
   
    </div>`;
  }
}
