import { useState } from 'react';

import Username from "./username";
import Password from "./password";
import Button from "./button";


export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: Event) => {
    event.preventDefault();
    console.log(`Form submitted! username=${username}, password=${password}`);
  }

  return (
    <form>
      <div className="mb-3 form-floating">
        <Username onchange={(value: string) => { setUsername(value);}}/>
      </div>

      <div className="mb-3 form-floating">
        <Password onchange={(value: string) => { setPassword(value);}} />
      </div>

      <Button onClick={handleSubmit} />
    </form>
  );
}