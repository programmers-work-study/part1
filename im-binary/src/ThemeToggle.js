class ThemeToggle {
    constructor({ $target }) {
      const $ThemToggle = document.createElement("input");
      this.$ThemToggle = $ThemToggle;
      $ThemToggle.type = "checkbox";
      $ThemToggle.className = "ThemeToggle";
      $target.appendChild($ThemToggle);

      // 처음에 시스템 값 따라가도록 설정 
      const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

        if(isDarkMode) {
            $ThemToggle.checked = true;
        }

      $ThemToggle.addEventListener("click",() => {
          const body = document.body.style;
          const contentWrapper = document.querySelector(".content-wrapper");
          console.log(contentWrapper,"contentWrapper");
            if($ThemToggle.checked === true) {
                body.background = "#000";
                body.color = "#fff";
                contentWrapper.background = "#000";
            } else{
                body.background = "#fff";
                body.color = "#000";
            }
        });
    }
    render() {}
}
  
  