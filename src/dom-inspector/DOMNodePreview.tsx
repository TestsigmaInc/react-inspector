import React, { FC } from 'react';

import { useStyles } from '../styles';
import { shouldInline } from './shouldInline';
import { CloseTag } from './CloseTag';
import { OpenTag } from './OpenTag';
import { nameByNodeType } from './constants';

export const DOMNodePreview: FC<any> = ({ isCloseTag, data, expanded }) => {
  const styles = useStyles('DOMNodePreview');

  if (isCloseTag) {
    return <CloseTag styles={styles.htmlCloseTag} isChildNode tagName={data.tagName} />;
  }

  switch (data.nodeType) {
    case Node.ELEMENT_NODE:
      return (
        <span>
          <OpenTag tagName={data.tagName} attributes={data.attributes} styles={styles.htmlOpenTag} />

          {shouldInline(data) ? data.textContent : !expanded && '…'}

          {!expanded && <CloseTag tagName={data.tagName} styles={styles.htmlCloseTag} />}
        </span>
      );
    case Node.TEXT_NODE:
      return <span>{data.textContent}</span>;
    case Node.CDATA_SECTION_NODE:
      return <span>{'<![CDATA[' + data.textContent + ']]>'}</span>;
    case Node.COMMENT_NODE:
      return (
        <span style={styles.htmlComment}>
          {'<!--'}
          {data.textContent}
          {'-->'}
        </span>
      );
    case Node.PROCESSING_INSTRUCTION_NODE:
      return <span>{data.nodeName}</span>;
    case Node.DOCUMENT_TYPE_NODE:
      return (
        <span style={styles.htmlDoctype}>
          {'<!DOCTYPE '}
          {data.name}
          {data.publicId ? ` PUBLIC "${data.publicId}"` : ''}
          {!data.publicId && data.systemId ? ' SYSTEM' : ''}
          {data.systemId ? ` "${data.systemId}"` : ''}
          {'>'}
        </span>
      );
    case Node.DOCUMENT_NODE:
      return <span>{data.nodeName}</span>;
    case Node.DOCUMENT_FRAGMENT_NODE:
      return <span>{data.nodeName}</span>;
    default:
      return <span>{nameByNodeType[data.nodeType]}</span>;
  }
};

// DOMNodePreview.propTypes = {
//   /** If true, just render a close tag */
//   isCloseTag: PropTypes.bool,
//   /**  */
//   name: PropTypes.string,
//   /** The DOM Node */
//   data: PropTypes.object.isRequired,
//   /** Whether the DOM node has been expanded. */
//   expanded: PropTypes.bool.isRequired,
// };
