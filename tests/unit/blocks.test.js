import { describe, it, expect, beforeEach } from 'vitest';
import heroBlockConfig from '../../resources/scripts/blocks/home-hero/block.json';
import tickerBlockConfig from '../../resources/scripts/blocks/ticker/block.json';

describe('Block Validation Tests', () => {
  describe('Home Hero Block', () => {
    it('should have valid block.json configuration', () => {
      expect(heroBlockConfig.name).toBe('wb/home-hero');
      expect(heroBlockConfig.category).toBeDefined();
      expect(heroBlockConfig.attributes).toBeDefined();
    });

    it('should define required attributes', () => {
      const { attributes } = heroBlockConfig;
      
      expect(attributes.heading).toBeDefined();
      expect(attributes.heading.type).toBe('string');
      
      expect(attributes.subheading).toBeDefined();
      expect(attributes.subheading.type).toBe('string');
      
      expect(attributes.motif).toBeDefined();
      expect(attributes.motif.type).toBe('string');
    });

    it('should have default values for attributes', () => {
      const { attributes } = heroBlockConfig;
      
      expect(attributes.heading.default).toBeDefined();
      expect(attributes.subheading.default).toBeDefined();
      expect(attributes.motif.default).toBeDefined();
    });

    it('should support WordPress editor features', () => {
      expect(heroBlockConfig.supports).toBeDefined();
      expect(heroBlockConfig.editorScript).toBeDefined();
      expect(heroBlockConfig.editorStyle).toBeDefined();
      expect(heroBlockConfig.style).toBeDefined();
    });
  });

  describe('Ticker Block', () => {
    it('should have valid block.json configuration', () => {
      expect(tickerBlockConfig.name).toBe('wb/ticker');
      expect(tickerBlockConfig.category).toBeDefined();
      expect(tickerBlockConfig.attributes).toBeDefined();
    });

    it('should define text attributes', () => {
      const { attributes } = tickerBlockConfig;
      
      expect(attributes.text1).toBeDefined();
      expect(attributes.text1.type).toBe('string');
      
      expect(attributes.text2).toBeDefined();
      expect(attributes.text2.type).toBe('string');
    });

    it('should define direction attributes', () => {
      const { attributes } = tickerBlockConfig;
      
      expect(attributes.direction1).toBeDefined();
      expect(attributes.direction1.type).toBe('string');
      expect(attributes.direction1.default).toBe('left');
      
      expect(attributes.direction2).toBeDefined();
      expect(attributes.direction2.type).toBe('string');
      expect(attributes.direction2.default).toBe('left');
    });

    it('should define speed attribute with valid range', () => {
      const { attributes } = tickerBlockConfig;
      
      expect(attributes.speed).toBeDefined();
      expect(attributes.speed.type).toBe('number');
      expect(attributes.speed.default).toBeGreaterThanOrEqual(10);
      expect(attributes.speed.default).toBeLessThanOrEqual(200);
    });

    it('should define scrollBased boolean attribute', () => {
      const { attributes } = tickerBlockConfig;
      
      expect(attributes.scrollBased).toBeDefined();
      expect(attributes.scrollBased.type).toBe('boolean');
      expect(attributes.scrollBased.default).toBe(false);
    });

    it('should support WordPress editor features', () => {
      expect(tickerBlockConfig.supports).toBeDefined();
      expect(tickerBlockConfig.editorScript).toBeDefined();
      expect(tickerBlockConfig.editorStyle).toBeDefined();
      expect(tickerBlockConfig.style).toBeDefined();
    });
  });

  describe('Block Registration', () => {
    it('blocks should have unique names', () => {
      expect(heroBlockConfig.name).not.toBe(tickerBlockConfig.name);
    });

    it('blocks should be in valid namespace', () => {
      expect(heroBlockConfig.name).toMatch(/^wb\//);
      expect(tickerBlockConfig.name).toMatch(/^wb\//);
    });

    it('blocks should have valid category', () => {
      const validCategories = ['text', 'media', 'design', 'widgets', 'theme', 'embed'];
      
      expect(validCategories).toContain(heroBlockConfig.category);
      expect(validCategories).toContain(tickerBlockConfig.category);
    });
  });
});
