# Alert Component Documentation

## Overview

A consolidated, flexible alert component built with a Bootstrap-style API for displaying various types of notifications, messages, and information blocks. The component supports five variants (`info`, `success`, `warning`, `danger`, `secondary`) and can be enhanced with icons, titles, tags, and card styling.

## Single Component, Multiple Uses

The `Alert` component is designed to handle all alert patterns through optional props and composition:

- **Simple alerts**: Just variant and children
- **Alerts with icons**: Add the `icon` prop
- **Alerts with titles**: Add the `title` prop
- **Alerts with tags**: Add the `tags` prop
- **Card-styled alerts**: Add the `asCard` prop
- **Complex content**: Use sub-components (`AlertTitle`, `AlertDescription`, `AlertDetail`, `AlertSummary`)

## Installation & Import

```tsx
import { 
  Alert, 
  AlertTitle, 
  AlertDescription, 
  AlertDetail, 
  AlertSummary 
} from "components/da-loan/ui/alerts";
```

## Alert Component

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"info" \| "success" \| "warning" \| "danger" \| "secondary"` | `"info"` | Visual style variant |
| `icon` | `LucideIcon` | `undefined` | Optional icon to display |
| `title` | `string` | `undefined` | Optional title text |
| `tags` | `string[]` | `undefined` | Optional array of tags to display |
| `asCard` | `boolean` | `false` | Render as a Card component |
| `children` | `React.ReactNode` | - | Alert content |
| `className` | `string` | `undefined` | Additional CSS classes |

### Basic Usage

#### 1. Simple Alert

```tsx
<Alert variant="info">
  This is an informational message.
</Alert>

<Alert variant="success">
  Your application has been submitted successfully.
</Alert>
```

#### 2. Alert with Icon

```tsx
import { Info } from "lucide-react";

<Alert variant="info" icon={Info}>
  Later in the process, you'll need to upload <span className="font-semibold">proof of address</span>.
</Alert>
```

#### 3. Alert with Title

```tsx
import { Phone } from "lucide-react";

<Alert variant="warning" icon={Phone} title="Contact Details">
  Please ensure your contact information is up to date.
</Alert>
```

#### 4. Alert with Tags

```tsx
<Alert 
  variant="info" 
  title="Alternative Languages Available:" 
  tags={['English', 'Afrikaans', 'Zulu', 'Xhosa']}
/>
```

#### 5. Alert as Card

```tsx
<Alert variant="secondary" asCard>
  <div className="flex items-center justify-between">
    <div>
      <p className="text-xs text-gray-600">Application Reference</p>
      <p className="text-lg font-bold text-gray-900">DA123456</p>
    </div>
  </div>
</Alert>
```

## Sub-Components

### AlertTitle

A styled heading component for use within alerts.

```tsx
<Alert variant="success">
  <AlertTitle>Success!</AlertTitle>
  <AlertDescription>Your changes have been saved.</AlertDescription>
</Alert>
```

### AlertDescription

A styled paragraph component for alert descriptions.

```tsx
<Alert variant="info">
  <AlertTitle>Information</AlertTitle>
  <AlertDescription>
    This action cannot be undone. Please review before proceeding.
  </AlertDescription>
</Alert>
```

### AlertDetail

A component for displaying labeled key-value pairs with optional icons.

**Props:**
- `icon`: `LucideIcon` (optional)
- `label`: `string` (required)
- `value`: `React.ReactNode` (required)
- `className`: `string` (optional)

```tsx
import { Mail, Phone } from "lucide-react";

<Alert variant="info" title="Contact Information">
  <div className="space-y-2">
    <AlertDetail icon={Mail} label="Email" value="user@example.com" />
    <AlertDetail icon={Phone} label="Phone" value="+27 123 456 789" />
  </div>
</Alert>
```

### AlertSummary

A component for displaying prominent summary information with highlighted values.

**Props:**
- `title`: `string` (required)
- `value`: `string | React.ReactNode` (required)
- `variant`: `"info" | "success" | "warning" | "danger" | "secondary"` (default: `"secondary"`)
- `className`: `string` (optional)

```tsx
<Alert variant="secondary" asCard>
  <AlertSummary 
    title="Estimated disposable income" 
    value="R 5,000" 
    variant="success" 
  />
  <p className="text-xs text-gray-600 mt-3">
    Amount remaining after expenses.
  </p>
</Alert>
```

## Variant Colors

| Variant | Background | Border | Icon Color | Use Case |
|---------|-----------|--------|------------|----------|
| `info` | Blue-50 | Blue-200 | Blue-600 | General information, tips |
| `success` | Teal-50 | Teal-200 | #2c5f5d | Success messages, confirmations |
| `warning` | Amber-50 | Amber-200 | Amber-600 | Warnings, important notices |
| `danger` | Red-50 | Red-200 | Red-600 | Errors, critical alerts |
| `secondary` | Gray-50 | Gray-200 | Gray-600 | Neutral information, data display |

## Complete Examples

### Example 1: Information with Icon

```tsx
import { Info } from "lucide-react";

<Alert variant="info" icon={Info}>
  Later in the process, you'll need to upload proof of address 
  (utility bill or bank statement).
</Alert>
```

### Example 2: Success Message

```tsx
import { CheckCircle2 } from "lucide-react";

<Alert variant="success" icon={CheckCircle2}>
  <AlertTitle>Application Submitted!</AlertTitle>
  <AlertDescription>
    Your application has been received and is being processed.
  </AlertDescription>
</Alert>
```

### Example 3: Contact Details

```tsx
import { Mail, Phone } from "lucide-react";

<Alert variant="info" title="Contact Details">
  <div className="space-y-2">
    <AlertDetail icon={Mail} label="Email" value="test@example.com" />
    <AlertDetail icon={Phone} label="Cellphone" value="+27 123 456 789" />
  </div>
</Alert>
```

### Example 4: Disposable Income Card

```tsx
const formatCurrency = (amount: number) => `R ${amount.toLocaleString("en-ZA")}`;
const disposableIncome = 5000;

<Alert variant="secondary" asCard>
  <AlertSummary 
    title="Estimated disposable income" 
    value={formatCurrency(disposableIncome)}
    variant={disposableIncome >= 0 ? "success" : "danger"}
  />
  <p className="text-xs text-gray-600 mt-3">
    This is the amount left over each month after deducting commitments and expenses.
  </p>
</Alert>
```

### Example 5: Timeline Warning Card

```tsx
import { Clock } from "lucide-react";

<Alert variant="warning" asCard>
  <div className="flex items-start gap-2">
    <Clock className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
    <div>
      <h4 className="text-sm font-semibold text-gray-900">Expected Timeline</h4>
      <p className="text-sm text-gray-700 mt-1">
        Most applications are processed within <span className="font-semibold">2-3 business days</span>. 
        You'll receive regular updates via SMS and email.
      </p>
    </div>
  </div>
</Alert>
```

### Example 6: Monthly Payments Breakdown

```tsx
<Alert variant="info" title="Monthly Payments">
  <div className="space-y-2">
    <div className="flex justify-between text-sm">
      <span className="text-gray-600">Loan Repayment:</span>
      <span className="font-semibold text-gray-900">R 5,000</span>
    </div>
    <div className="flex justify-between text-sm">
      <span className="text-gray-600">Service Fee (incl. VAT):</span>
      <span className="font-semibold text-gray-900">R 150</span>
    </div>
    <div className="pt-2 border-t border-blue-200 flex justify-between">
      <span className="text-sm font-semibold text-gray-900">Total Instalment:</span>
      <span className="text-lg font-bold text-[#2c5f5d]">R 5,150</span>
    </div>
  </div>
</Alert>
```

### Example 7: Application Reference

```tsx
<Alert variant="secondary" asCard>
  <div className="flex items-center justify-between">
    <div>
      <p className="text-xs text-gray-600">Application Reference</p>
      <p className="text-lg font-bold text-gray-900">DA123456</p>
    </div>
    <div className="text-right">
      <p className="text-xs text-gray-600">Loan Amount</p>
      <p className="text-lg font-bold text-[#2c5f5d]">R 50,000</p>
    </div>
  </div>
</Alert>
```

### Example 8: Important Information

```tsx
import { Info } from "lucide-react";

<Alert variant="warning" asCard>
  <div className="flex items-start gap-3">
    <Info className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
    <div className="space-y-2">
      <h4 className="text-sm font-semibold text-gray-900">
        Important Information
      </h4>
      <p className="text-sm text-gray-700">
        By confirming this application, you agree to all terms and conditions. 
        Please ensure all information is correct before proceeding.
      </p>
      <p className="text-sm text-gray-700">
        If you notice errors, contact us at <span className="font-semibold">021 7643404</span>.
      </p>
    </div>
  </div>
</Alert>
```

## Migration Guide

### From Old Patterns

**Before (inline div):**
```tsx
<div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex gap-2">
  <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
  <p className="text-sm text-gray-700">
    Message here
  </p>
</div>
```

**After:**
```tsx
<Alert variant="info" icon={Info}>
  Message here
</Alert>
```

### From Multiple Alert Components

**Before (AlertWithIcon):**
```tsx
<AlertWithIcon icon={Info} variant="info">Message</AlertWithIcon>
```

**After:**
```tsx
<Alert variant="info" icon={Info}>Message</Alert>
```

**Before (AlertCard):**
```tsx
<AlertCard variant="secondary">Content</AlertCard>
```

**After:**
```tsx
<Alert variant="secondary" asCard>Content</Alert>
```

**Before (AlertWithTags):**
```tsx
<AlertWithTags variant="info" title="Title" tags={['tag1', 'tag2']} />
```

**After:**
```tsx
<Alert variant="info" title="Title" tags={['tag1', 'tag2']} />
```

## Accessibility

- Includes `role="alert"` attribute for screen readers
- Semantic HTML structure
- Adequate color contrast ratios (WCAG AA compliant)
- Keyboard navigation support
- Clear visual hierarchy

## Dependencies

- `lucide-react` - Icon library
- `class-variance-authority` - Variant management
- `components/da-loan/ui-premetive/card` - Card component (for `asCard` prop)
- `lib/utils` - Utility functions (`cn` for className merging)

## Best Practices

1. **Choose semantic variants**: Match the variant to the message type (error → danger, success → success)
2. **Keep content concise**: Alerts should be easily scannable
3. **Use icons purposefully**: Icons should reinforce the message, not clutter it
4. **Prefer composition**: Use sub-components for complex layouts rather than custom markup
5. **Consider context**: Use `asCard` for standalone information blocks, regular alerts for inline messages
6. **Test responsiveness**: Ensure alerts work well on all screen sizes
7. **Maintain consistency**: Use the same patterns throughout your application

## TypeScript Support

All components are fully typed with exported interfaces:

```tsx
import type { AlertProps, AlertSummaryProps } from "components/da-loan/ui/alerts";
```

## Support

For issues or questions, please contact the development team or refer to the project's contribution guidelines.
