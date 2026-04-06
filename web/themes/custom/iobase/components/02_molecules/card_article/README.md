# Card article (`card_article`)

Molecule: article teaser card with optional image (`field_image`), tag pills (`field_tags`), a **linked title**, and a **Read more** link—both point to the full node. Visual layout matches the design reference (white panel, light border, rounded corners, image on top, pill tags, underlined Read more with arrow).

## Props

| Prop | Required | Type | Description |
|------|----------|------|-------------|
| `title` | Yes | string | Article title; rendered as a link to `url`. |
| `url` | Yes | string | Canonical path or absolute URL for the article node. |
| `field_image` | No | string | Public URL of the teaser image. Omit or empty to hide the image region. |
| `field_image_alt` | No | string | Alt text for the image. |
| `field_tags` | No | string[] | List of tag labels (e.g. taxonomy term names from `field_tags`). |
| `read_more_label` | No | string | Footer link text. Default: `Read More`. Pass a translated string in Drupal (`|t` in PHP). |

## BEM

- `.card-article` — block
- `.card-article__inner` — layout wrapper
- `.card-article__media` / `__media-link` / `__image` — top image area
- `.card-article__content` — padded body
- `.card-article__tags` / `__tag-item` / `__tag` — tag list and pills
- `.card-article__title` / `__title-link` — heading + link
- `.card-article__read-more` / `__read-more-text` / `__read-more-icon` — Read more link

## PHP example (article node)

```php
use Drupal\Core\Url;

/** @var \Drupal\node\NodeInterface $node */
$node = …;
$url = $node->toUrl()->toString();

$img_url = '';
$img_alt = '';
if (!$node->get('field_image')->isEmpty()) {
  $file = $node->get('field_image')->entity;
  if ($file) {
    $img_url = \Drupal::service('file_url_generator')->generateAbsoluteString($file->getFileUri());
    $img_alt = $node->get('field_image')->alt ?? '';
  }
}

$tags = [];
foreach ($node->get('field_tags')->referencedEntities() as $term) {
  $tags[] = $term->getName();
}

$build['card'] = [
  '#type' => 'component',
  '#component' => 'iobase:card_article',
  '#props' => [
    'title' => $node->getTitle(),
    'url' => $url,
    'field_image' => $img_url,
    'field_image_alt' => $img_alt,
    'field_tags' => $tags,
    'read_more_label' => (string) t('Read More'),
  ],
];
```

## Twig example

```twig
{% include 'iobase:card_article' with {
  title: node.label,
  url: url('entity.node.canonical', { 'node': node.id }),
  field_image: image_url,
  field_image_alt: image_alt|default(''),
  field_tags: tag_labels,
  read_more_label: 'Read More'|t,
} %}
```

## Assets

Styles are compiled from `card_article.scss` to `card_article.css` beside this folder. After SCSS changes, run `npm run build` in the theme directory (`web/themes/custom/iobase`).
