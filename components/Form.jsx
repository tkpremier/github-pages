import React from "react";
import PropTypes from "prop-types";
import styles from "./form.module.scss";

const Form = props => {
  return (
    <form className={styles.form} onSubmit={props.onSubmit}>
      {props.children}
    </form>
  );
};

Form.propTypes = {
  children: PropTypes.oneOf([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]).isRequired,
  onSubmit: PropTypes.func.isRequired
};
export default Form;
