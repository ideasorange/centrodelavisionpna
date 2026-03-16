# Subheading

Atom component: Supporting text typically used below a heading.

## Props

| Prop  | Type   | Required | Default | Description     |
|-------|--------|----------|---------|-----------------|
| `text`| string | Yes      | —       | Subheading content. |
| `tag` | string | No       | `p`     | Wrapper: `p` or `span`. |

## Example

```twig
{% include 'iobase:heading' with {
  text: 'Section Title'|t,
  level: 'h2'
} %}

{% include 'iobase:subheading' with {
  text: 'Supporting description or lead paragraph.'|t
} %}
```

## BEM

- `.subheading` — block
