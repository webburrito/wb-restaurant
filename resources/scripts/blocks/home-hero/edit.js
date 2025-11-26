import { useBlockProps, RichText } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
  const { heading, subheading, motif, small_text_header, small_text_body } =
    attributes;
  const blockProps = useBlockProps({
    className: 'home-hero',
  });

  return (
    <Fragment>
      <div {...blockProps}>
        <div className="inner">
          <RichText
            tagName="span"
            className="home-hero__motif"
            value={motif}
            onChange={(value) => setAttributes({ motif: value })}
            placeholder="Enter motif text..."
          />
          <div className="text-wrap">
            <RichText
              tagName="h1"
              className="home-hero__heading"
              value={heading}
              onChange={(value) => setAttributes({ heading: value })}
              placeholder="Enter hero heading..."
            />
            <RichText
              tagName="p"
              className="home-hero__subheading"
              value={subheading}
              onChange={(value) => setAttributes({ subheading: value })}
              placeholder="Enter hero subheading..."
            />
          </div>
        </div>

        <div className="flex flex-col absolute right-0 bottom-0">
          <RichText
            tagName="span"
            value={small_text_header}
            className=""
            onChange={(value) => setAttributes({ small_text_header: value })}
            placeholder="Enter text..."
          />
          <RichText
            tagName="span"
            value={small_text_body}
            className=""
            onChange={(value) => setAttributes({ small_text_body: value })}
            placeholder="Enter text.."
          />
        </div>
      </div>
    </Fragment>
  );
}
