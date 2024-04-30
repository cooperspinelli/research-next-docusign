import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const reqBody = await request.json();

  try {
    const response = await fetch(`${reqBody.basePath}/v2.1/accounts/${process.env.ACCOUNT_ID}/envelopes/${reqBody.envelopeId}/docGenFormFields`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${reqBody.accessToken}`,
        'Accept': 'application/json'
      }
    });

    console.log("HTTP status code:", response.status);

    if (!response.ok) {
      console.log("Failed to fetch docGenFormFields.");
      const respText = await response.text();
      console.error(respText);
      return NextResponse.json({ error: respText });
    }

    const responseData = await response.json();
    const documentId = responseData.documentId; // Adjust this according to actual JSON structure
    console.log("DocGenFormFields:", JSON.stringify(responseData, null, 2));
    console.log('Document ID:', documentId);
    return NextResponse.json({ data: responseData });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error });
  }
}

