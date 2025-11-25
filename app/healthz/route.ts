export const dynamic = 'force-static'; // no server work
export const revalidate = 0; // don't revalidate
export async function GET() {
  return new Response('ok', {
    status: 200,
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'no-store'
    }
  });
}
