import React from 'react';
import PropTypes from 'prop-types';
import styles from './form.module.scss';

const Form = props => (
  <form className={styles.form} onSubmit={props.onSubmit}>
    {props.children}
  </form>
);

Form.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
  onSubmit: PropTypes.func.isRequired
};
export default Form;
