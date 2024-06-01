class Loading {
    $loading = null;
    data = null;

    constructor({ $target, data }){
        const $loading = document.createElement("div");
        $loading.className = "Loading";
        this.$loading = $loading;

        this.data = data;


        $loading.style.display = data.visible ? 'block' : 'none';
        $target.appendChild($loading);

        this.render();
    }

    setLoading(visible) {
        this.data.visible = visible;
        this.$loading.style.display = visible ? 'block' : 'none';
    }

    render() {
        this.$loading.innerHTML = `<div class="loading-text">loading</div>`;
    }
}