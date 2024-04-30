import { NextResponse } from 'next/server';

// Endpoints for api/userView

export async function GET() {
  return NextResponse.json({ name: 'Elie' });
}
