import { describe, it, expect, beforeEach } from 'vitest';
import heroBlockConfig from '../../resources/scripts/blocks/home-hero/block.json';
import tickerBlockConfig from '../../resources/scripts/blocks/ticker/block.json';

describe('Block Validation Tests', () => {
  describe('Home Hero Block', () => {
    it('should have valid block.json configuration', () => {
      expect(heroBlockConfig.name).toBe('sage/home-hero');
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

    it('should have default value for motif', () => {
      const { attributes } = heroBlockConfig;
      expect(attributes.motif.default).toBeDefined();
    });

    it('should have editor script defined', () => {
      expect(heroBlockConfig.editorScript).toBeDefined();
    });
  });

  describe('Ticker Block', () => {
    it('should have valid block.json configuration', () => {
      expect(tickerBlockConfig.name).toBe('sage/ticker');
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

    it('should have default values for text', () => {
      const { attributes } = tickerBlockConfig;
      expect(attributes.text1.default).toBeDefined();
      expect(attributes.text2.default).toBeDefined();
    });

    it('should have editor script defined', () => {
      expect(tickerBlockConfig.editorScript).toBeDefined();
    });
  });

  describe('Block Registration', () => {
    it('blocks should have unique names', () => {
      expect(heroBlockConfig.name).not.toBe(tickerBlockConfig.name);
    });

    it('blocks should be in sage namespace', () => {
      expect(heroBlockConfig.name).toMatch(/^sage\//);
      expect(tickerBlockConfig.name).toMatch(/^sage\//);
    });

    it('blocks should have valid category', () => {
      const validCategories = ['text', 'media', 'design', 'widgets', 'theme', 'embed', 'layout'];
      
      expect(validCategories).toContain(heroBlockConfig.category);
      expect(validCategories).toContain(tickerBlockConfig.category);
    });
  });
});
