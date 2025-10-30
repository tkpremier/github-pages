import React from 'react';
import styles from './form.module.scss';

export declare interface IFormProps {
  children: React.ReactNode;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

export const Form = (props: IFormProps) => (
  <form className={styles.form} onSubmit={props.onSubmit}>
    {props.children}
  </form>
);
