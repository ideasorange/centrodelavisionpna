# Professional Block

This wrapper is meant to be used with **Views + UI Patterns Views**:
- **Views style plugin (wrapper/component):** `iobase:professional_carousel`
- **Views row plugin (each result/card):** `iobase:professional_card`

## Expected inputs

### Wrapper component: `iobase:professional_carousel`
- `heading` (string): section heading, e.g. "Our Trusted Specialists"
- slot `items`: rendered list of cards (provided by UI Patterns Views via "View rows")

### Card component: `iobase:professional_card`
- `title` (string): Professional title
- `description` (string): `field_description`
- `image` (string URL): `field_prof_image`
- `alt` (string, optional): image alt text (defaults to title in the template)

## Views setup (admin steps)

1. Create a new **View**:
   - **View name / machine name**: e.g. `professionals_carousel`
   - **Content**: type = `professional`
   - **Published only**
   - **Display**: Block
   - **Items per page / limit**: `6`

2. In the Block display, configure **Fields**:
   - Title
   - `field_description`
   - `field_prof_image`

3. Configure **UI Patterns Views**:

   1. Set the View **Style** to **Component** (the wrapper):
      - Component: `iobase:professional_carousel`
      - Set `heading`:
        - either map **View title** to `heading`, or
        - set `heading` directly in the component props UI (if offered)
      - Map **View rows** to the wrapper slot `items`

   2. Set the View **Row** to **Component** (the card):
      - Component: `iobase:professional_card`
      - Map:
        - View field `Title` -> `title`
        - View field `field_description` -> `description`
        - View field `field_prof_image` -> `image`
        - (optional) image alt -> `alt`

## Notes about `field_prof_image` (image URL mapping)

The card component expects `image` to be a **string URL** (e.g. `/sites/default/files/...jpg`).
If UI Patterns Views passes a non-string value (for example a render array), adjust the mapping to use the file URL:
- In Views field formatting, choose a formatter that outputs a direct URL (not rendered markup).
- If your formatter can’t output URL directly, create an additional View field that outputs the file URL and map that field to the `image` prop.

