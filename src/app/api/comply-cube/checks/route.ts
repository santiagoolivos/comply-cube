// app/api/clients/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const checkId = searchParams.get("checkId");

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
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
