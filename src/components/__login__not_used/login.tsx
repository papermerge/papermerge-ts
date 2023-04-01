import { useState } from 'react';
import { AxiosError } from "axios";
import { signIn } from 'next-auth/react';

import { useAuth } from '@/contexts/auth';
import Button from "./button";
import Input from "./input";
import Error from './error';
import { ClickEvent } from './types';



function credentials_provided(username: string, password: string): boolean {
  /**
   * Returens true only if both username and password are provided
   * as non empty strings
   */
  if (!username) {
    return false;
  }
  if (!password) {
    return false;
  }

  let clean_username = username.trim();
  let clean_password = password.trim();

  if (clean_username === '') {
    return false;
  }

  if (clean_password === '') {
    return false;
  }

  return true;
}


export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [inProgress, setInProgress] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const handleSubmit = async (event: ClickEvent) => {
    event.preventDefault();
    setErrorMessage('');
    setInProgress(true);
    try {
      let response = await signIn(
        "credentials", {
          username: username,
          password: password,
          callbackUrl: "/home",
          redirect: true
        });
    } catch(err: any) {
      const error = err as AxiosError;
      setErrorMessage(error.message);
      console.error(error.toJSON())
    } finally {
      setInProgress(false);
    }
  }

  const handleChangeUsername = (value: string) => {
    setUsername(value);

    setErrorMessage('');

    // disable sign in button if credentials are not provided
    setIsEnabled(
      credentials_provided(value, password)
    );
  }

  const handleChangePassword = (value: string) => {
    setPassword(value);

    setErrorMessage('');

    // disable sign in button if credentials are not provided
    setIsEnabled(
      credentials_provided(username, value)
    );
  }

  return (
    <form>
      <div className="mb-3 form-floating">
        <Input
          onchange={handleChangeUsername}
          name="username"
          type="text"
          placeholder="Username or email" />
        <label className="form-label">
          Username
        </label>
      </div>

      <div className="mb-3 form-floating">
        <Input
          onchange={handleChangePassword}
          name="password"
          type="password"
          placeholder="" />
        <label className="form-label">
          Password
        </label>
      </div>

      <Button
        onClick={handleSubmit}
        in_progress={inProgress}
        is_enabled={isEnabled} />

      <Error message={errorMessage} />
    </form>
  );
}