import '@testing-library/jest-dom';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Cleanup after each test case
afterEach(() => {
  cleanup();
});

// Mock WordPress globals
global.wp = {
  blocks: {
    registerBlockType: () => {},
  },
  element: {
    createElement: () => {},
  },
  i18n: {
    __: (text) => text,
  },
  blockEditor: {},
  components: {},
};
