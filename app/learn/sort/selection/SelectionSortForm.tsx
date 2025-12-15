'use client';
import serialize from 'form-serialize';
import React from 'react';
import { selectionSortStable, selectionSortString } from '../../../../src/code-examples/sort';
import { LearnForm } from '../../../../src/components/learn/Form';

export const SelectionSortForm = () => {
  const handleSelectionSort = <T extends number[] | string[]>(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { selectionSortArray } = serialize(e.currentTarget, { hash: true }) as unknown as {
      selectionSortArray: string;
    };
    const arr = selectionSortArray.split(' ').map(s => parseInt(s, 10)) as unknown as number[];
    return selectionSortStable(arr) as unknown as T;
  };
  return (
    <LearnForm onSubmit={handleSelectionSort} title="Selection Number Sort">
      <input type="text" name="selectionSortArray" id="selection-sort-array" />
      <button type="submit">Try it out</button>
    </LearnForm>
  );
};

export const SelectionSortStringForm = () => {
  const handleSelectionSortString = <T extends number[] | string[]>(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { selectionSortArray } = serialize(e.currentTarget, { hash: true }) as unknown as {
      selectionSortArray: string;
    };
    const arr = selectionSortArray.split(' ') as unknown as string[];
    return selectionSortString(arr) as unknown as T;
  };
  return (
    <LearnForm onSubmit={handleSelectionSortString} title="Selection String Sort">
      <input type="text" name="selectionSortArray" id="selection-sort-array" />
      <button type="submit">Try it out</button>
    </LearnForm>
  );
};
