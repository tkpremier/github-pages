export default async function (response: Awaited<Promise<Response>>) {
  const data = await response.json();
  return data;
}
