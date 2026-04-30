(function (Drupal, once) {
  let escapeListenerAttached = false;
  let panelIdCounter = 0;

  /**
   * @param {HTMLElement} root
   * @param {{ focusToggle?: boolean }} options
   */
  function closeCtaBlock(root, options) {
    const focusToggle = options && options.focusToggle;
    const toggle = root.querySelector('[data-cta-block-toggle]');
    const panel = root.querySelector('[data-cta-block-panel]');
    const backdrop = root.querySelector('[data-cta-block-backdrop]');

    root.classList.remove('is-open');
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'false');
      if (focusToggle) {
        toggle.focus();
      }
    }
    if (backdrop) {
      backdrop.setAttribute('aria-hidden', 'true');
    }
    if (panel) {
      panel.setAttribute('aria-hidden', 'true');
    }
  }

  function closeOtherCtaBlocks(activeRoot) {
    document.querySelectorAll('.cta-block.is-open').forEach((other) => {
      if (other !== activeRoot) {
        closeCtaBlock(other);
      }
    });
  }

  if (!escapeListenerAttached) {
    escapeListenerAttached = true;
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') {
        return;
      }
      const openRoots = document.querySelectorAll('.cta-block.is-open');
      if (!openRoots.length) {
        return;
      }
      const focusTarget = openRoots[0].querySelector('[data-cta-block-toggle]');
      openRoots.forEach((root) => {
        closeCtaBlock(root);
      });
      if (focusTarget) {
        focusTarget.focus();
      }
    });
  }

  Drupal.behaviors.ctaBlock = {
    attach(context) {
      const roots = once('cta-block', '.cta-block', context);

      roots.forEach((root) => {
        const toggle = root.querySelector('[data-cta-block-toggle]');
        const panel = root.querySelector('[data-cta-block-panel]');
        const backdrop = root.querySelector('[data-cta-block-backdrop]');

        if (!toggle || !panel || !backdrop) {
          return;
        }

        if (!panel.id) {
          panel.id = `cta-block-panel-${++panelIdCounter}`;
        }
        toggle.setAttribute('aria-controls', panel.id);

        const setOpen = (open) => {
          if (open) {
            closeOtherCtaBlocks(root);
          }

          if (!open) {
            closeCtaBlock(root, { focusToggle: true });
            return;
          }

          root.classList.add('is-open');
          toggle.setAttribute('aria-expanded', 'true');
          backdrop.setAttribute('aria-hidden', 'false');
          panel.setAttribute('aria-hidden', 'false');
        };

        toggle.addEventListener('click', () => {
          setOpen(!root.classList.contains('is-open'));
        });

        backdrop.addEventListener('click', () => {
          if (root.classList.contains('is-open')) {
            setOpen(false);
          }
        });
      });
    },
  };
}(Drupal, once));
