import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { recipientId, ceremonyData } = await request.json();
    if (!recipientId || !ceremonyData) {
      return NextResponse.json(
        { error: 'recipientId and ceremonyData are required' },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SIGNATUREAPI_API_URL}/recipients/${recipientId}/ceremony`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': `${process.env.NEXT_PUBLIC_SIGNATUREAPI_API_KEY}`,
        },
        body: JSON.stringify(ceremonyData),
      }
    );
    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Error creating ceremony' },
        { status: response.status }
      );
    }
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error creating ceremony:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
