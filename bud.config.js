/**
 * Compiler configuration
 *
 * @see {@link https://roots.io/sage/docs sage documentation}
 * @see {@link https://bud.js.org/learn/config bud.js configuration guide}
 *
 * @type {import('@roots/bud').Config}
 */
import sage from '@roots/sage';

export default async (app) => {
  app.use(sage);
  /**
   * Application assets & entrypoints
   *
   * @see {@link https://bud.js.org/reference/bud.entry}
   * @see {@link https://bud.js.org/reference/bud.assets}
   */
  app
    .entry('app', ['@scripts/app', '@styles/app'])
    .entry('editor', ['@scripts/editor', '@styles/editor'])
    .assets(['images']);

  /**
   * Set public path
   *
   * @see {@link https://bud.js.org/reference/bud.setPublicPath}
   */
  app.setPublicPath('/app/themes/wb-restaurant/public/');

  /**
   * Development server settings
   *
   * @see {@link https://bud.js.org/reference/bud.setUrl}
   * @see {@link https://bud.js.org/reference/bud.setProxyUrl}
   * @see {@link https://bud.js.org/reference/bud.watch}
   */
  app
    .setUrl('http://localhost:3000')
    .setProxyUrl('https://wp.localhost')
    .watch(['resources/views', 'app']);

  /**
   * Development server options
   */
  app.serve({
    host: 'localhost',
    port: 3000,
    proxy: {
      host: 'wp.localhost',
      secure: false,
    },
  });

  /**
   * Generate WordPress `theme.json`
   *
   * @note This overwrites `theme.json` on every build.
   *
   * @see {@link https://bud.js.org/extensions/sage/theme.json}
   * @see {@link https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-json}
   */
  app.wpjson
    .setSettings({
      background: {
        backgroundImage: true,
      },
      color: {
        custom: false,
        customDuotone: false,
        customGradient: false,
        defaultDuotone: false,
        defaultGradients: false,
        defaultPalette: false,
        duotone: [],
        palette: [
          { name: 'Primary Red', slug: 'primary', color: '#DF391C' },
          { name: 'Secondary Blue', slug: 'secondary', color: '#22B0D6' },
          { name: 'Text Dark', slug: 'text', color: '#2B2B2B' },
          { name: 'White', slug: 'white', color: '#FFFFFF' },
          { name: 'Black', slug: 'black', color: '#000000' },
          { name: 'Light Cream', slug: 'cream', color: '#FFF8F0' },
          { name: 'Light Red', slug: 'red-light', color: '#F5927E' },
          { name: 'Dark Red', slug: 'red-dark', color: '#A82815' },
          { name: 'Light Blue', slug: 'blue-light', color: '#7DD3ED' },
          { name: 'Dark Blue', slug: 'blue-dark', color: '#1A8CAB' },
          { name: 'Gray Light', slug: 'gray-light', color: '#F5F5F5' },
          { name: 'Gray Medium', slug: 'gray-medium', color: '#949494' },
          { name: 'Transparent', slug: 'transparent', color: 'transparent' },
        ],
      },
      custom: {
        spacing: {},
        typography: {
          'font-size': {},
          'line-height': {},
        },
      },
      layout: {
        contentSize: '800px',
        wideSize: '1440px',
      },
      spacing: {
        padding: true,
        units: ['px', '%', 'em', 'rem', 'vw', 'vh'],
        spacingScale: {
          steps: 0,
        },
        spacingSizes: [
          { name: 'XS', slug: 'xs', size: '0.5rem' },
          { name: 'Small', slug: 'sm', size: '1rem' },
          { name: 'Medium', slug: 'md', size: '2rem' },
          { name: 'Large', slug: 'lg', size: '3rem' },
          { name: 'XL', slug: 'xl', size: '4rem' },
          { name: '2XL', slug: '2xl', size: '6rem' },
        ],
      },
      typography: {
        customFontSize: false,
        fontFamilies: [
          {
            name: 'Inter',
            slug: 'inter',
            fontFamily: '"Inter", sans-serif',
          },
          {
            name: 'VT323',
            slug: 'vt323',
            fontFamily: '"VT323", monospace',
          },
        ],
        fontSizes: [
          { name: 'Small', slug: 'sm', size: '0.875rem' },
          { name: 'Base', slug: 'base', size: '1rem' },
          { name: 'Large', slug: 'lg', size: '1.125rem' },
          { name: 'XL', slug: 'xl', size: '1.25rem' },
          { name: '2XL', slug: '2xl', size: '1.5rem' },
          { name: '3XL', slug: '3xl', size: '1.875rem' },
          { name: '4XL', slug: '4xl', size: '2.25rem' },
          { name: '5XL', slug: '5xl', size: '3rem' },
          { name: '6XL', slug: '6xl', size: '3.75rem' },
        ],
      },
    })
    .set('styles', {
      color: {
        background: 'var(--wp--preset--color--cream)',
        text: 'var(--wp--preset--color--text)',
      },
      typography: {
        fontFamily: 'var(--wp--preset--font-family--inter)',
        fontSize: 'var(--wp--preset--font-size--base)',
        lineHeight: '1.6',
      },
      elements: {
        button: {
          color: {
            background: 'var(--wp--preset--color--primary)',
            text: 'var(--wp--preset--color--white)',
          },
          typography: {
            fontFamily: 'var(--wp--preset--font-family--inter)',
            fontWeight: '600',
            textTransform: 'uppercase',
          },
          spacing: {
            padding: {
              top: '0.75rem',
              right: '2rem',
              bottom: '0.75rem',
              left: '2rem',
            },
          },
          border: {
            radius: '0',
          },
        },
        h1: {
          typography: {
            fontFamily: 'var(--wp--preset--font-family--inter)',
            fontSize: 'var(--wp--preset--font-size--5xl)',
            fontWeight: '700',
            lineHeight: '1.2',
          },
        },
        h2: {
          typography: {
            fontFamily: 'var(--wp--preset--font-family--inter)',
            fontSize: 'var(--wp--preset--font-size--4xl)',
            fontWeight: '700',
            lineHeight: '1.3',
          },
        },
        h3: {
          typography: {
            fontFamily: 'var(--wp--preset--font-family--inter)',
            fontSize: 'var(--wp--preset--font-size--3xl)',
            fontWeight: '600',
            lineHeight: '1.3',
          },
        },
        link: {
          color: {
            text: 'var(--wp--preset--color--primary)',
          },
          ':hover': {
            color: {
              text: 'var(--wp--preset--color--red-dark)',
            },
          },
        },
      },
    })
    .enable();
};

