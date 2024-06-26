import React from 'react';
import { FC, ReactChild } from 'react';

export const OpenTag: FC<any> = ({ tagName, attributes, styles }) => {
  return (
    <span style={styles.base}>
      {'<'}
      <span style={styles.tagName}>{tagName}</span>

      {(() => {
        if (attributes) {
          const attributeNodes: ReactChild[] = [];
          for (let i = 0; i < attributes.length; i++) {
            const attribute = attributes[i];
            attributeNodes.push(
              <span key={i}>
                {' '}
                <span style={styles.htmlAttributeName}>{attribute.name}</span>
                {'="'}
                <span style={styles.htmlAttributeValue}>{attribute.value}</span>
                {'"'}
              </span>
            );
          }
          return attributeNodes;
        }
      })()}

      {'>'}
    </span>
  );
};
