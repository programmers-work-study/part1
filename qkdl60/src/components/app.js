import ThemeToggleButton from "./ThemeToggleButton.js";
import SearchInput from "./SearchInput.js";
import SearchResult from "./SearchResult.js";
import ImageInfo from "./ImageInfo.js";
import Banner from "./Banner.js";
import {api} from "../utils/api.js";
import RandomButton from "./RandomButton.js";
import {STORE_KEY_SEARCH_RESULT} from "../constants/constants.js";
import {storage} from "../utils/Storage.js";
import SearchHistory from "./SearchHistory.js";

export default class App {
  $target = null;
  data = [];

  constructor($target) {
    this.$target = $target;

    const $header = document.createElement("header");
    $header.classList.add("header");
    this.$target.appendChild($header);
    const themeToggleButton = new ThemeToggleButton({$target: $header});
    this.searchInput = new SearchInput({
      $target: $header,
      onSearch: (keyword) => {
        api.fetchCats(keyword).then(({data}) => {
          this.setState(data);
        });
        this.searchResult.keyword = keyword;
        this.searchResult.page = 1;
        searchHistory.setState(keyword);
      },
    });
    const randomButton = new RandomButton({
      $target: $header,
      onClick: () => {
        api.fetchRandom50().then(({data}) => this.setState(data));
        this.searchResult.page = 1;
        this.searchResult.keyword = null;
      },
    });

    const $searchHistory = document.createElement("section");
    $searchHistory.classList.add("searchHistory");
    this.$target.appendChild($searchHistory);
    const searchHistory = new SearchHistory({
      $target: $searchHistory,
      onClick: (keyword) => {
        api.fetchCats(keyword).then(({data}) => {
          this.setState(data);
        });
      },
    });

    const $banner = document.createElement("section");
    $banner.classList.add("banner");
    this.$target.appendChild($banner);
    this.banner = new Banner({$target: $banner});

    const $searchResult = document.createElement("section");
    $searchResult.classList.add("searchResult");
    this.$target.appendChild($searchResult);
    const initialData = storage.get(STORE_KEY_SEARCH_RESULT);
    this.data = initialData ? initialData : [];
    this.searchResult = new SearchResult({
      $target: $searchResult,
      initialData: this.data,
      onClick: (image) => {
        this.imageInfo.setState({
          visible: true,
          image,
        });
        api.fetchCat(image.id).then(({data}) => {
          this.imageInfo.setState({visible: true, image: data});
        });
      },
    });

    const $imageInfo = document.createElement("div");
    $imageInfo.classList.add("imageInfo", "hidden");
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
