import React, { useState } from "react";
import serialize from "form-serialize";
import Code from "../../components/Code";
import Layout from "../../components/layout";
import { binaryRecursive } from "../../code-examples";
import { binaryRecursive as recursiveApproach } from "../../code-examples/search/iterativeSearch";
import styles from "../../components/code.module.scss";

export default function Binary() {
  const [exampleArray, runAndSet] = useState([]);
  const [target, setTarget] = useState(-1);
  const handleNumbers = e => {
    const string = e.target.value;
    const preppedNumbers = string
      .split(",")
      .map(s => parseInt(s.trim(), 10))
      .filter(n => !Number.isNaN(n))
      .sort((a, b) => a - b);
    runAndSet(preppedNumbers);
  };
  const handleSubmit = e => {
    e.preventDefault();
    const { search, numbers } = serialize(e.target, { hash: true });
    if (!Number.isNaN(parseInt(search, 10))) {
      setTarget(parseInt(search, 10));
    }
  };
  const n = recursiveApproach(
    exampleArray.sort((a, b) => a - b),
    0,
    exampleArray.length - 1,
    target
  );
  return (
    <Layout learnBinary>
      <h1 className="title">Binary &#x26A1; &#x1F7f0;</h1>

      <p className="description">
        <strong>Time Complexity</strong>: O(log n)
      </p>
      <p className="description">
        <strong>Auxillary Space</strong>: O(1)
      </p>
      <div className="faq">
        <pre>
          <a href="https://www.geeksforgeeks.org/binary-search/?ref=lbp" target="_blank" rel="nofollower norefferer">
            Source
          </a>
        </pre>
        <Code text={binaryRecursive} />
        <div>
          <strong>Try it out</strong>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.formLabel} htmlFor="numbers">
              Sample Array. Add numbers, separated by commas, please &#x1F64F;
              <input type="text" required id="numbers" name="numbers" onBlur={handleNumbers} />
            </label>
            <label className={styles.formLabel} htmlFor="search">
              Search Target
              <input type="text" id="search" name="search" />
            </label>
            <input type="submit" />
          </form>
          <strong>Test Array</strong>
          <pre>{`[${exampleArray}]`}</pre>
        </div>
        <p>
          <strong>Result</strong>:&nbsp;&nbsp;
          {n > -1 ? `Result at ${n}` : `Could not find ${n}`}
        </p>
      </div>
      <style jsx>{`
        .faq {
          max-width: 100%;
        }
      `}</style>
    </Layout>
  );
}
