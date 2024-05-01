import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const reqBody = await request.json();

  const requestData = {
    description: "Example template created via the API",
    name: "Example document generation template to get favorite color",
    shared: false,
    emailSubject: "Please sign this document",
    status: "created",
    recipients: {
        signers: [
            {
                recipientId: "1", roleName: "signer", routingOrder: "1"
            }
        ]
    }
};

try {
    const response = await fetch(`${reqBody.basePath}/v2.1/accounts/${process.env.ACCOUNT_ID}/templates`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${reqBody.accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    });

    const responseData = await response.json();
    console.log(responseData)

    if (response.status > 201) {
        console.error('Request failed:', await response.text());
        return NextResponse.json(responseData);
    }

    const templateId = responseData.templateId;
    console.log('Template created with ID:', templateId);
    return NextResponse.json({templateId});
} catch (error) {
    console.error('Error making request:', error);
    return NextResponse.json({error});
}
}