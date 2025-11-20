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
  },
  edit: Edit,
  save: Save,
});
