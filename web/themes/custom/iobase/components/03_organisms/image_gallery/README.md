# Image gallery (`image_gallery`)

Splide main carousel + synced thumbnails ([Splide tutorial](https://splidejs.com/tutorials/thumbnails/)).

## Props (plain text — UI Patterns friendly)

| Prop | Description |
|------|-------------|
| `heading`, `subheading` | Optional titles above the gallery. |
| `image_1_url` … `image_10_url` | Full URL or site path (e.g. `/sites/default/files/galeria/foto1.jpg`). **Leave empty to skip that slot.** |
| `image_1_alt` … `image_10_alt` | Alt text for each image (recommended for accessibility). |

Slots are ordered 1 → 10. You can use only the first three URLs and leave the rest blank.

## PHP example

```php
$build['gallery'] = [
  '#type' => 'component',
  '#component' => 'iobase:image_gallery',
  '#props' => [
    'heading' => $this->t('Our center'),
    'image_1_url' => '/sites/default/files/building/front.jpg',
    'image_1_alt' => $this->t('Front entrance'),
    'image_2_url' => '/sites/default/files/building/hall.jpg',
    'image_2_alt' => $this->t('Main hall'),
  ],
];
```

## Assets

- Splide: `iobase/splide` in `iobase.libraries.yml`.
- After SCSS edits: `npm run build` in the theme directory (or your Gulp workflow).
