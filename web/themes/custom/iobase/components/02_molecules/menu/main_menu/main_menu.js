(function (Drupal, once) {

  Drupal.behaviors.mainMenu = {
    attach(context) {
      once('mainMenu', '.navigation-menu', context).forEach(($mainMenu) => {
        const $hamburger = $mainMenu.previousElementSibling?.classList?.contains('hamburger')
          ? $mainMenu.previousElementSibling
          : document.querySelector('.hamburger');

        window.addEventListener('resize', () => {
          $mainMenu.classList.remove('open');
          $hamburger?.classList.remove('open');
        });

        $mainMenu.addEventListener('click', (e) => {
          const link = e.target.closest('a');
          if (!link || !$mainMenu.contains(link)) {
            return;
          }
          $mainMenu.classList.remove('open');
          $hamburger?.classList.remove('open');
        });
      });
    },
  };

})(Drupal, once);
