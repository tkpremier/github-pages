'use client';
import serialize from 'form-serialize';
import React from 'react';
import { mergeSort } from '../../src/code-examples/sort';
import { LearnForm } from '../../src/components/learn/Form';

export const MergeSortForm = () => {
  const handleSort = <T extends number[] | string[]>(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { mergeSortArray } = serialize(e.target as HTMLFormElement, { hash: true }) as any;
    const arr = mergeSortArray.split(' ').map((s: string) => parseInt(s, 10)) as unknown as T;
    return mergeSort(arr, 0, arr.length - 1) as unknown as T;
  };
  return (
    <LearnForm onSubmit={handleSort} title="Merge Sort">
      <input type="text" name="mergeSortArray" id="merge-sort-array" />
      <button type="submit">Try it out</button>
    </LearnForm>
  );
};
