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
          dataSpeed="0.8"
          value={motif}
        />
        <div className="text-wrap">
          <RichText.Content
            tagName="h1"
            dataSpeed="0.5"
            className="home-hero__heading"
            value={heading}
          />
          <RichText.Content
            tagName="p"
            dataSpeed="0.8"
            className="home-hero__subheading"
            value={subheading}
          />
        </div>
      </div>
      <div className="flex flex-col right-0 bottom-0 absolute">
        <span className="">{small_text_header}</span>
        <span>{small_text_body}</span>
      </div>
    </div>
  );
}
