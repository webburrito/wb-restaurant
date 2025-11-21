import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  // Helper to pause all animations
  const pauseAnimations = async (page) => {
    await page.evaluate(() => {
      // Pause GSAP animations
      if (window.gsap) {
        window.gsap.globalTimeline.pause();
      }
      
      // Pause ticker animations specifically
      document.querySelectorAll('.ticker__track').forEach(track => {
        track.style.animation = 'none';
        track.style.transform = 'translateX(0)';
      });
    });
  };

  test('homepage should match screenshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Pause all animations
    await pauseAnimations(page);
    await page.waitForTimeout(500);
    
    await expect(page).toHaveScreenshot('homepage.png', {
      fullPage: true,
      maxDiffPixels: 100,
      animations: 'disabled',
    });
  });

  test('hero block should render consistently', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const hero = page.locator('.home-hero');
    await expect(hero).toBeVisible();
    
    await expect(hero).toHaveScreenshot('hero-block.png', {
      maxDiffPixels: 50,
      animations: 'disabled',
    });
  });

  test('ticker block should render consistently', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const ticker = page.locator('.ticker').first();
    await expect(ticker).toBeVisible();
    
    // Pause GSAP and set fixed position
    await page.evaluate(() => {
      if (window.gsap) {
        window.gsap.globalTimeline.pause();
      }
      document.querySelectorAll('.ticker__track').forEach(track => {
        track.style.animation = 'none';
        // Set to known position
        const transform = window.getComputedStyle(track).transform;
        track.style.transform = 'translateX(0px) translateY(0px)';
      });
    });
    
    await page.waitForTimeout(300);
    
    await expect(ticker).toHaveScreenshot('ticker-block.png', {
      maxDiffPixels: 50,
      animations: 'disabled',
    });
  });

  test('mobile viewport should match screenshot', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    await pauseAnimations(page);
    await page.waitForTimeout(500);
    
    await expect(page).toHaveScreenshot('mobile-homepage.png', {
      fullPage: true,
      maxDiffPixels: 100,
      animations: 'disabled',
    });
  });

  test('tablet viewport should match screenshot', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    await pauseAnimations(page);
    await page.waitForTimeout(500);
    
    await expect(page).toHaveScreenshot('tablet-homepage.png', {
      fullPage: true,
      maxDiffPixels: 100,
      animations: 'disabled',
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
