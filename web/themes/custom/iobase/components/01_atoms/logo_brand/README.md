# Logo Brand

Atom component: brand logo with configurable image and link.

## Props

| Prop   | Type   | Required | Default | Description                                      |
|--------|--------|----------|---------|--------------------------------------------------|
| `image`| string | Yes      | —       | Logo image URL.                                  |
| `alt`  | string | No       | `Home` | Alt text for accessibility.                      |
| `url`  | string | No       | front  | Target URL (front page if omitted).              |

## Example

```twig
{% include 'iobase:logo_brand' with {
  image: '/sites/default/files/logo_outlined.png',
  alt: 'Centro de la Visión Paraná',
  url: '/'  %}
%}
```

You can reuse this atom in the header, footer, or any other component that needs to display the brand logo.

## BEM

- `.logo-brand` — block (link wrapper)
- `.logo-brand__image` — element (logo `<img>`)
