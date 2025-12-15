import { PropsWithChildren } from 'react';

export type LearnFormProps = PropsWithChildren<{
  onSubmit: <T extends number[] | string[]>(e: React.FormEvent<HTMLFormElement>) => T;
  title: string;
}>;
