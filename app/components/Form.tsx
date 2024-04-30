'use client';

import { useState } from "react";

const INIT_FORM_DATA = {
    name: '',
    email: '',
    color: ''
}

export default function Form() {
    const [formData, setFormData] = useState(INIT_FORM_DATA);

    function handleChange(evt: FormInputEvent) {
        setFormData(data => ({
            ...data,
            [evt.target.name]: evt.target.value
        }))
    }

    function handleSubmit() {

    }

    return (
        <form>
            <label>Name</label>
            <input name='name' onChange={handleChange} value={formData.name}/>

            <label>Favorite Color</label>
            <input name='color' onChange={handleChange} value={formData.name}/>
            <button onSubmit={handleSubmit}>Submit</button>
        </form>
    );
  }