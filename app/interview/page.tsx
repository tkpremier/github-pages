import { Metadata } from 'next';
import { Interviews } from './Drawers';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Interviews | TK Premier',
  description: "TK Premier's Interviews"
};

export default async () => {
  return <Interviews />;
};
