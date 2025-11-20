# WB Restaurant Theme

A modern WordPress theme for Japanese restaurants built with Sage, Tailwind CSS, and GSAP animations.

## Features

- 🎨 Tailwind CSS with custom Japanese restaurant color palette
- ✨ GSAP-powered smooth animations
- 🎯 Custom Gutenberg blocks (Hero, Ticker)
- 📱 Fully responsive design
- 🚀 Hardware-accelerated animations
- 🎭 Multiple theme style variations (Dark, Minimal, Sunset, Ocean)

## Tech Stack

- **Framework**: [Sage](https://roots.io/sage/) (WordPress starter theme)
- **Build Tool**: [Bud.js](https://bud.js.org/)
- **CSS Framework**: Tailwind CSS
- **Animations**: GSAP 3.13.0 with ScrollTrigger & ScrollSmoother
- **Fonts**: Inter (body/headings), VT323 (monospace decorative)

## Color Palette

```css
Primary (Red):    #DF391C
Secondary (Blue): #22B0D6
Text (Dark):      #2B2B2B
Cream:            #FFF8F0
```

## Requirements

- Node.js >= 18
- pnpm (package manager)
- WordPress >= 6.0
- PHP >= 8.0

## Installation

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Build assets:**
   ```bash
   # Development build with watch
   pnpm dev
   
   # Production build
   pnpm build
   ```

3. **Activate the theme** in WordPress admin

## Development

### File Structure

```
resources/
├── scripts/
│   ├── app.js                 # Main entry point
│   ├── editor.js              # Block editor scripts
│   └── blocks/
│       ├── home-hero/         # Hero section block
│       └── ticker/            # Animated ticker block
├── styles/
│   ├── app.css                # Main styles
│   └── editor.css             # Block editor styles
└── views/                     # Blade templates

public/                        # Compiled assets (auto-generated)
```

### Custom Blocks

#### Home Hero Block
Hero section with motif text, heading, and subheading.

**Attributes:**
- `heading` - Main headline
- `subheading` - Supporting text
- `motif` - Decorative background text

#### Ticker Block
Infinite scrolling text ticker with GSAP animation.

**Attributes:**
- `text1` / `text2` - Ticker text content
- `direction1` / `direction2` - Scroll direction (left/right)
- `speed` - Animation speed (10-200 pixels/second)
- `scrollBased` - Enable scroll-velocity based speed boost

### Commands

```bash
# Development
pnpm dev          # Watch and rebuild on changes
pnpm build        # Production build
pnpm lint         # Run PHP CS linter

# Code formatting
vendor/bin/pint   # Format PHP files with Laravel Pint
```

## Theme Configuration

### theme.json
Auto-generated from `bud.config.js` with:
- Color palette (13 brand colors)
- Typography scale (sm to 6xl)
- Spacing scale (xs to 2xl)
- Layout settings (800px content, 1440px wide)
- Global styles for typography and UI elements

### Style Variations
Located in `styles/`:
- **dark.json** - Dark mode color scheme
- **minimal.json** - Black and white minimal
- **sunset.json** - Warm orange/pink palette
- **ocean.json** - Cool blue/teal palette

## GSAP Animations

### ScrollSmoother
Smooth scrolling enabled on desktop (>768px) with parallax effects.

### Ticker Animation
Hardware-accelerated infinite loop with:
- Seamless looping via GSAP timeline
- Optional scroll-based velocity
- Configurable direction and speed
- Prevents ScrollSmoother parallax conflicts

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- iOS Safari 12+
- Android Chrome

## Build Notes

- Assets compiled to `public/` directory
- Tailwind purges unused CSS in production
- GSAP plugins loaded: Flip, ScrollTrigger, ScrollSmoother, ScrollToPlugin, TextPlugin
- PostCSS processes: Tailwind, Autoprefixer, Import

## License

MIT

- Participate on [Roots Discourse](https://discourse.roots.io/)
- Follow [@rootswp on Twitter](https://twitter.com/rootswp)
- Read the [Roots Blog](https://roots.io/blog/)
- Subscribe to the [Roots Newsletter](https://roots.io/newsletter/)
