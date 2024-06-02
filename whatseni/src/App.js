import ImageInfo from "./ImageInfo.js";
import SearchInput from "./SearchInput.js";
import SearchResult from "./SearchResult.js";
import DarkMode from "./DarkMode.js";
import Loading from "./Loading.js";
import { api } from "./api.js";

export default class App {
  constructor($target) {
    this.$appMainTarget = $target;
    this.showCatdataList = []; // 표시될 고양이 데이터

    this.searchInput = new SearchInput({
      $target,
      onSearch: (keyword) => {
        this.showLoading();
        api.fetchCats(keyword).then(({ data }) => {
          console.log(data);
          this.setState(data);
          this.hideLoading();
        });
      }
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: [],
      onClick: (image) => {
        this.imageInfo.setState({
          visible: true,
          image
        });
      }
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null
      },
      onClose: () => {
        this.imageInfo.setState({
          visible: false,
          image: null
        });
      }
    });

    this.darkMode = new DarkMode({ $target });
    this.loading = new Loading({ $target });

    this.render();
  }

  setState(nextData) {
    this.showCatdataList = nextData;
    this.searchResult.setState(nextData);
  }

  showLoading() {
    this.loading.show();
  }

  hideLoading() {
    this.loading.hide();
  }

  render() {
  }
}
