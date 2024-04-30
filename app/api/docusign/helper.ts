const ACCOUNT_ID = process.env.ACCOUNT_ID;

async function createTemplate(accessToken: string, basePath: string){

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
      const response = await fetch(`${basePath}/v2.1/accounts/${ACCOUNT_ID}/templates`, {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestData)
      });

      if (response.status > 201) {
          console.error('Request failed:', await response.text());
          return;
      }

      const responseData = await response.json();
      const templateId = responseData.templateId;
      console.log('Template created with ID:', templateId);
      return templateId;
  } catch (error) {
      console.error('Error making request:', error);
  }
}