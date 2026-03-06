(function (Drupal, once) {

  Drupal.behaviors.heroBanner = {
    attach(context) {
      once('heroBanner', '.js-hero-banner', context).forEach((banner) => {

        const images = banner.querySelectorAll('img');
        let loadedImages = 0;

        if (!images.length) {
          banner.classList.add('is-loaded');
          return;
        }

        const onImageLoad = () => {
          loadedImages++;

          if (loadedImages === images.length) {
            banner.classList.add('is-loaded');
          }
        };

        images.forEach((img) => {
          if (img.complete) {
            onImageLoad();
          }
          else {
            img.addEventListener('load', onImageLoad, { once: true });
            img.addEventListener('error', onImageLoad, { once: true });
          }
        });

      });
    },
  };

})(Drupal, once);
