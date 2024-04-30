import { NextResponse } from 'next/server';
import { ApiClient } from 'docusign-esign';
import process from 'process';
import fs from "fs";
import path from 'path';


// Endpoints for /api/apiKey

export async function GET() {
  let dsApiClient = new ApiClient();
  dsApiClient.setBasePath(process.env.BASE_PATH!);

  const results = await dsApiClient.requestJWTUserToken(
    process.env.INTEGRATION_KEY!,
    process.env.USER_ID!,
    ["signature"],
    fs.readFileSync(path.join(__dirname, "private.key")),
    3600
  );
  console.log(results.body);
  const key = results.body.access_token;
  const expires_at = Date.now() + (results.body.expires_in - 60) * 1000;

  return NextResponse.json({ key, expires_at });

}