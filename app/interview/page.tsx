import { Interview } from '../../src/types';
import handleResponse from '../../src/utils/handleResponse';
import { Interviews } from './Drawers';

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
