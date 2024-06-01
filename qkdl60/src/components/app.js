import ThemeToggleButton from "./ThemeToggleButton.js";
import SearchInput from "./SearchInput.js";
import SearchResult from "./SearchResult.js";
import ImageInfo from "./ImageInfo.js";
import Banner from "./Banner.js";
import {api} from "../utils/api.js";
import RandomButton from "./RandomButton.js";

export default class App {
  $target = null;
  data = [];

  constructor($target) {
    this.$target = $target;
    const $header = document.createElement("header");
    $header.classList.add("header");
    this.$target.appendChild($header);

    this.themeToggleButton = new ThemeToggleButton({$target: $header});
    this.searchInput = new SearchInput({
      $target: $header,
      onSearch: (keyword) => {
        api.fetchCats(keyword).then(({data}) => this.setState(data));
      },
    });
    const $randomButton = new RandomButton({
      $target: $header,
      onClick: () => {
        api.fetchRandom50().then(({data}) => this.setState(data));
      },
    });

    const $banner = document.createElement("section");
    $banner.classList.add("banner");
    this.$target.appendChild($banner);
    this.banner = new Banner({$target: $banner});

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: (image) => {
        this.imageInfo.setState({
          visible: true,
          image,
        });
      },
    });

    const $imageInfo = document.createElement("div");
    $imageInfo.classList.add("ImageInfo", "hidden");
    this.$target.appendChild($imageInfo);
    this.imageInfo = new ImageInfo({
      $target: $imageInfo,
      data: {
        visible: false,
        image: null,
      },
    });
  }

  setState(nextData) {
    console.log(this);
    this.data = nextData;
    this.searchResult.setState(nextData);
  }
}
