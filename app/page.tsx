'use client';

import { FormEvent } from "react";
import Form from "./components/Form";

export default function Home() {

  async function handleSubmit(evt: FormEvent) {
    evt.preventDefault();
    console.log("in here");

    const nameInput = document.querySelector("#name") as HTMLInputElement;
    const favColorInput = document.querySelector("#favColor") as HTMLInputElement;

    const accessToken = "eyJ0eXAiOiJNVCIsImFsZyI6IlJTMjU2Iiwia2lkIjoiNjgxODVmZjEtNGU1MS00Y2U5LWFmMWMtNjg5ODEyMjAzMzE3In0.AQsAAAABAAUABwAAIOouVWncSAgAAGANPZhp3EgCADwaZJKhjQhIrbnfevOMUUAVAAEAAAAYAAIAAAAFAAAAHQAAAA0AJAAAADE4ZTYzZDNkLWNkNTQtNDFhMS1hZGQ3LTVmZWE3Yjc4OTIzYSIAJAAAADE4ZTYzZDNkLWNkNTQtNDFhMS1hZGQ3LTVmZWE3Yjc4OTIzYRIAAQAAAAsAAABpbnRlcmFjdGl2ZTAAgCHIJFVp3Eg3ANT_YenEENVIvyuN4xiUPw0.kToKj0zrCou5gy16L_NS1mZXGGMOWsRvdostwBRJl4BB-md9Krnz8aoPFVw2ofTts11BMVaf-a3tqZ6I3l8c-wzaxvIUpDP5U-OHr6qZuSwLEGl07Z33DPHFp0g1fGUshTjgMvtzFaTBAfCMbuXTjpPJZG8RNGS5gHcQIfG-LJVNBf9j58r3yoQBzIOHt96glXLO-q9kG0kGMTVDkun_MpulrkrtqB86cIQ2OnMb0ZlQGg22Ct_NHVN-j9-LGuT3d3FpIruqrEfQAJIkgWXiE6nEOf5jIDRCJT8e1aUA7VYQF7HrDtnCEsVH_nLC6FSg0Gt6MkN5kYTZjGUTGAwU3w";
    const basePath = "https://demo.docusign.net/restapi";
    const templateId = "4971e3ce-4ba3-4012-b417-67443b917cd9";
    const envelopeId = "b8a6bcf0-a2e8-4bbc-b57d-9c76c056b9f8";

    const payload = {
      accessToken,
      basePath,
      templateId,
      envelopeId,
      "documentId": "7ea61938-3429-4bb9-bbe7-63c442e305eb",
      name: nameInput.value,
      favColor: favColorInput.value
    };

    const mergeTagsResponse = await fetch('http://localhost:3000/api/docusign/mergeDataFields', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    const sendEmailResponse = await fetch('http://localhost:3000/api/docusign/sendEnvelope', {
      method: 'POST',
      body: JSON.stringify({
        accessToken,
        basePath,
        templateId,
        envelopeId
      })
    });

    const getSigningUrlResponse = await fetch('http://localhost:3000/api/docusign/getSigningUrl', {
      method: 'POST',
      body: JSON.stringify({
        accessToken,
        basePath,
        envelopeId
      })
    });

    const signingUrlData = await getSigningUrlResponse.json();

    console.log(signingUrlData.url);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input name='name' id="name" />
        <label>Favorite Color</label>
        <input name='favColor' id="favColor" />
        <button>Submit</button>
      </form>
    </div>
  );
}
