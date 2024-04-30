import { NextRequest, NextResponse } from 'next/server';
import process from 'process';
import fs from "fs";
import path from 'path';


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
  // const results = await dsApiClient.requestJWTUserToken(
  //   process.env.INTEGRATION_KEY!,
  //   process.env.USER_ID!,
  //   ["signature"],
  //   fs.readFileSync(path.join(__dirname, "private.key")),
  //   3600
  // );
  // console.log(results.body);
  // const key = results.body.access_token;
  // const expires_at = Date.now() + (results.body.expires_in - 60) * 1000;

  // return NextResponse.json({ key, expires_at });

}