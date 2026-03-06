(function(Drupal) {

  Drupal.behaviors.mainMenu = {
    attach(context) {

      // const $hamburger = document.getElementById('hamburger');
      const $mainMenu = document.querySelector(".navigation-menu");
      const $hamburger = document.querySelector(".hamburger");

      window.addEventListener("resize", (event) => {
        $mainMenu.classList.remove('open');
        $hamburger.classList.remove('open');
      })
    },
  };

})(Drupal);
