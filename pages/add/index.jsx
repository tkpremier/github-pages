import React from "react";
import serialize from "form-serialize";
import Link from "next/link";
import Layout from "../../components/layout";
import layoutStyles from "../../styles/layout.module.scss";
import handleResponse from "../../utils/handleResponse";

const AddPage = props => {
  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const data = serialize(form, { hash: true });
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(data)
    };
    fetch("http://localhost:9000/api/experience", options)
      .then(handleResponse)
      .then(res => console.log("expAdded"))
      .catch(err => console.log("err: ", err));
  };
  return (
    <Layout>
      <h1>Add something about yourself.</h1>
      <main>
        <form className={layoutStyles.card} onSubmit={handleSubmit}>
          <h3>About TK the Dev &rarr;</h3>
          <p>
            Talk about your experience, what you've worked on, what you've solved, and what goals and challenges have
            been brought upon.
          </p>
          <label htmlFor="exp-name">
            Name
            <input type="text" name="name" required placeholder="Company Name" id="exp-name" />
          </label>
          <label htmlFor="exp-desc">
            Description
            <textarea name="description" placeholder="Description" />
          </label>
          <input type="submit" value="Update" />
        </form>
      </main>
    </Layout>
  );
};

export default AddPage;
