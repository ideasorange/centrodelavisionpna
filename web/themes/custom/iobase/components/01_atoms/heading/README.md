# Heading

Atom component: Semantic heading with configurable level (h1–h4).

## Props

| Prop   | Type   | Required | Default | Description        |
|--------|--------|----------|---------|--------------------|
| `text` | string | Yes      | —       | Heading content.   |
| `level`| string | No       | `h2`    | `h1`, `h2`, `h3`, or `h4`. |

## Example

```twig
{% include 'iobase:heading' with {
  text: 'Page Title'|t,
  level: 'h1'
} %}

{% include 'iobase:heading' with {
  text: 'Section Title'|t,
  level: 'h2'
} %}
```

## BEM

- `.heading` — block
- `.heading--h1`, `.heading--h2`, `.heading--h3`, `.heading--h4` — level modifiers
