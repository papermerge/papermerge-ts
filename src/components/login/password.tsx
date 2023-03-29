import { useState } from 'react';
import type { OnChangeType } from './types';


export default function Password({onchange}: OnChangeType) {
  const [value, setValue] = useState('');

  const changeHandle = (event: React.SyntheticEvent) => {
    let target = event.target as HTMLInputElement;
    setValue(target.value);
    onchange(target.value);
  }

  return (
    <>
      <input id='password'
        className="form-control"
        placeholder="Enter Password"
        name="password"
        value={value}
        onChange={changeHandle}
        type="password" />
      <label htmlFor="password" className="form-label">
        Password
      </label>
    </>
  );
}