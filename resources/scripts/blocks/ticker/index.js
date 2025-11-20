import './style.scss';
import './editor.scss';
import './ticker-animation.js';
import Edit from './edit';
import Save from './save';

const { registerBlockType } = wp.blocks;

registerBlockType('sage/ticker', {
  title: 'Ticker',
  icon: 'text',
  category: 'layout',
  attributes: {
    text1: { type: 'string', source: 'html', selector: '.ticker__text-1', default: '' },
    text2: { type: 'string', source: 'html', selector: '.ticker__text-2', default: '' },
    direction1: { type: 'string', default: 'left' },
    direction2: { type: 'string', default: 'right' },
    speed: { type: 'number', default: 50 },
    scrollBased: { type: 'boolean', default: false },
  },
  edit: Edit,
  save: Save,
});