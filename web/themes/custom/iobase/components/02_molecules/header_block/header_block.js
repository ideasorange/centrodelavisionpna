(function (Drupal, once) {
  Drupal.behaviors.headerBlock = {
    attach(context) {
      const headers = once('header-block', '.js-header-block', context);

      headers.forEach((header) => {
        // Trigger load animation after a brief delay for smooth entrance
        requestAnimationFrame(() => {
          setTimeout(() => {
            header.classList.add('header-block--loaded');
          }, 100);
        });
      });
    },
  };

})(Drupal, once);
