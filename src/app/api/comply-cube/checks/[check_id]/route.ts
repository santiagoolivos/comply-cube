import { NextResponse } from 'next/server';

export const dynamicParams = true;

export async function generateStaticParams() {

  return []
}


export async function GET(request: Request, { params }: { params: { check_id: string } }) {
  const checkId = params.check_id;

  if (!checkId) {
    return NextResponse.json({ error: "checkId is required" }, { status: 400 });
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_COMPLY_CUBE_API_URL}/checks/${checkId}`, {
      method: "GET",
      headers: {
        Authorization: `${process.env.NEXT_PUBLIC_COMPLY_CUBE_API_KEY}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Error fetching client checks" }, { status: response.status });
    }

    const checks = await response.json();
    return NextResponse.json(checks);
  } catch (error) {
    console.error("Error fetching client checks:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
