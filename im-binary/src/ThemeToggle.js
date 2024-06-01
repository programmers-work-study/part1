class ThemeToggle {
    constructor({ $target }) {
        const $ThemToggle = document.createElement("input");
        this.$ThemToggle = $ThemToggle;
        $ThemToggle.type = "checkbox";
        $ThemToggle.className = "ThemeToggle";
        $target.appendChild($ThemToggle);
        
        const $body = document.body;

        // 처음에 시스템 값 따라가도록 설정 
        const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      
        if(isDarkMode) {
            $ThemToggle.checked = true;
            $body.dataset.theme = "dark";
        }
        
        $ThemToggle.addEventListener("click",() => {
            if($ThemToggle.checked === true) {
                $body.dataset.theme = "dark";
            } else{
                $body.dataset.theme = "light";
            }
        });
    }
    render() {}
}
