(function (Drupal, once) {

  Drupal.behaviors.heroBannerFront = {
    attach(context) {
      const heroes = once('hero-banner-front', '.js-hero-banner-front', context);

      heroes.forEach((hero) => {
        // Trigger load animation after a brief delay for smooth entrance
        requestAnimationFrame(() => {
          setTimeout(() => {
            hero.classList.add('hero-banner-front--loaded');
          }, 100);
        });
      });
    },
  };

})(Drupal, once);
