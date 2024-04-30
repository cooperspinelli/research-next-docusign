////////////
// Step 2 //
////////////

async function createTemplate() {
    const accessToken = 'YOUR_ACCESS_TOKEN';
    const accountId = 'YOUR_ACCOUNT_ID';
    const basePath = 'YOUR_BASE_PATH';

    const requestData = {
        description: "Example template created via the API",
        name: "Example document generation template",
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
        const response = await fetch(`${basePath}/v2.1/accounts/${accountId}/templates`, {
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
    } catch (error) {
        console.error('Error making request:', error);
    }
}

createTemplate();


////////////
// Step 3 //
////////////

const fs = require('fs');
const path = require('path');

async function updateTemplateDocument() {
    const accessToken = 'YOUR_ACCESS_TOKEN';
    const accountId = 'YOUR_ACCOUNT_ID';
    const basePath = 'YOUR_BASE_PATH';
    const templateId = 'YOUR_TEMPLATE_ID';
    const filePath = path.join('demo_documents', 'Offer_Letter_Dynamic_Table.docx');

    try {
        // Read and base64 encode the document
        const documentBuffer = fs.readFileSync(filePath);
        const documentBase64 = documentBuffer.toString('base64');

        // Construct request JSON
        const requestData = {
            documents: [
                {
                    documentBase64: documentBase64,
                    documentId: "1",
                    fileExtension: "docx",
                    order: "1",
                    pages: "1",
                    name: "OfferLetterDemo.docx"
                }
            ]
        };

        // Send the PUT request
        const response = await fetch(`${basePath}/v2.1/accounts/${accountId}/templates/${templateId}/documents/1`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            console.error('Request failed:', await response.text());
            return;
        }

        console.log('Document updated successfully!');
    } catch (error) {
        console.error('Error:', error);
    }
}

updateTemplateDocument();


////////////
// Step 4 //
////////////

const fetch = require('node-fetch');

async function addTabsToTemplate() {
    const accessToken = 'YOUR_ACCESS_TOKEN';
    const accountId = 'YOUR_ACCOUNT_ID';
    const basePath = 'YOUR_BASE_PATH';
    const templateId = 'YOUR_TEMPLATE_ID';

    const requestData = {
        signHereTabs: [
            {
                anchorString: "Employee Signature",
                anchorUnits: "pixels",
                anchorXOffset: "5",
                anchorYOffset: "-22"
            }
        ],
        dateSignedTabs: [
            {
                anchorString: "Date Signed",
                anchorUnits: "pixels",
                anchorYOffset: "-22"
            }
        ]
    };

    try {
        const response = await fetch(`${basePath}/v2.1/accounts/${accountId}/templates/${templateId}/recipients/1/tabs`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            console.error('Request failed:', await response.text());
            return;
        }

        console.log('Tabs added successfully!');
    } catch (error) {
        console.error('Error:', error);
    }
}

addTabsToTemplate();


////////////
// Step 5 //
////////////

async function sendEnvelope() {
    const accessToken = 'YOUR_ACCESS_TOKEN';
    const accountId = 'YOUR_ACCOUNT_ID';
    const basePath = 'YOUR_BASE_PATH';
    const templateId = 'YOUR_TEMPLATE_ID';
    const signerEmail = 'SIGNER_EMAIL';
    const signerName = 'SIGNER_NAME';

    const requestData = {
        templateId: templateId,
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
        const response = await fetch(`${basePath}/v2.1/accounts/${accountId}/envelopes`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        if (response.status > 201) {
            console.error("Envelope creation failed.");
            console.error(await response.text());
            return;
        }

        const responseData = await response.json();
        const envelopeId = responseData.envelopeId;
        console.log('Envelope created successfully! Envelope ID:', envelopeId);
    } catch (error) {
        console.error('Error:', error);
    }
}

sendEnvelope();

////////////
// Step 6 //
////////////

async function fetchDocGenFormFields() {
    const accessToken = 'YOUR_ACCESS_TOKEN';
    const accountId = 'YOUR_ACCOUNT_ID';
    const basePath = 'YOUR_BASE_PATH';
    const envelopeId = 'YOUR_ENVELOPE_ID';

    try {
        const response = await fetch(`${basePath}/v2.1/accounts/${accountId}/envelopes/${envelopeId}/docGenFormFields`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json'
            }
        });

        console.log("HTTP status code:", response.status);

        if (!response.ok) {
            console.log("Failed to fetch docGenFormFields.");
            console.error(await response.text());
            return;
        }

        const responseData = await response.json();
        const documentId = responseData.documentId; // Adjust this according to actual JSON structure
        console.log("DocGenFormFields:", JSON.stringify(responseData, null, 2));
        console.log('Document ID:', documentId);
    } catch (error) {
        console.error('Error:', error);
    }
}

fetchDocGenFormFields();

////////////
// Step 7 //
////////////

async function updateDocGenFormFields() {
    const accessToken = 'YOUR_ACCESS_TOKEN';
    const accountId = 'YOUR_ACCOUNT_ID';
    const basePath = 'YOUR_BASE_PATH';
    const envelopeId = 'YOUR_ENVELOPE_ID';
    const documentId = 'YOUR_DOCUMENT_ID';
    const candidateName = 'CANDIDATE_NAME';
    const jobTitle = 'JOB_TITLE';
    const managerName = 'MANAGER_NAME';
    const startDate = 'START_DATE';
    const salary = 'SALARY'; // Ensure this is a string formatted properly
    const rsus = 'RSUS'; // This should be formatted correctly as well

    const requestData = {
        docGenFormFields: [
            {
                documentId: documentId,
                docGenFormFieldList: [
                    {
                        name: "Candidate_Name",
                        value: candidateName
                    },
                    {
                        name: "Job_Title",
                        value: jobTitle
                    },
                    {
                        name: "Manager_Name",
                        value: managerName
                    },
                    {
                        name: "Start_Date",
                        value: startDate
                    },
                    {
                        name: "Compensation_Package",
                        type: "TableRow",
                        rowValues: [
                            {
                                docGenFormFieldList: [
                                    {
                                        name: "Compensation_Component",
                                        value: "Salary"
                                    },
                                    {
                                        name: "Details",
                                        value: salary
                                    }
                                ]
                            },
                            {
                                docGenFormFieldList: [
                                    {
                                        name: "Compensation_Component",
                                        value: "Bonus"
                                    },
                                    {
                                        name: "Details",
                                        value: "20%"
                                    }
                                ]
                            },
                            {
                                docGenFormFieldList: [
                                    {
                                        name: "Compensation_Component",
                                        value: "RSUs"
                                    },
                                    {
                                        name: "Details",
                                        value: rsus
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    };

    try {
        const response = await fetch(`${basePath}/v2.1/accounts/${accountId}/envelopes/${envelopeId}/docgenformfields`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            console.error("Failed to update docGenFormFields.", await response.text());
            return;
        }

        console.log('docGenFormFields updated successfully!');
    } catch (error) {
        console.error('Error:', error);
    }
}

updateDocGenFormFields();


////////////
// Step 8 //
////////////

async function updateEnvelopeStatus() {
    const accessToken = 'YOUR_ACCESS_TOKEN';
    const accountId = 'YOUR_ACCOUNT_ID';
    const basePath = 'YOUR_BASE_PATH';
    const envelopeId = 'YOUR_ENVELOPE_ID';

    const requestData = {
        status: "sent"
    };

    try {
        const response = await fetch(`${basePath}/v2.1/accounts/${accountId}/envelopes/${envelopeId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            console.error("Failed to update envelope status.", await response.text());
            return;
        }

        console.log('Envelope status updated successfully!');
    } catch (error) {
        console.error('Error:', error);
    }
}

updateEnvelopeStatus();
