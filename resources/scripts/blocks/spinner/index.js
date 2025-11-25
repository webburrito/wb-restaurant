import './style.scss';
import './editor.scss';
import Edit from './edit';
import Save from './save';


const { registerBlockType } = wp.blocks;

registerBlockType('sage/spinner', {
  title: 'Spinner',
  icon: 'cover-image',
  category: 'layout',
  attributes: {
    text: { type: 'string', source: 'html', selector: 'span' },
  },
  edit: Edit,
  save: Save,
});
