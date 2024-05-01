"use client";

import { FormEvent } from "react";
import Form from "./components/Form";

export default function Home() {
  async function handleSubmit(evt: FormEvent) {
    evt.preventDefault();
    console.log("in here");

    const nameInput = document.querySelector("#name") as HTMLInputElement;
    const favColorInput = document.querySelector(
      "#favColor"
    ) as HTMLInputElement;

    const accessToken =
    "eyJ0eXAiOiJNVCIsImFsZyI6IlJTMjU2Iiwia2lkIjoiNjgxODVmZjEtNGU1MS00Y2U5LWFmMWMtNjg5ODEyMjAzMzE3In0.AQsAAAABAAUABwAAUqbqS2ncSAgAAJLJ-I5p3EgCAHTyRgQzb7JJjYIlqKbc6FQVAAEAAAAYAAIAAAAFAAAAHQAAAA0AJAAAAGI2MzdmNmYwLWI2MDQtNDIxNi1hODJiLTNkYmJhYzNhYWM4OSIAJAAAAGI2MzdmNmYwLWI2MDQtNDIxNi1hODJiLTNkYmJhYzNhYWM4ORIAAQAAAAsAAABpbnRlcmFjdGl2ZTAAgOCPu0tp3Eg3AB4Qc1M2_-9Alakk7Iv6Xec.cmaxVL9DCwe5hwkhO5DvJMlkNxLrZDHj2NoEHf_J8-Zmcdd9-__wgMIQkWvFomd0MyfUCB7J-6Du_rDOtZ3pIbes1l7e0vxKlbGKrt_bknsCgDuWa5UAihWDEkZKAAXVmJZWpE8z9N031h8Egw4ZSr7OuzMZ2yD-NPAcLzCDXbkdWgZYquZ1NeyU0Wto6xnXljE7rKvj60vP4iKy4r1ndqVafBflP75WMCVlZNeKI3kDwXeYjUBxdgsGqY1BI_tY703_40xlDK1gSNolhN-4FScv_MToyVTwFi4WWI3mWtr3f5oqAU81fev_hmOr0jh3lV3zPqYHo4dwGTtxxw3PlA"
    const basePath = "https://demo.docusign.net/restapi";

    // ********* this would be separate functionality run once.
    //create template
    const templateResponse = await fetch(
      "http://localhost:3000/api/docusign/template",
      {
        method: "POST",
        body: JSON.stringify({
          accessToken,
          basePath,
        }),
      }
    );

    const templateData = await templateResponse.json();
    console.log('addTemplate:', templateData);
    const templateId = templateData.templateId;

    //attach doc to template
    const addDocResp = await fetch(
      "http://localhost:3000/api/docusign/addDoc",
      {
        method: "POST",
        body: JSON.stringify({
          accessToken,
          basePath,
          templateId
        }),
      }
    );

    console.log('addDoc', await addDocResp.json());


    //add tabs to template
    const addTabsResp = await fetch("http://localhost:3000/api/docusign/addTabs", {
      method: "POST",
        body: JSON.stringify({
          accessToken,
          basePath,
          templateId
        }),
    })

    console.log('addTabs', await addTabsResp.json());

    // ********* what to run for each user
    //create envelope
    const envResp = await fetch("http://localhost:3000/api/docusign/createEnvelope", {
      method: "POST",
        body: JSON.stringify({
          accessToken,
          basePath,
          templateId
        }),
    });

    const envData = await envResp.json();
    console.log(envData);
    const envelopeId = envData.envelopeId;

    // generate doc form fields
    const genDocFormsResp = await fetch("http://localhost:3000/api/docusign/getDocGenFormFields", {
      method: "POST",
        body: JSON.stringify({
          accessToken,
          basePath,
          templateId,
          envelopeId
        }),
    });

    const genDocFormData =  await genDocFormsResp.json();
    console.log('genDocForms', genDocFormData);
    const documentId = genDocFormData.data.docGenFormFields[0].documentId


    const payload = {
      accessToken,
      basePath,
      templateId,
      envelopeId,
      documentId,
      name: nameInput.value,
      favColor: favColorInput.value,
    };

    const mergeTagsResponse = await fetch(
      "http://localhost:3000/api/docusign/mergeDataFields",
      {
        method: "POST",
        body: JSON.stringify(payload),
      }
    );

    const sendEmailResponse = await fetch(
      "http://localhost:3000/api/docusign/sendEnvelope",
      {
        method: "POST",
        body: JSON.stringify({
          accessToken,
          basePath,
          templateId,
          envelopeId,
        }),
      }
    );

    const getSigningUrlResponse = await fetch(
      "http://localhost:3000/api/docusign/getSigningUrl",
      {
        method: "POST",
        body: JSON.stringify({
          accessToken,
          basePath,
          envelopeId,
        }),
      }
    );

    const signingUrlData = await getSigningUrlResponse.json();

    console.log(signingUrlData);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input name="name" id="name" />
        <label>Favorite Color</label>
        <input name="favColor" id="favColor" />
        <button>Submit</button>
      </form>
    </div>
  );
}
