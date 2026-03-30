# Slide autoscroll (`slide_autoscroll`)

Horizontal **Splide** track with **AutoScroll** and **Intersection** extensions. Put any components (or markup) in the slot: each **direct child** of the slot becomes one slide. The strip scrolls continuously when in view; it pauses when off-screen or when the user prefers reduced motion.

## Props

| Prop | Required | Description |
|------|----------|-------------|
| `heading` | No | Optional section title above the strip. |
| `subheading` | No | Optional supporting line under the heading. |

## Slot

| Slot | Description |
|------|-------------|
| `scrolling_content` | Place one or more blocks or components here. **Each top-level child** is wrapped as a Splide slide. Empty slot hides the carousel behavior. |

## Behavior (JavaScript)

- On attach, children of the hidden slot are moved into `ul.splide__list` as `li.splide__slide` items, then the slot is removed.
- Splide options include `type: 'loop'`, `drag: 'free'`, `autoWidth: true`, no arrows/pagination.
- If **Splide extensions** are available and the user does **not** prefer reduced motion: **AutoScroll** (speed, pause on hover/focus) and **Intersection** (pause autoscroll when the carousel leaves the viewport).
- If extensions are missing or reduced motion is preferred: Splide still mounts without autoscroll extensions.

## PHP example

Pass the slot as `#slots['scrolling_content']` or as a child key named `scrolling_content`. The slot must render **multiple sibling elements** (one per slide): use a render array with several child keys.

```php
$build['strip'] = [
  '#type' => 'component',
  '#component' => 'iobase:slide_autoscroll',
  '#props' => [
    'heading' => $this->t('Partners'),
    'subheading' => $this->t('Organizations we work with'),
  ],
  '#slots' => [
    'scrolling_content' => [
      'partner_a' => [
        '#type' => 'component',
        '#component' => 'iobase:card_simple',
        '#props' => [
          'title' => 'Partner A',
          'description' => '…',
          'image' => '/sites/default/files/partner-a.jpg',
          'alt' => '',
        ],
      ],
      'partner_b' => [
        '#type' => 'component',
        '#component' => 'iobase:card_simple',
        '#props' => [
          'title' => 'Partner B',
          'description' => '…',
          'image' => '/sites/default/files/partner-b.jpg',
          'alt' => '',
        ],
      ],
    ],
  ],
];
```

Alternatively, omit `#slots` and place `scrolling_content` as a direct child of the component render array (same structure as inside `#slots` above). For Layout Builder, UI Patterns, or Twig `embed`, ensure the slot outputs multiple top-level nodes so the JavaScript can wrap each in a `splide__slide`.

## Assets

- **Libraries** (declared in `slide_autoscroll.component.yml` and `iobase.libraries.yml`):
  - `iobase/splide`
  - `iobase/splide_extension_auto_scroll`
  - `iobase/splide_extension_intersection`
- **Behavior:** `slide_autoscroll.js` (Drupal `attach` / `detach` with `once`).
- After SCSS changes: `npm run build` in the theme directory.
