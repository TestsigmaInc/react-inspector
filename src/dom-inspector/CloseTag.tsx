import React from 'react';

// isChildNode style={{ marginLeft: -12 /* hack: offset placeholder */ }}
export const CloseTag = ({ tagName, isChildNode = false, styles }) => (
  <span style={Object.assign({}, styles.base, isChildNode && styles.offsetLeft)}>
    {'</'}
    <span style={styles.tagName}>{tagName}</span>
    {'>'}
  </span>
);
