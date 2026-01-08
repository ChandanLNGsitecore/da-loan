# Nohemi Font Family

This directory contains the **Nohemi** font family variants used for headings throughout the application.

## Font Files

The following Nohemi variants are configured:

1. `Nohemi-Regular.woff2` - Regular weight (400)
2. `Nohemi-Medium.woff2` - Medium weight (500)
3. `Nohemi-Bold.woff2` - Bold weight (700)

## Usage

### Automatic Application

All heading elements (`h1`, `h2`, `h3`, `h4`, `h5`, `h6`) automatically use the Nohemi font family.

```tsx
<h1>This automatically uses Nohemi</h1>
<h2>This too!</h2>
```

### Manual Application with Utility Class

You can explicitly apply Nohemi to any element using the `font-heading` class:

```tsx
<p className="font-heading text-2xl">
  This paragraph uses Nohemi
</p>
```

### Using Different Weights

Control the weight using Tailwind's font-weight utilities:

```tsx
// Regular (400)
<h1 className="font-normal">Your Heading</h1>

// Medium (500)  
<h2 className="font-medium">Your Subheading</h2>

// Bold (700)
<h3 className="font-bold">Your Title</h3>
```

## Examples

```tsx
// Large hero heading with bold weight
<h1 className="text-4xl font-bold text-white">
  Your Personal Loan is a few steps away
</h1>

// Section title with medium weight
<h2 className="text-2xl font-medium text-gray-800">
  Your Offer
</h2>

// Card title with regular weight
<h3 className="text-lg font-normal">
  Want to qualify for more?
</h3>

// Non-heading element with Nohemi
<div className="font-heading font-bold text-3xl">
  Custom styled text with Nohemi Bold
</div>
```

## Font Stack

The complete font stack with fallbacks:

```
Nohemi → Montserrat → system-ui → -apple-system → sans-serif
```

This ensures text displays properly even if Nohemi fails to load.

## CSS Variables

Available variables:

- `--font-nohemi` - Nohemi font family
- `--font-family-heading` - Nohemi with fallback fonts

## Weight Mappings

- `font-normal` = Regular (400)
- `font-medium` = Medium (500)
- `font-semibold` = *Falls back to Medium (500)*
- `font-bold` = Bold (700)
- `font-extrabold` = *Falls back to Bold (700)*

## Body Text

Body text uses **Montserrat** (Google Font) by default. Only headings and elements with the `font-heading` class use Nohemi.

## Troubleshooting

If the Nohemi font doesn't appear:

1. Verify font files are in `/public/fonts/` with exact names shown above
2. Clear Next.js cache: `rm -rf .next`
3. Restart the development server
4. Hard refresh browser (Cmd/Ctrl + Shift + R)
5. Check browser console for font loading errors
