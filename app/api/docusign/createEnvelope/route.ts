
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const reqBody = await request.json();

  const signerEmail = 'cooperspinelli@gmail.com';
  const signerName = 'Cooper Spinelli';

  const requestData = {
    templateId: reqBody.templateId,
    templateRoles: [
      {
        email: signerEmail,
        name: signerName,
        roleName: "signer"
      }
    ],
    status: "created"
  };

  console.log("Sending the envelope request to DocuSign...");

  try {
    const response = await fetch(`${reqBody.basePath}/v2.1/accounts/${process.env.ACCOUNT_ID}/envelopes`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${reqBody.accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });

    if (response.status > 201) {
      console.error("Envelope creation failed.");
      const responseText = await response.text();
      console.error(responseText);
      return NextResponse.json({ error: responseText });
    }

    const responseData = await response.json();
    const envelopeId = responseData.envelopeId;
    console.log('Envelope created successfully! Envelope ID:', envelopeId);
    return NextResponse.json({ envelopeId });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error });
  }
}

