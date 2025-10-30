import { IFormProps } from '../types';
import styles from './form.module.scss';

export const Form = (props: IFormProps) => (
  <form className={styles.form} onSubmit={props.onSubmit}>
    {props.children}
  </form>
);
