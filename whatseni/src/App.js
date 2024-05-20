import DarkModeButton from "./DarkMode.js";
import ImageInfo from "./ImageInfo.js";
import SearchInput from "./SearchInput.js";
import SearchResult from "./SearchResult.js";
import { api } from "./api.js";

export default class App {
  $target = null;
  data = [];

  constructor($target) {
    this.$target = $target;

    this.searchInput = new SearchInput({
      $target,
      onSearch: keyword => {
        api.fetchCats(keyword).then(({ data }) => this.setState(data));
      }
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: image => {
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
      }
    });

    this.darkModeToggle = new DarkModeButton({
      $target,
      onToggle: event => {
        event.preventDefault();
        console.log(event)
        event.target.checked ? this.darkModeToggle.setState(true) : this.darkModeToggle.setState(false);
      }
    })
  }

  setState(nextData) {
    this.data = nextData;
    this.searchResult.setState(nextData);
  }
}
