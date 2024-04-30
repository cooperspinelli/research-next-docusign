import { NextRequest, NextResponse } from "next/server";
import fs from "fs";

export async function POST(request: NextRequest) {
  const reqBody = await request.json();

  // const filePath = path.join(__dirname, "docusign_test_doc.docx");
  const filePath = "/home/cooper/rithm/projects/research-next-docusign/app/api/docusign/addDoc/docusign_test_doc.docx"

  try {
    // Read and base64 encode the document
    const documentBuffer = fs.readFileSync(filePath);
    const documentBase64 = documentBuffer.toString('base64');

    console.log(documentBase64);

    // Construct request JSON
    const requestData = {
      documents: [
        {
          documentBase64: documentBase64,
          documentId: "1",
          fileExtension: "docx",
          order: "1",
          pages: "1",
          name: "docusign_test_doc.docx"
        }
      ]
    };

    // Send the PUT request
    const response = await fetch(`${reqBody.basePath}/v2.1/accounts/${process.env.ACCOUNT_ID}/templates/${reqBody.templateId}/documents/1`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${reqBody.accessToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(requestData)
    });

    if (!response.ok) {
      const respText = await response.text();
      console.error('Request failed:', respText);
      return NextResponse.json({ error: respText });
    }

    console.log('Document updated successfully!');
    return NextResponse.json({ message: 'Document updated successfully!' });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error });
  }
}

