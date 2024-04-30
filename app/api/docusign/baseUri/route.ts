import { NextRequest, NextResponse } from 'next/server';
import process from 'process';

// Endpoints for /api/apiKey

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const accessToken = await reqBody.token;
  console.log(accessToken);
  const resp = await fetch('https://account-d.docusign.com/oauth/userinfo', {
    method: 'GET', // HTTP method
    headers: {
      'Authorization': `Bearer ${accessToken}` // Authorization header
    }
  });
  return NextResponse.json(await resp.json());
}