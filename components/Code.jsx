import React from 'react';
import { CodeBlock } from 'react-code-blocks';
import PropTypes from 'prop-types';
import styles from './code.module.scss';

const Code = props => {
  return (
    <pre className={styles.codeRow}>
      <CodeBlock language="javascript" showLineNumbers={false} text={props.text} />
    </pre>
  );
};

export default Code;
