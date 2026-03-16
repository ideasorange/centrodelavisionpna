# Hero Banner Front

Molecule component: Hero banner designed for the front page with a two-column layout, decorative background shape, and smooth entrance animation.

## Usage

Use this component as the main hero section on the homepage. It displays content on the left and an image on the right (stacked on mobile).

### Props

| Prop               | Type   | Required | Default   | Description                                      |
|--------------------|--------|----------|-----------|--------------------------------------------------|
| `eyebrow`          | string | No       | —         | Small text above the heading.                    |
| `heading`          | string | Yes      | —         | Main H1 heading.                                 |
| `description`      | string | No       | —         | Supporting paragraph text.                       |
| `main_image.src`   | string | No       | —         | URL to the image (e.g. `/sites/default/files/hero.png`). |
| `main_image.alt`   | string | No       | —         | Alt text for accessibility.                      |
| `background_color` | string | No       | `#F7F9FB` | Custom background color (CSS value).             |

### Slots

| Slot  | Description                               |
|-------|-------------------------------------------|
| `cta` | Slot for one or more CTA atom components. |

### Example

```twig
{% embed 'iobase:hero_banner_front' with {
  eyebrow: 'Bienvenidos'|t,
  heading: 'Cuidado Personalizado para tu Visión'|t,
  description: 'Experiencia profesional y atención personalizada.'|t,
  main_image: {
    src: '/sites/default/files/hero-doctors.png',
    alt: 'Nuestro equipo médico'
  }
} %}
  {% block cta %}
    {% include 'iobase:cta' with {
      title: 'Discover More'|t,
      url: '/about-us',
      variant: 'primary'
    } %}

    {% include 'iobase:cta' with {
      title: 'Contact Us'|t,
      url: '/contact',
      variant: 'outline'
    } %}
  {% endblock %}
{% endembed %}
```

### Features

- **Full-width layout**: Uses `%breakContainer` to extend beyond parent container.
- **Responsive layout**: Two columns on tablet+, stacked on mobile (image on top).
- **Decorative shape**: Subtle curved gradient shape in the background.
- **Entrance animation**: Content and image fade in on load (BEM modifier `--loaded`).
- **Drupal integration**: `main_image` slot accepts Drupal render arrays directly.

### BEM Structure

```
.hero-banner-front              // Block
.hero-banner-front__shape       // Element: decorative background shape
.hero-banner-front__inner       // Element: content container
.hero-banner-front__content     // Element: text content wrapper
.hero-banner-front__eyebrow     // Element: eyebrow text
.hero-banner-front__eyebrow-icon // Element: eyebrow icon
.hero-banner-front__heading     // Element: main heading
.hero-banner-front__description // Element: description paragraph
.hero-banner-front__cta-wrapper // Element: CTA buttons wrapper
.hero-banner-front__image       // Element: image wrapper
.hero-banner-front--loaded      // Modifier: animation loaded state
```
