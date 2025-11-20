# Test Snapshots

This directory contains baseline screenshots for visual regression testing.

## Generating Baselines

To generate new baseline screenshots:

```bash
pnpm test:e2e --update-snapshots
```

## Screenshot Files

- `homepage.png` - Full homepage screenshot
- `hero-block.png` - Hero block component
- `ticker-block.png` - Ticker block component (paused)
- `mobile-homepage.png` - Mobile viewport (375x812)
- `tablet-homepage.png` - Tablet viewport (768x1024)

## Note

Screenshots are browser-specific and stored in subdirectories by project name (chromium, firefox, webkit, etc.)
