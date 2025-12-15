'use client';

import { useState } from 'react';
import { LearnFormProps } from '../../types/learn';
import { Form } from '../Form';

export const LearnForm = ({ children, onSubmit, title }: LearnFormProps) => {
  const [array, setArray] = useState<number[] | string[]>([]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = onSubmit(e) as unknown as number[] | string[];

    setArray(result);
  };
  return (
    <>
      <h3>{title}</h3>
      <p>
        Try it out
        <br />
        <strong>Results</strong>: {array.length > 0 ? array.join(' ') : null}
      </p>
      <button onClick={() => setArray([])}>Clear</button>
      <Form onSubmit={handleSubmit}>{children}</Form>
    </>
  );
};
