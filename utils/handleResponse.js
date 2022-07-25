export default async function (response) {
  const data = await response.json();
  return data;
}
