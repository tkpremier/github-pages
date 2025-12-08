import styles from '../styles/form.module.scss';
import { IFormProps } from '../types';

export const Form = (props: IFormProps) => (
  <form className={styles.form} onSubmit={props.onSubmit}>
    {props.children}
  </form>
);
