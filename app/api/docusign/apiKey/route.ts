import { NextRequest, NextResponse } from 'next/server';
import process from 'process';
import { encode } from 'punycode';

// Endpoints for /api/apiKey

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const encodedKeys = btoa(`${process.env.INTEGRATION_KEY}:${process.env.SECRET_KEY}`);
  const tokenResp = await fetch('https://account-d.docusign.com/oauth/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${encodedKeys}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `grant_type=authorization_code&code=${reqBody.code}`
  });

  const tokenData = await tokenResp.json();

  const baseUriResp = await fetch('https://account-d.docusign.com/oauth/userinfo', {
    method: 'GET', // HTTP method
    headers: {
      'Authorization': `Bearer ${tokenData.access_token}` // Authorization header
    }
  });

  const baseUriData = await baseUriResp.json();

  return NextResponse.json({
     token: tokenData.access_token,
     baseUri: baseUriData.accounts[0].base_uri
  });
}