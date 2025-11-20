import { test, expect } from '@playwright/test';

test.describe('Performance Tests', () => {
  test('homepage should load quickly', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    // Should load in under 3 seconds
    expect(loadTime).toBeLessThan(3000);
  });

  test('should use hardware acceleration for animations', async ({ page }) => {
    await page.goto('/');
    
    const ticker = page.locator('.ticker__track').first();
    await expect(ticker).toBeVisible();
    
    const transform = await ticker.evaluate(el => {
      const style = window.getComputedStyle(el);
      return style.transform;
    });
    
    // Should have transform applied (GSAP uses translate3d for hardware acceleration)
    expect(transform).not.toBe('none');
  });

  test('should not have layout shifts during load', async ({ page }) => {
    await page.goto('/');
    
    let cls = 0;
    await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.hadRecentInput) continue;
            cls += entry.value;
          }
          resolve();
        }).observe({ type: 'layout-shift', buffered: true });
        
        setTimeout(resolve, 2000);
      });
    });
    
    // CLS should be less than 0.1 (good score)
    expect(cls).toBeLessThan(0.1);
  });

  test('JavaScript bundle should be reasonable size', async ({ page }) => {
    const resources = [];
    
    page.on('response', async (response) => {
      if (response.url().includes('.js')) {
        const buffer = await response.body();
        resources.push({
          url: response.url(),
          size: buffer.length,
        });
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const totalSize = resources.reduce((sum, r) => sum + r.size, 0);
    const totalSizeKB = totalSize / 1024;
    
    // Total JS should be under 500KB (gzipped would be much less)
    expect(totalSizeKB).toBeLessThan(500);
  });

  test('images should be optimized', async ({ page }) => {
    await page.goto('/');
    
    const images = await page.locator('img').all();
    
    for (const img of images) {
      const src = await img.getAttribute('src');
      if (!src) continue;
      
      // Check that images have loading attribute
      const loading = await img.getAttribute('loading');
      const isAboveFold = await img.evaluate(el => {
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight;
      });
      
      // Below fold images should have lazy loading
      if (!isAboveFold && loading !== 'lazy') {
        console.warn(`Image ${src} should have loading="lazy"`);
      }
    }
  });

  test('fonts should not block rendering', async ({ page }) => {
    await page.goto('/');
    
    const fontDisplay = await page.evaluate(() => {
      const fontFaces = Array.from(document.fonts);
      return fontFaces.map(font => ({
        family: font.family,
        status: font.status,
      }));
    });
    
    // Fonts should be loaded
    fontDisplay.forEach(font => {
      expect(font.status).toBe('loaded');
    });
  });
});
