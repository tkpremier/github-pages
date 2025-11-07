const handleResponse = async (response: Awaited<Promise<Response>>) => {
  try {
    if (!response.ok) {
      console.error('response: ', response);
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (e) {
    console.error('e: ', e);
    return e;
  }
};

export default handleResponse;
