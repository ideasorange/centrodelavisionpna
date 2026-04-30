# CTA

Atom component: Call To Action link styled as a button.

## Usage

Use this component for primary, secondary and tertiary CTAs throughout the site. Supports both internal Drupal paths and external URLs.

### Props

| Prop         | Type   | Required | Default   | Description                                         |
|--------------|--------|----------|-----------|-----------------------------------------------------|
| `title`      | string | Yes      | —         | Button text.                                        |
| `url`        | string | Yes      | —         | Internal or external URL.                           |
| `variant`    | string | No       | `primary` | `primary`, `secondary`, `tertiary`, `primary-outline`, `secondary-outline`, `tertiary-outline` (legacy `outline` also supported). |
| `target`     | string | No       | `_self`   | `_self` or `_blank` (opens in new tab).             |
| `color`      | string | No       | —         | Custom background/border color (CSS value).         |
| `text_color` | string | No       | —         | Custom text color (CSS value, primary variant only).|

### Example (Twig embed)

Primary CTA:

```twig
{% embed 'iobase:cta' with {
  title: 'Learn More'|t,
  url: '/about-us',
  variant: 'primary'
} %}{% endembed %}
```

Secondary outline CTA with external link:

```twig
{% embed 'iobase:cta' with {
  title: 'Visit Our Partner'|t,
  url: 'https://example.com',
  variant: 'secondary-outline',
  target: '_blank'
} %}{% endembed %}
```

Custom colors:

```twig
{% embed 'iobase:cta' with {
  title: 'Book Now'|t,
  url: '/booking',
  variant: 'primary',
  color: '#e91e63',
  text_color: '#ffffff'
} %}{% endembed %}
```

### Variants

- **primary**: Filled button with theme primary color.
- **secondary**: Filled button with theme secondary color.
- **tertiary**: Filled button with neutral dark color.
- **primary-outline**: Primary outline button; fills on hover.
- **secondary-outline**: Secondary outline button; fills on hover.
- **tertiary-outline**: Tertiary outline button; fills on hover.
- **outline**: Legacy alias for `primary-outline`.
