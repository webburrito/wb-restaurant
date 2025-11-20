import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Tests', () => {
  test('homepage should not have accessibility violations', async ({ page }) => {
    await page.goto('/');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('hero block should be accessible', async ({ page }) => {
    await page.goto('/');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('.home-hero')
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('ticker block should be accessible', async ({ page }) => {
    await page.goto('/');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('.ticker')
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('navigation should be keyboard accessible', async ({ page }) => {
    await page.goto('/');
    
    // Tab through navigation
    await page.keyboard.press('Tab');
    const firstLink = page.locator('#menu-main li:first-child a');
    await expect(firstLink).toBeFocused();
    
    // Check focus is visible
    await page.keyboard.press('Tab');
    const focusedElement = page.locator(':focus');
    const outline = await focusedElement.evaluate(el => 
      window.getComputedStyle(el).outline
    );
    expect(outline).not.toBe('none');
  });

  test('color contrast should meet WCAG AA', async ({ page }) => {
    await page.goto('/');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .disableRules(['landmark-one-main']) // May not apply to all pages
      .analyze();

    const contrastViolations = accessibilityScanResults.violations.filter(
      violation => violation.id === 'color-contrast'
    );
    
    expect(contrastViolations).toEqual([]);
  });
});
