import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const reqBody = await request.json();

  const payload = {
    returnUrl: "http://localhost:3000/",
    authenticationMethod: "none",
    email: 'cooperspinelli@gmail.com',
    userName: 'Cooper Spinelli',
  };

  const signingUrlResp = await fetch(
    `${reqBody.basePath}/v2.1/accounts/${process.env.ACCOUNT_ID}/envelopes/${reqBody.envelopeId}/views/recipient`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${reqBody.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );
  const signingUrlData = await signingUrlResp.json();
  console.log("Envelope status updated successfully!");
  return NextResponse.json({ url: signingUrlData.url });
}

