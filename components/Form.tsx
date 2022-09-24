import React from 'react';
import styles from './form.module.scss';

export declare interface IFormProps {
  children: React.ReactNode;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

const Form = (props: IFormProps) => (
  <form className={styles.form} onSubmit={props.onSubmit}>
    {props.children}
  </form>
);

export default Form;
