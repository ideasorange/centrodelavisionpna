(function (Drupal) {

  Drupal.behaviors.ctaWhatsapp = {
    attach(context) {
      // Optional: add analytics or tracking when the CTA is clicked.
      const links = context.querySelectorAll('.cta-whatsapp[href^="https://wa.me/"]');
      links.forEach((link) => {
        if (link.dataset.ctaWhatsappInitialized) {
          return;
        }
        link.dataset.ctaWhatsappInitialized = 'true';
        link.addEventListener('click', () => {
          // Placeholder for tracking, e.g. GTM or custom analytics.
        });
      });
    },
  };

})(Drupal);
