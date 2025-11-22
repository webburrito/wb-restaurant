import './style.scss';
import './editor.scss';
import Edit from './edit';
import Save from './save';


const { registerBlockType } = wp.blocks;

registerBlockType('sage/home-hero', {
  title: 'Home Hero',
  icon: 'cover-image',
  category: 'layout',
  attributes: {
    motif: { type: 'string', source: 'html', selector: 'span' },
    heading: { type: 'string', source: 'html', selector: 'h1' },
    subheading: { type: 'string', source: 'html', selector: 'p' },
    small_text_header: { type: 'string', source: 'html', selector: '.flex span:first-child' },
    small_text_body: { type: 'string', source: 'html', selector: '.flex span:last-child' },
  },
  edit: Edit,
  save: Save,
});
