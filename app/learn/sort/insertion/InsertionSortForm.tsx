'use client';
import serialize from 'form-serialize';
import React from 'react';
import { insertionSort } from '../../../../src/code-examples/sort';
import { LearnForm } from '../../../../src/components/learn/Form';

export const InsertionSortForm = () => {
  const handleInsertionSort = <T extends number[] | string[]>(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { insertionSortArray } = serialize(e.currentTarget, { hash: true }) as unknown as {
      insertionSortArray: string;
    };
    const arr = insertionSortArray.split(' ').map(s => parseInt(s, 10)) as unknown as number[];
    return insertionSort(arr) as unknown as T;
  };
  return (
    <LearnForm onSubmit={handleInsertionSort} title="Insertion Sort">
      <input type="text" name="insertionSortArray" id="insertion-sort-array" />
      <button type="submit">Try it out</button>
    </LearnForm>
  );
};
