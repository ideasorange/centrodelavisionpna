# Professional Card

This component is designed to be used as a **Views row component** via **UI Patterns Views**.

## Props
- `title` (string, required): card heading
- `description` (string, required): short text under the title
- `image` (string URL, required): image URL for the card
- `alt` (string, optional): image alt text (defaults to `title`)

## Notes
The component does not render a link. If you want “View Profile” or clickable cards, you should either:
- extend the component to add a link prop, or
- wrap the card with an anchor in a custom row component.

