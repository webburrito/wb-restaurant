import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  test('homepage should match screenshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Wait for animations to settle
    await page.waitForTimeout(1000);
    
    await expect(page).toHaveScreenshot('homepage.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });

  test('hero block should render consistently', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const hero = page.locator('.home-hero');
    await expect(hero).toBeVisible();
    
    await expect(hero).toHaveScreenshot('hero-block.png', {
      maxDiffPixels: 50,
    });
  });

  test('ticker block should render consistently', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const ticker = page.locator('.ticker').first();
    await expect(ticker).toBeVisible();
    
    // Pause animation for consistent screenshot
    await page.evaluate(() => {
      document.querySelectorAll('.ticker__track').forEach(track => {
        track.style.animationPlayState = 'paused';
      });
    });
    
    await expect(ticker).toHaveScreenshot('ticker-block.png', {
      maxDiffPixels: 50,
    });
  });

  test('mobile viewport should match screenshot', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    await expect(page).toHaveScreenshot('mobile-homepage.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });

  test('tablet viewport should match screenshot', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    await expect(page).toHaveScreenshot('tablet-homepage.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });

  test('theme style variations should render', async ({ page }) => {
    await page.goto('/');
    
    // Test would require switching theme styles via WordPress admin
    // This is a placeholder for future implementation
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });
});
