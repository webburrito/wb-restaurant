import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Save({ attributes }) {
  const { text1, text2, direction1, direction2, speed, scrollBased } = attributes;
  const blockProps = useBlockProps.save({
    className: 'ticker',
    'data-ticker-speed': speed,
    'data-scroll-based': scrollBased,
    'data-speed': '0', // Tell ScrollSmoother not to parallax this element
  });

  return (
    <div {...blockProps}>
      <div className="ticker__container">
        <div className="ticker__track" data-direction={direction1}>
          <RichText.Content
            tagName="span"
            className="ticker__text ticker__text-1"
            value={text1}
          />
        </div>
        <div className="ticker__track" data-direction={direction2}>
          <RichText.Content
            tagName="span"
            className="ticker__text ticker__text-2"
            value={text2}
          />
        </div>
      </div>
    </div>
  );
}