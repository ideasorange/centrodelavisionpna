(function(Drupal) {

  Drupal.behaviors.hamburgerIcon = {
    attach(context) {
      const $hamburger = document.querySelector(".hamburger");
      const $menu_name = $hamburger.getAttribute('data-menu');
      const $menu = document.querySelector("." + $menu_name);
      console.log($menu_name);

      $hamburger.addEventListener("click", function() {
        $hamburger.classList.toggle('open');
        $menu.classList.toggle('open');
      });
    },
  };

})(Drupal);
