console.log("app is running!");

class App {
  $target = null;
  data = [];
  
  constructor($target) {
    this.$target = $target;

    this.themeToggle = new ThemeToggle({
      $target,
    })

    this.searchInput = new SearchInput({
      $target,
      onSearch: async keyword => {
          const { data } = await api.fetchCats(keyword);
          this.setState(data);
      },
      onRandom: async () => {
          const { data } = await api.fetchRandomCats();
          this.setState(data);
      }
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: async image => {
          this.imageInfo.setState({
            visible: true,
            image: await api.fetchCatDetail(image.id),
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
  }

  setState(nextData) {
    console.log(this);
    this.data = nextData;
    this.searchResult.setState(nextData);
  }
}
