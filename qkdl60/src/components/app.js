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
//TODO 정리 필요, 컴포넌트 의존성 및 상태 변경 관리 필요
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
        api.fetchCats(keyword).then(({data}) => {
          this.setState(data);
        });
        //TODO 분리 필요
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

    const $searchHistory = document.createElement("div");
    $searchHistory.classList.add("SearchHistory");
    $header.appendChild($searchHistory);
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

    const initialData = storage.get(STORE_KEY_SEARCH_RESULT);
    this.data = initialData ? initialData : [];
    this.searchResult = new SearchResult({
      $target,
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
