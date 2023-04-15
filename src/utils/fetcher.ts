
import Cookies from 'js-cookie';

type DefaultHeaderType = {
  'Authorization': string,
  'Content-Type': string;
}

const COOKIE_NAME = 'token';

function get_default_headers(cookie_name: string = COOKIE_NAME): DefaultHeaderType {
  const token = Cookies.get(cookie_name);
  let headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
  return headers;
}


async function fetcher(url:string) {
  const headers = get_default_headers();
  let full_url = `http://localhost:8000${url}`;

  return fetch(full_url, {headers: headers}).then(res => res.json());
}

async function fetcher_post<Input, Output>(url: string, data: Input): Promise<Output> {
  const headers = get_default_headers();
  let full_url = `http://localhost:8000${url}`;

  return fetch(
    full_url,
    {
      method: "post",
      headers: headers,
      body: JSON.stringify(data)
    }
  ).then(res => res.json());
}

async function fetcher_upload(url: string, file: File) {
  let full_url = `http://localhost:8000${url}`;
  let headers: any = get_default_headers();
  const form_data  = new FormData();

  headers['Content-Type'] = 'multipart/form-data';

  form_data.append('file', file);

  return fetch(
    full_url,
    {
      method: "post",
      headers: headers,
      body: form_data
    }
  );
}

async function fetcher_patch<Input, Output>(url: string, data: Input): Promise<Output> {
  let headers = get_default_headers();
  let full_url = `http://localhost:8000${url}`;

  return fetch(
    full_url,
    {
      method: "PATCH",
      headers: headers,
      body: JSON.stringify(data)
    }
  ).then(res => res.json());
}

async function fetcher_delete<Input, Output>(url: string, data: Input): Promise<Output> {
  const headers = get_default_headers();
  let full_url = `http://localhost:8000${url}`;

  return fetch(
    full_url,
    {
      method: "delete",
      headers: headers,
      body: JSON.stringify(data)
    }
  ).then(res => res.json());
}



export {
  fetcher,
  fetcher_upload,
  fetcher_post,
  fetcher_patch,
  fetcher_delete
};