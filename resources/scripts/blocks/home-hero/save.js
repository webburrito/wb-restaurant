import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Save({ attributes }) {
  const { heading, subheading, motif, small_text_header, small_text_body } = attributes;
  const blockProps = useBlockProps.save({
    className: 'home-hero',
  });

  return (
    <div {...blockProps}>
      <div className="inner">
        <RichText.Content
          tagName="span"
          className="home-hero__motif"
          value={motif}
        />
        <div className="text-wrap">
          <RichText.Content
            tagName="h1"
            className="home-hero__heading"
            value={heading}
          />
          <RichText.Content
            tagName="p"
            className="home-hero__subheading"
            value={subheading}
          />
        </div>
      </div>
      <div className="flex">
        <span className="">{small_text_header}</span>
        <span>{small_text_body}</span>
      </div>
    </div>
  );
}
