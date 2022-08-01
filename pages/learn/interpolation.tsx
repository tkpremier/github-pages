import React, { FormEventHandler, FormEvent, useState, MouseEventHandler, MouseEvent } from 'react';
import serialize from 'form-serialize';
import Code from '../../components/Code';
import Layout from '../../components/layout';
import { interpolationSearch } from '../../code-examples';
import { interpolationSearch as interFunction } from '../../code-examples/search/iterativeSearch';
import styles from '../../components/code.module.scss';

interface ExtendedTarget extends EventTarget {
  value: string;
}

interface ExtendedFormEvent extends FormEvent {
  target: HTMLFormElement;
}
export default function Interpolation() {
  const [exampleArray, runAndSet] = useState([]);
  const [target, setTarget] = useState(-1);
  const handleNumbers = (e: { target: ExtendedTarget }) => {
    const string = e.target.value;
    const preppedNumbers = string
      .split(',')
      .map(s => parseInt(s.trim(), 10))
      .filter(n => !Number.isNaN(n))
      .sort((a, b) => a - b);
    runAndSet(preppedNumbers);
  };
  const handleSubmit: FormEventHandler = (e: ExtendedFormEvent) => {
    e.preventDefault();
    const { search } = serialize(e.target, { hash: true }) as { search: string };
    if (!Number.isNaN(parseInt(search, 10))) {
      setTarget(parseInt(search, 10));
    }
  };
  const n = interFunction(
    exampleArray.sort((a, b) => a - b),
    0,
    exampleArray.length - 1,
    target
  );
  return (
    <Layout title="Learn Binary | TKPremier">
      <h1 className="title">Interpolation &#x26A1; &#x1F7f0;</h1>

      <p className="description">
        <strong>Time Complexity</strong>: O(log n)
      </p>
      <p className="description">
        <strong>Auxillary Space</strong>: O(1)
      </p>
      <div className="faq">
        <pre>
          <a
            href="https://www.geeksforgeeks.org/interpolation-search/?ref=lbp"
            target="_blank"
            rel="nofollower norefferer noreferrer"
          >
            Source
          </a>
        </pre>
        <Code text={interpolationSearch} />
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
