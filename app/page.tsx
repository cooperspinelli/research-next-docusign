'use client';

import { FormEvent } from "react";
import Form from "./components/Form";

export default function Home() {
  async function handleSubmit(evt: FormEvent) {
    evt.preventDefault();
    const codeInput = document.querySelector('#code') as HTMLInputElement;
    const resp = await fetch('http://localhost:3001/api/docusign/apiKey', {
      method: 'POST',
      body: JSON.stringify({code: codeInput.value})
    });
    console.log(await resp.json());
  }

  return (
    <div>
      <Form />
      <form>
        <label htmlFor="">Code</label>
        <input type="text" name="code" id="code"/>
        <button onClick={handleSubmit}>Button</button>
      </form>
    </div>
  );
}
