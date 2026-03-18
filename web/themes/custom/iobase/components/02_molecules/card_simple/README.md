# Card Simple

Molecule: simple card with title, description, and image.

## Props

| Prop           | Type   | Required | Description                                       |
|----------------|--------|----------|---------------------------------------------------|
| `title`        | string | Yes      | Card title.                                      |
| `description`  | string | Yes      | Card body text.                                  |
| `image`        | string | Yes      | Image URL (e.g. `/sites/default/files/card.png`).|
| `alt`          | string | No       | Alt text for accessibility.                      |

## Example

```twig
{% include 'iobase:card_simple' with {
  title: 'Book Your Appointment Schedule Today'|t,
  description: 'Book your appointment today for expert medical & personalized treatment, compassionate support.'|t,
  image: '/sites/default/files/card-image.png',
  alt: 'Doctor with patient'
} %}
```

## BEM

- `.card-simple` — block
- `.card-simple__inner` — layout wrapper
- `.card-simple__header` — text header
- `.card-simple__eyebrow` — small pill label ("Booking")
- `.card-simple__title` — card title
- `.card-simple__description` — body text
- `.card-simple__image-wrapper` — image container
- `.card-simple__image` — image element
