import { Metadata } from 'next';
import { Interview } from '../../src/types';
import handleResponse from '../../src/utils/handleResponse';
import { Interviews } from './Drawers';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Interviews | TK Premier',
  description: "TK Premier's Interviews"
};

const getInterviews = async () => {
  try {
    const response = await handleResponse(await fetch(`${process.env.INTERNAL_API_URL}/api/interview`));
    return response;
  } catch (error) {
    console.error('getInterviews error: ', error);
    return {
      data: []
    };
  }
};

export default async () => {
  const { data } = await getInterviews();

  return <Interviews data={data.map((d: Interview) => ({ ...d, date: new Date(d.date).toLocaleDateString() }))} />;
};
