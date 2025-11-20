import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, RangeControl, ToggleControl } from '@wordpress/components';
import { Fragment } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
  const { text1, text2, direction1, direction2, speed, scrollBased } = attributes;
  const blockProps = useBlockProps({
    className: 'ticker',
  });

  return (
    <Fragment>
      <InspectorControls>
        <PanelBody title="Ticker Settings" initialOpen={true}>
          <SelectControl
            label="Track 1 Direction"
            value={direction1}
            options={[
              { label: 'Left to Right', value: 'left' },
              { label: 'Right to Left', value: 'right' },
            ]}
            onChange={(value) => setAttributes({ direction1: value })}
          />
          <SelectControl
            label="Track 2 Direction"
            value={direction2}
            options={[
              { label: 'Left to Right', value: 'left' },
              { label: 'Right to Left', value: 'right' },
            ]}
            onChange={(value) => setAttributes({ direction2: value })}
          />
          <RangeControl
            label="Speed"
            value={speed}
            onChange={(value) => setAttributes({ speed: value })}
            min={10}
            max={200}
            step={10}
          />
          <ToggleControl
            label="Scroll-based Animation"
            checked={scrollBased}
            onChange={(value) => setAttributes({ scrollBased: value })}
            help={scrollBased ? 'Animation speed changes based on scroll velocity' : 'Constant animation speed'}
          />
        </PanelBody>
      </InspectorControls>
      <div {...blockProps}>
        <div className="ticker__container">
          <div className="ticker__track" data-direction={direction1}>
            <RichText
              tagName="span"
              className="ticker__text ticker__text-1"
              value={text1}
              onChange={(value) => setAttributes({ text1: value })}
              placeholder="Enter first ticker text..."
            />
          </div>
          <div className="ticker__track" data-direction={direction2}>
            <RichText
              tagName="span"
              className="ticker__text ticker__text-2"
              value={text2}
              onChange={(value) => setAttributes({ text2: value })}
              placeholder="Enter second ticker text..."
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
