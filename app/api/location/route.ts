export async function GET() {
  try {
    const res = await fetch('https://ipwho.is/');
    const data = await res.json();

    return Response.json({
      country_code: data?.country_code || 'IN',
    });
  } catch (error) {
    return Response.json({ country_code: 'IN' }); // fallback
  }
}