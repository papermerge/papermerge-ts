import { useState } from 'react';

import Button from "./button";
import Input from "./input";


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
        <Input
          onchange={(value: string) => { setUsername(value);}}
          name="username"
          type="text"
          placeholder="Username or email" />
        <label className="form-label">
          Username
        </label>
      </div>

      <div className="mb-3 form-floating">
        <Input
          onchange={(value: string) => { setPassword(value);}}
          name="password"
          type="password"
          placeholder="" />
        <label className="form-label">
          Password
        </label>
      </div>

      <Button onClick={handleSubmit} />
    </form>
  );
}