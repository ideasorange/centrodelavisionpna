# CTA Whatsapp

Atom component: button/link that opens WhatsApp Web in a new tab.

## Usage

Use this component wherever you need a “Chat on WhatsApp” or similar CTA. Pass a phone number (with country code, no `+` or spaces) and a label. Optionally set `variant` to `primary` or `secondary` and a `pre_message` to pre-fill the chat.

### Props

| Prop           | Type   | Required | Default    | Description                                      |
|----------------|--------|----------|------------|--------------------------------------------------|
| `label`        | string | Yes      | —          | Button text (e.g. "Chat on WhatsApp").          |
| `phone_number` | string | Yes      | —          | Full number with country code (e.g. 5491112345678). |
| `variant`      | string | No       | `primary`  | `primary` (green filled) or `secondary` (outline). |
| `pre_message`  | string | No       | —          | Optional pre-filled message in the chat.         |

### Example (Twig embed)

```twig
{% embed 'iobase:cta_whatsapp' with {
  label: 'Chat on WhatsApp'|t,
  phone_number: '5491112345678',
  variant: 'primary',
  pre_message: 'Hi, I have a question about...'
} %}{% endembed %}
```

### Variants

- **primary**: Green filled button (WhatsApp brand color).
- **secondary**: Outline style using theme primary color; fills on hover.
