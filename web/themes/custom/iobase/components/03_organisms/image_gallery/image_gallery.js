/**
 * @file
 * Splide main gallery + synced thumbnails (https://splidejs.com/tutorials/thumbnails/).
 */

(function (Drupal, once) {
  Drupal.behaviors.iobaseImageGallery = {
    attach(context) {
      const roots = once('iobase-image-gallery', '.js-image-gallery', context);

      roots.forEach((root) => {
        const mainEl = root.querySelector('.js-image-gallery__main');
        const thumbsEl = root.querySelector('.js-image-gallery__thumbs');

        if (!mainEl || !thumbsEl || typeof Splide === 'undefined') {
          return;
        }

        const main = new Splide(mainEl, {
          type: 'fade',
          rewind: true,
          pagination: false,
          arrows: true,
        });

        const thumbnails = new Splide(thumbsEl, {
          fixedWidth: 100,
          fixedHeight: 72,
          gap: 10,
          rewind: true,
          pagination: false,
          isNavigation: true,
          arrows: false,
          breakpoints: {
            600: {
              fixedWidth: 72,
              fixedHeight: 52,
            },
          },
        });

        main.sync(thumbnails);
        main.mount();
        thumbnails.mount();
      });
    },
  };
})(Drupal, once);
