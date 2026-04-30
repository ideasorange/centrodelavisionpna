# Footer Main

Organism component: main footer area with a title and responsive grid content.

## Props

| Prop     | Type   | Required | Description                          |
|---------|--------|----------|--------------------------------------|
| `title` | string | No       | Main footer heading text.           |
| `image` | string | No       | Optional logo image URL (not used by default). |
| `target`| string | No       | Optional link URL for the logo.     |

## Slots

| Slot     | Description                                |
|----------|--------------------------------------------|
| `content`| Area for one or more footer content blocks.|

The `content` slot is rendered inside a responsive CSS grid so you can drop in multiple blocks (e.g. menus, contact info, social icons). On mobile it is a single column, on larger screens it becomes 2–3 columns.

## Example

```twig
{% embed 'iobase:footer_main' with {
  title: 'Centro de la Visión Paraná'|t
} %}
  {% block content %}
    <div>
      {% include 'iobase:heading' with {
        text: 'Contacto'|t,
        level: 'h3'
      } %}
      <p class="footer-text">Av. Siempre Viva 123<br>Paraná, Entre Ríos</p>
    </div>

    <div>
      {% include 'iobase:heading' with {
        text: 'Redes sociales'|t,
        level: 'h3'
      } %}
      <ul class="footer-social-list">
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
    </div>
  {% endblock %}
{% endembed %}
```

## BEM Structure

```text
.footer-main__wrapper   // outer background, full-width
.footer-main            // inner constrained container
.footer-main__top       // title/logo area
.footer-main__title     // main footer heading
.footer-main__divider   // horizontal divider line
.footer-main__bottom    // responsive grid for blocks
```
