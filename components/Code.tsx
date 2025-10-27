import { CodeBlock } from 'react-code-blocks';
import styles from './code.module.scss';

export const Code = (props: { text: string }) => (
  <pre className={styles.codeRow}>
    <CodeBlock language="javascript" showLineNumbers={false} text={props.text} />
  </pre>
);
