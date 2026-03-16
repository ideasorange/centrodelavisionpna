# Color Palette

Atom component: Displays a color swatch (rectangle box) with a label below, for showing the color palette to the client.

## Props

| Prop   | Type   | Required | Description                                      |
|--------|--------|----------|--------------------------------------------------|
| `color`| string | Yes      | HTML color code (e.g. `#1E6FA8`, `rgb(30, 111, 168)`). |
| `text` | string | Yes      | Label displayed below the color box.             |

## Example

```twig
{% include 'iobase:color_palette' with {
  color: '#1E6FA8',
  text: 'Primary'|t
} %}

{% include 'iobase:color_palette' with {
  color: '#2BB3A3',
  text: 'Secondary'|t
} %}
```

## BEM

- `.color-palette` — block (wrapper)
- `.color-palette__swatch` — element (rectangle with the color)
- `.color-palette__label` — element (text below)
