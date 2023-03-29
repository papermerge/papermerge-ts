import { useState } from 'react';
import type { OnChangeType } from './types';


export default function Username({onchange}: OnChangeType) {
  const [value, setValue] = useState('');

  const changeHandle = (event: React.SyntheticEvent) => {
    let target = event.target as HTMLInputElement;
    setValue(target.value);
    onchange(target.value);
  }

  return (
    <>
      <input id='identification'
        name="username_or_email"
        value={value}
        onChange={changeHandle}
        className="form-control"
        placeholder="Username or email" />
      <label htmlFor="identification" className="form-label">
        Username or Email
      </label>
    </>
  );
}