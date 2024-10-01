import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const formData = await request.json();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_COMPLY_CUBE_API_URL}/clients`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${process.env.NEXT_PUBLIC_COMPLY_CUBE_API_KEY}`,
        },
        body: JSON.stringify(formData),
      }
    );
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Error creating client' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error fetching client checks:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
