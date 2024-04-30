import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const reqBody = await request.json();

  const name = 'anissa ';
  const favColor = "blue";

  const requestData = {
    docGenFormFields: [
      {
        documentId: reqBody.documentId,
        docGenFormFieldList: [
          {
            name: "name",
            value: name
          },
          {
            name: "favColor",
            value: favColor
          },
        ]
      }
    ]
  };

  try {
    const response = await fetch(`${reqBody.basePath}/v2.1/accounts/${process.env.ACCOUNT_ID}/envelopes/${reqBody.envelopeId}/docgenformfields`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${reqBody.accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });

    if (!response.ok) {
      const respText = await response.text();
      console.error("Failed to update docGenFormFields.", respText);
      return NextResponse.json({ error: respText });
    }

    console.log('docGenFormFields updated successfully!');
    return NextResponse.json({ message: 'Document updated successfully!' });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error });
  }
}

