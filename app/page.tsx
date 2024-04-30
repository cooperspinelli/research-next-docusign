'use client';

import { FormEvent } from "react";
import Form from "./components/Form";

export default function Home() {
  async function handleSubmitGetAccess(evt: FormEvent) {
    evt.preventDefault();
    const codeInput = document.querySelector('#code') as HTMLInputElement;
    const respAccessToken = await fetch('http://localhost:3000/api/docusign/apiKey', {
      method: 'POST',
      body: JSON.stringify({code: codeInput.value})
    });
    const data = await respAccessToken.json();

    console.log(data);
    const accessToken = data.access_token;
    const respUri = await fetch('http://localhost:3000/api/docusign/baseUri', {
      method: 'POST',
      body: JSON.stringify({token: accessToken})
    });
    console.log(await respUri.json());
  }





  return (
    <div>
      <Form />
      <form>
        <label htmlFor="">Authorization Code</label>
        <input type="text" name="code" id="code"/>
        <button onClick={handleSubmitGetAccess}>Button</button>
      </form>
    </div>
  );
}
