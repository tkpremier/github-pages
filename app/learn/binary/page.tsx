'use client';
import serialize from 'form-serialize';
import React, { useCallback, useState } from 'react';
import { binaryRecursive } from '../../../src/code-examples';
import { binaryRecursive as recursiveApproach } from '../../../src/code-examples/search/iterativeSearch';
import { Code } from '../../../src/components/Code';
import styles from '../../../src/styles/code.module.scss';

export default function Binary() {
  const [exampleArray, runAndSet] = useState<number[]>([]);
  const [target, setTarget] = useState(-1);
  const handleNumbers: React.FocusEventHandler = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    const string = e.target.value;
    const preppedNumbers = string
      .split(',')
      .map(s => parseInt(s.trim(), 10))
      .filter(n => !Number.isNaN(n))
      .sort((a, b) => a - b);
    runAndSet(preppedNumbers);
  }, []);
  const handleSubmit: React.FormEventHandler = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { search } = serialize(e.currentTarget, { hash: true }) as any;
    if (!Number.isNaN(parseInt(search, 10))) {
      setTarget(parseInt(search, 10));
    }
  }, []);
  const n = recursiveApproach(
    exampleArray.sort((a, b) => a - b),
    0,
    exampleArray.length - 1,
    target
  );
  return (
    <>
      <h1 className="title">Binary &#x26A1; &#x1F7f0;</h1>

      <p className="description">
        <strong>Time Complexity</strong>: O(log n)
      </p>
      <p className="description">
        <strong>Auxillary Space</strong>: O(1)
      </p>
      <div className="faq">
        <pre>
          <a
            href="https://www.geeksforgeeks.org/binary-search/?ref=lbp"
            target="_blank"
            rel="nofollower norefferer noreferrer"
          >
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
      <style>{`
        .faq {
          max-width: 100%;
        }
      `}</style>
    </>
  );
}
