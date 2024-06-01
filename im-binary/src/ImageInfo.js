class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, data }) {
    const $imageInfo = document.createElement("div");
    $imageInfo.className = "ImageInfo";
    this.$imageInfo = $imageInfo;
    $target.appendChild($imageInfo);

    this.data = data;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  close() {
    this.$imageInfo.style.display = "none";
  }

  render() {
    if (this.data.visible) {
      const { data: catImageData } = this.data.image;
      const { name, url, temperament, origin } = catImageData;
      
      this.$imageInfo.innerHTML = `
        <div class="content-wrapper">
          <h1 class="title">
            <span>${name}</span>
            <button class="close">x</button>
          </h1>
          <img src="${url}" alt="${name}"/>        
          <div class="description">
            <div>성격: ${temperament}</div>
            <div>태생: ${origin}</div>
          </div>
        </div>`;
      this.$imageInfo.style.display = "block";

      const contentWrapper = document.querySelector(".content-wrapper");
      const closeButton = document.querySelector(".close");

      this.$imageInfo.addEventListener("click", () => {
        this.close();
      });

      contentWrapper.addEventListener("click", (e) => {
        e.stopPropagation();
      })
  
      closeButton.addEventListener("click", () => {
        this.close();
      });
  
      document.addEventListener("keyup", (e) => {
        if (e.keyCode === 27) {
          this.close();
        }
      });
    } else {
      this.$imageInfo.style.display = "none";
    }
  }
}
