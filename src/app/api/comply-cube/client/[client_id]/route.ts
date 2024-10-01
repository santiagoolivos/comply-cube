import { NextResponse, } from 'next/server';


export async function GET(request: Request, { params }: { params: { client_id: string } }) {

  const clientId = params.client_id
  
  if (!clientId) {
    return NextResponse.json({ error: "clientId is required" }, { status: 400 });
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_COMPLY_CUBE_API_URL}/checks?clientId=${clientId}`, {
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