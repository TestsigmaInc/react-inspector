import React, { FC } from 'react';

import { useStyles } from '../styles';
import { shouldInline } from './shouldInline';
import { CloseTag } from './CloseTag';
import { OpenTag } from './OpenTag';
import { DOMNodePreview } from './DOMNodePreview';

type LocatableNode = {
  tagName: string;
  attributes?: { [key: string]: string };
  id?: string;
  textContent?: string;
  childNodes?: LocatableNode[];
  nodeType: number;
};

type Props = {
  isCloseTag: boolean;
  data: LocatableNode;
  expanded: boolean;
};

export const LocatableNodePreview: FC<Props> = ({ isCloseTag, data, expanded }) => {
  const styles = useStyles('DOMNodePreview');

  if (isCloseTag) {
    return <CloseTag styles={styles.htmlCloseTag} isChildNode tagName={data.tagName} />;
  }

  const attributes = Object.keys(data.attributes || {}).map((attrKey) => ({
    value: data.attributes?.[attrKey],
    name: attrKey,
  }));

  const _data: Partial<LocatableNode> = {
    textContent: '',
    childNodes: [],
    ...data,
  };

  switch (data.nodeType) {
    case Node.ELEMENT_NODE:
      return (
        <span>
          <OpenTag tagName={_data.tagName} attributes={attributes} styles={styles.htmlOpenTag} />

          {shouldInline(_data) ? _data.textContent : !expanded && '…'}

          {!expanded && <CloseTag tagName={_data.tagName} styles={styles.htmlCloseTag} />}
        </span>
      );
    default:
      return <DOMNodePreview data={_data} />;
  }
};
