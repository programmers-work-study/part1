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
        try{
          this.loading.setLoading(true);
          const { data } = await api.fetchCats(keyword);
          this.setState(data);
        } catch(e){
          console.error(e);
        } finally{
          this.loading.setLoading(false);
        }
      },
      onRandom: async () => {
        try {
          this.loading.setLoading(true);
          const { data } = await api.fetchRandomCats();
          this.setState(data);
        } catch(e){
          console.error(e);
        } finally{
          this.loading.setLoading(false);
        }
      }
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: async image => {
        try{
          this.loading.setLoading(true);
          const { data } = await api.fetchCatDetail(image.id);
          this.imageInfo.setState({
            visible: true,
            image: data
          });
        } catch(e){
          console.error(e);
        } finally{
          this.loading.setLoading(false);
        }
      }
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null
      }
    });

    this.loading = new Loading({
      $target,
      data: {
        visible: false,
      }
    });
  }

  setState(nextData) {
    console.log(this);
    this.data = nextData;
    this.searchResult.setState(nextData);
  }
}
