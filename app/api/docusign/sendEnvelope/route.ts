import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const reqBody = await request.json();

  const requestData = {
      status: "sent"
  };

  try {
      const response = await fetch(`${reqBody.basePath}/v2.1/accounts/${process.env.ACCOUNT_ID}/envelopes/${reqBody.envelopeId}`, {
          method: 'PUT',
          headers: {
              'Authorization': `Bearer ${reqBody.accessToken}`,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        const respText = await response.text();
          console.error("Failed to update envelope status.", respText);
          return NextResponse.json({ error: respText });
      }

      console.log('Envelope status updated successfully!');
      return NextResponse.json({ message: 'Document updated successfully!' });
  } catch (error) {
      console.error('Error:', error);
      return NextResponse.json({ error });
  }
}

