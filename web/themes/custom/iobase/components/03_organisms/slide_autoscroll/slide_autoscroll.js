/**
 * @file
 * Splide AutoScroll + Intersection for slide_autoscroll SDC.
 */

(function (Drupal, once) {
  const BEHAVIOR = 'iobase-slide-autoscroll';

  function prefersReducedMotion() {
    return (
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }

  function moveSlotChildrenToSlides(root) {
    const slot = root.querySelector('.js-slide-autoscroll__slot');
    const list = root.querySelector('.js-slide-autoscroll__list');
    if (!slot || !list) {
      return false;
    }

    const children = Array.from(slot.children);
    if (children.length === 0) {
      slot.remove();
      return false;
    }

    children.forEach((node) => {
      const li = document.createElement('li');
      li.className = 'splide__slide';
      li.appendChild(node);
      list.appendChild(li);
    });

    slot.remove();
    return true;
  }

  Drupal.behaviors.iobaseSlideAutoscroll = {
    attach(context) {
      const roots = once(BEHAVIOR, '.js-slide-autoscroll', context);

      roots.forEach((root) => {
        const splideEl = root.querySelector('.js-slide-autoscroll__splide');
        if (!splideEl || typeof Splide === 'undefined') {
          return;
        }

        if (!moveSlotChildrenToSlides(root)) {
          splideEl.setAttribute('hidden', '');
          return;
        }

        const reduced = prefersReducedMotion();
        const extensions =
          typeof window.splide !== 'undefined' &&
          window.splide.Extensions &&
          !reduced
            ? window.splide.Extensions
            : undefined;

        const options = {
          type: 'loop',
          drag: 'free',
          autoWidth: true,
          gap: '1.5rem',
          arrows: false,
          pagination: false,
        };

        if (extensions) {
          Object.assign(options, {
            autoScroll: {
              speed: 0.85,
              pauseOnHover: true,
              pauseOnFocus: true,
            },
            intersection: {
              inView: { autoScroll: true },
              outView: { autoScroll: false },
            },
          });
        }

        const splide = new Splide(splideEl, options);

        if (extensions) {
          splide.mount(extensions);
        } else {
          splide.mount();
        }

        root._slideAutoscrollSplide = splide;
      });
    },

    detach(context) {
      context.querySelectorAll('.js-slide-autoscroll').forEach((root) => {
        const splide = root._slideAutoscrollSplide;
        if (splide && typeof splide.destroy === 'function') {
          splide.destroy(true);
        }
        root._slideAutoscrollSplide = null;
      });
      once.remove(BEHAVIOR, '.js-slide-autoscroll', context);
    },
  };
})(Drupal, once);
