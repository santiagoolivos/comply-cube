// app/api/clients/route.ts
import { NextResponse, } from 'next/server';

export async function POST(request: Request) {
  const formData = await request.json();

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_COMPLY_CUBE_API_URL}/clients`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${process.env.NEXT_PUBLIC_COMPLY_CUBE_API_KEY}`,
      },
      body: JSON.stringify(formData),
    });
    console.log("Response:", response);

    if (!response.ok) {
      return NextResponse.json({ error: "Error creating client" }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching client checks:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const clientId = searchParams.get("clientId");

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
