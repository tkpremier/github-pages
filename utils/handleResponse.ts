const handleResponse = async (response: Awaited<Promise<Response>>) => {
  try {
    if (!response.ok) {
      console.log('handleResponse error response: ', response);
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (e) {
    console.error('e: ', e);
    return e;
  }
};

export const handleResponses = async (arr: Array<Awaited<Promise<Response>>>) =>
  arr.map(async r => {
    const json = await handleResponse(r);
    console.log('response json?: ', json);
    return json;
  });

export default handleResponse;
