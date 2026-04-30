# Form Contact

Organism component: contact section with optional content/card area and a webform.

## Props

| Prop          | Type   | Required | Description                          |
|---------------|--------|----------|--------------------------------------|
| `title`       | string | No       | Heading for the contact section.     |
| `description` | string | No       | Supporting text above the form.      |
| `layout`      | string | No       | Layout variant: `content_form` (default) or `form_content`. |
| `background_variant` | string | No | Background variant: `mint` (default), `white`, `light`, `dark`, `none`. |
| `background_color` | string | No | Any CSS color value; overrides `background_variant`. |

## Slots

| Slot      | Description                                                   |
|-----------|---------------------------------------------------------------|
| `content` | Area for cards, contact info, or other components.            |
| `form`    | Webform or other form; UI Patterns should provide `form`.     |

By default, the `form` slot prints the `form` variable provided by UI Patterns:

```twig
{% block form %}
  {{ form }}
{% endblock %}
```

## Usage with UI Patterns

In your UI Patterns configuration, map the webform field to the `form` slot so that the rendered form is available as `form` in the template.

Example usage in a Twig template:

```twig
{% embed 'iobase:form_contact' with {
  title: 'Request an Appointment'|t,
  description: 'Complete the form and we will contact you shortly.'|t,
  layout: 'content_form',
  background_variant: 'mint',
  # background_color: '#F1FCF9', # optional override
} %}
  {% block content %}
    {# Place cards or other atoms here, e.g. phone, address, opening hours #}
  {% endblock %}

  {# Optionally override the form slot; by default it just prints {{ form }} #}
  {% block form %}
    {{ form }}
  {% endblock %}
{% endembed %}
```

## BEM

- `.form-contact` — block (outer section)
- `.form-contact__inner` — grid container
- `.form-contact__content` — text/card column
- `.form-contact__title` — heading
- `.form-contact__description` — supporting text
- `.form-contact__content-slot` — wrapper for content slot
- `.form-contact__form` — form column/card
