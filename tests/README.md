# Testing Documentation

## Overview

This theme includes comprehensive test coverage:

- **Visual Regression Tests** - Screenshot comparisons
- **Accessibility Tests** - WCAG 2.1 AA compliance
- **Performance Tests** - Load times, bundle sizes, CLS
- **Unit Tests** - Block validation and JavaScript logic

## Quick Start

```bash
# Install Playwright browsers (first time only)
pnpm exec playwright install

# Run all tests
pnpm test

# Run specific test suites
pnpm test:unit              # Unit tests only
pnpm test:e2e               # All E2E tests
pnpm test:accessibility     # Accessibility only
pnpm test:visual            # Visual regression only
pnpm test:performance       # Performance only

# Interactive mode
pnpm test:e2e:ui           # Playwright UI mode

# Generate test coverage
pnpm test:coverage
```

## Visual Regression Tests

Located in `tests/e2e/visual-regression.spec.js`

**First Run:**
```bash
# Generate baseline screenshots
pnpm test:visual --update-snapshots
```

**Subsequent Runs:**
```bash
# Compare against baselines
pnpm test:visual
```

Screenshots are stored in `tests/e2e/__snapshots__/` organized by browser.

## Accessibility Tests

Located in `tests/e2e/accessibility.spec.js`

Tests WCAG 2.1 AA compliance using axe-core:
- Color contrast ratios
- Keyboard navigation
- Screen reader compatibility
- Focus indicators
- Semantic HTML

**Run:**
```bash
pnpm test:accessibility
```

## Performance Tests

Located in `tests/e2e/performance.spec.js`

Checks:
- Page load time < 3s
- Hardware-accelerated animations
- Cumulative Layout Shift (CLS) < 0.1
- JavaScript bundle size < 500KB
- Image optimization (lazy loading)
- Font loading strategy

**Run:**
```bash
pnpm test:performance
```

## Unit Tests

Located in `tests/unit/`

Tests:
- Block configuration validation
- Block attributes and defaults
- Animation logic
- DOM manipulation

**Run:**
```bash
pnpm test:unit

# Watch mode
pnpm test
```

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: 20
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Install Playwright
        run: pnpm exec playwright install --with-deps
      
      - name: Run unit tests
        run: pnpm test:unit
      
      - name: Run E2E tests
        run: pnpm test:e2e
      
      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/
```

## Test Configuration

### Playwright (`playwright.config.js`)
- Base URL: `https://wp.localhost`
- Browsers: Chrome, Firefox, Safari, Mobile Chrome, Mobile Safari
- Screenshots on failure
- Retries: 2 (CI), 0 (local)
- Ignores HTTPS errors for local development

### Vitest (`vitest.config.js`)
- Environment: jsdom
- Coverage: v8 provider
- Setup file: `tests/setup.js`
- Mocks WordPress globals

## Writing New Tests

### Visual Regression Test Example

```javascript
test('new block should match screenshot', async ({ page }) => {
  await page.goto('/');
  const block = page.locator('.my-block');
  await expect(block).toHaveScreenshot('my-block.png');
});
```

### Accessibility Test Example

```javascript
test('new page should be accessible', async ({ page }) => {
  await page.goto('/my-page');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
```

### Unit Test Example

```javascript
test('block should have valid config', () => {
  expect(blockConfig.name).toBe('wb/my-block');
  expect(blockConfig.attributes).toBeDefined();
});
```

## Troubleshooting

### Visual tests failing
- Update baselines: `pnpm test:visual --update-snapshots`
- Check `maxDiffPixels` threshold in test files
- Ensure animations are paused for consistent screenshots

### Accessibility tests failing
- Review violation details in test output
- Check color contrast: https://webaim.org/resources/contrastchecker/
- Validate HTML semantics

### Performance tests failing
- Check network throttling isn't enabled
- Ensure dev server is running
- Review bundle sizes: `pnpm build --analyze`

### Unit tests failing
- Check mock setup in `tests/setup.js`
- Verify WordPress globals are mocked
- Check import paths are correct

## Best Practices

1. **Run tests before commits**
2. **Update snapshots only when intentional**
3. **Write tests for new features**
4. **Keep tests fast and focused**
5. **Use descriptive test names**
6. **Mock external dependencies**
7. **Test user-facing behavior, not implementation**

## Resources

- [Playwright Docs](https://playwright.dev/)
- [Vitest Docs](https://vitest.dev/)
- [axe-core Rules](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
