import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const reqBody = await request.json();

  const requestData = {
    signHereTabs: [
      {
        anchorString: "sn1",
        anchorUnits: "pixels",
        anchorYOffset: "10"
      }
    ]
  };

  try {
    const response = await fetch(`${reqBody.basePath}/v2.1/accounts/${process.env.ACCOUNT_ID}/templates/${reqBody.templateId}/recipients/1/tabs`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${reqBody.accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });

    if (!response.ok) {
      const responseText = await response.text();
      console.error('Request failed:', responseText);
      return NextResponse.json({ error: responseText });
    }

    console.log('Tabs added successfully!');
    return NextResponse.json({ message: "Tabs added successfully!" });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error });
  }
}

