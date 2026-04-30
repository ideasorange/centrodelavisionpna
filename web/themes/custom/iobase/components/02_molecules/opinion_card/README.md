# Opinion card (`opinion_card`)

Testimonial-style card: optional circular icon (SVG URL) on the top border, opinion text, optional star characters, and the person’s name at the bottom. Styled for use on dark or photographic backgrounds (frosted panel, white border, centered text).

## Props

| Prop | Required | Description |
|------|----------|-------------|
| `full_name` | Yes | Shown as `- Full name -` at the bottom. |
| `opinion` | Yes | Plain text. Line breaks are preserved (`nl2br`). Schema `maxLength` is **500**; mirror that with a Drupal field max length. |
| `svg_url` | No | URL to an SVG (or image) displayed in a circle centered on the top edge of the card. Omit or leave empty to hide the icon. |
| `stars` | No | Free text for rating display, e.g. `★★★★★` (Unicode U+2605) from a plain text field. |
| `appearance` | No | `filled` (default) = solid blue panel + shadow; `transparent` = no fill, white border and text only (for use on photos or colored sections). |

## PHP example

```php
$build['opinion'] = [
  '#type' => 'component',
  '#component' => 'iobase:opinion_card',
  '#props' => [
    'full_name' => $node->get('field_full_name')->value,
    'opinion' => $node->get('field_opinion')->value,
    'svg_url' => $svg_public_url ?? '',
    'stars' => $node->get('field_stars')->value ?? '',
    'appearance' => 'transparent', // or 'filled'
  ],
];
```

## Content model notes

- **Opinion:** Use a plain text or long text field with a **500** character limit and no HTML (or a text format that strips markup).
- **Stars:** A short **text** field; editors can paste star characters or type them.
- **SVG URL:** Typically a file or link field resolved to a public URL passed into `svg_url`.

## Assets

- Component CSS is compiled from `opinion_card.scss` to `opinion_card.css` next to this folder. After SCSS changes, run `npm run build` in the theme directory.
