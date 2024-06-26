import React, { FC, ReactNode, useState } from 'react';

import { useStyles } from '../styles';
import { shouldInline } from './shouldInline';
import { CloseTag } from './CloseTag';
import { OpenTag } from './OpenTag';
import { DOMNodePreview } from './DOMNodePreview';

interface TSActionButtonsProps {
  data;
  styles;
  floatDropDownButtons: (selectionItems, data) => ReactNode;
  floatButtons: (data) => ReactNode;
}

const TSActionButtons = ({ data, styles, floatDropDownButtons, floatButtons }: TSActionButtonsProps) => {
  const INNERTEXT_KEY = '#innerText';

  const attributesMap = () => {
    const attributeMap = new Map();

    for (let i = 0; i < data?.attributes.length; i++) {
      const attribute = data?.attributes[i];
      attributeMap.set(attribute.nodeName, attribute.nodeValue);
    }
    if (data.textContent) {
      attributeMap.set(INNERTEXT_KEY, data.textContent);
    }
    return attributeMap;
  };

  return (
    <>
      {
        <span style={styles.floatButtons}>
          {data?.attributes?.length
            ? floatDropDownButtons && floatDropDownButtons([...attributesMap()], data)
            : floatButtons && floatButtons(data)}
        </span>
      }
    </>
  );
};

export const TSDOMNodePreview: FC<any> = ({ isCloseTag, data, expanded, floatDropDownButtons, floatButtons }) => {
  const styles = useStyles('DOMNodePreview');
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  if (isCloseTag) {
    return <CloseTag styles={styles.htmlCloseTag} isChildNode tagName={data.tagName} />;
  }

  switch (data.nodeType) {
    case Node.ELEMENT_NODE:
      return (
        <>
          <span
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ ...styles.base, ...(isHovered ? styles.base[':hover'] : {}) }}>
            <span>
              <OpenTag tagName={data.tagName} attributes={data.attributes} styles={styles.htmlOpenTag} />

              {shouldInline(data) ? data.textContent : !expanded && '…'}

              {!expanded && <CloseTag tagName={data.tagName} styles={styles.htmlCloseTag} />}
            </span>
            <span style={styles.floatButtonsWrap}>
              {isHovered ? (
                <TSActionButtons
                  data={data}
                  styles={styles}
                  floatDropDownButtons={floatDropDownButtons}
                  floatButtons={floatButtons}
                />
              ) : (
                <></>
              )}
            </span>
          </span>
        </>
      );
    default:
      return <DOMNodePreview data={data} />;
  }
};
