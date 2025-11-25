import { useBlockProps } from '@wordpress/block-editor';

export default function Save({ attributes }) {
  const { text } = attributes;
  const blockProps = useBlockProps.save({
    className: 'spinner',
  });

  return (
    <div {...blockProps}>
      <svg
        id="myShape"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <defs>
          <path
            id="path1"
            fill="none"
            stroke="black"
            stroke-width="1"
            d="M 212,65
             C 276,81 292,91 305,103 361,155
               363,245 311,302 300,314 286,324
               271,332 248,343 227,347 202,347
               190,346 174,343 163,339 143,333"
          ></path>
        </defs>
        <text id="myText">
          <textPath xlink:href="#path1">
            <tspan dy="0.3em">{text}</tspan>
          </textPath>
        </text>
      </svg>
    </div>
  );
}
