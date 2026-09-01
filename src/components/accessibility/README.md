# 🌐 Standalone Accessibility Widget (React / Next.js)

A fully self-contained, zero-dependency, WCAG 2.1 AA compliant Accessibility Toolbar & Profiles Widget inspired by Coralogix / All-In-One Accessibility (AIOA).

---

## 🚀 How to Use in Any Website

### 1. Copy the Folder
Copy this entire `accessibility` folder into your project's `components/` directory:
```
your-project/
└── src/
    └── components/
        └── accessibility/
            ├── index.ts
            ├── AccessibilityWidget.tsx
            ├── useAccessibility.ts
            ├── types.ts
            ├── accessibility.css
            └── README.md
```

### 2. Import & Mount in your Root Layout / App
In your root layout (Next.js App Router `layout.tsx`, Vite `App.tsx`, or Next.js Pages Router `_app.tsx`):

```tsx
import { AccessibilityWidget } from '@/components/accessibility'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        {/* Mount anywhere inside body */}
        <AccessibilityWidget position="bottom-left" primaryColor="#1f3864" />
      </body>
    </html>
  )
}
```

---

## ⚙️ Configurable Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `position` | `'bottom-left' \| 'bottom-right' \| 'top-left' \| 'top-right'` | `'bottom-left'` | Screen anchor position of floating badge |
| `offsetBottom` | `number` | `28` | Vertical offset from screen bottom (px) |
| `offsetLeft` | `number` | `24` | Horizontal offset from screen left (px) |
| `offsetRight` | `number` | `24` | Horizontal offset from screen right (px) |
| `offsetTop` | `number` | `24` | Vertical offset from screen top (px) |
| `primaryColor` | `string` | `'#1f3864'` | Primary brand color for badge and headers |
| `accentColor` | `string` | `'#b08d57'` | Accent color for badges and focus states |
| `zIndex` | `number` | `99999` | Z-index for overlay and floating elements |
| `defaultOpen` | `boolean` | `false` | Initial open state of modal panel |
| `className` | `string` | `''` | Optional custom CSS class name |

---

## ✨ Features Included

- **7 One-Click Profiles**: Seizure Safe, Vision Impaired, ADHD Friendly, Cognitive & Learning, Dyslexia, Motor Impaired / Keyboard, Blind / Screen Reader.
- **Typography Adjustments**: Font scaling (+ / - 100%–150%), Line height (1.8x, 2.2x), Letter spacing, Text alignment, Dyslexia-friendly typeface (OpenDyslexic), Highlight Links, Highlight Headings, Text Magnifier.
- **Contrast & Color Modes**: Dark High Contrast, Light High Contrast, Invert Colors, Monochrome / Grayscale, Low & High Saturation.
- **Reading & Navigation Aids**: Reading Mask (Cursor-tracking horizontal spotlight), Reading Ruler (Guide line), Large Black & White Cursors, Stop Animations, Text-to-Speech (Web Speech API).
- **Persistent State**: Settings saved in `localStorage` (`a11y-preferences`).
- **Reset Button**: One-click reset to default.

