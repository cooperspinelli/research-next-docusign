import { NextRequest, NextResponse } from 'next/server';
import process from 'process';

// Endpoints for /api/apiKey

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const encodedKeys = btoa(`${process.env.INTEGRATION_KEY}:${process.env.SECRET_KEY}`);
  const resp = await fetch('https://account-d.docusign.com/oauth/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${encodedKeys}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `grant_type=authorization_code&code=${reqBody.code}`
  });
  return NextResponse.json(await resp.json());
}