# Social Icon

Atom component: Social media icon-only link using Ionicons.

## Props

| Prop    | Type   | Required | Default | Description                                         |
|---------|--------|----------|---------|-----------------------------------------------------|
| `url`   | string | Yes      | —       | Link to the social profile or share URL.            |
| `icon`  | string | Yes      | —       | Ionicon name (e.g. `logo-facebook`, `logo-instagram`). |
| `label` | string | No       | —       | Accessible label (e.g. "Follow us on Facebook").   |
| `target`| string | No       | `_blank`| `_self` or `_blank`.                                |

## Example

```twig
<ul class="social-list">
  <li>
    {% include 'iobase:social_icon' with {
      url: 'https://facebook.com/centrodelavision',
      icon: 'logo-facebook',
      label: 'Facebook'
    } %}
  </li>
  <li>
    {% include 'iobase:social_icon' with {
      url: 'https://instagram.com/centrodelavision',
      icon: 'logo-instagram',
      label: 'Instagram'
    } %}
  </li>
</ul>
```

## BEM

- `.social-icon` — block (link wrapper)
- `.social-icon__icon` — element (icon container)
