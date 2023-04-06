
import Cookies from 'js-cookie';

type DefaultHeaderType = {
  'Authorization': string,
  'Content-Type': string;
}

const COOKIE_NAME = 'token';

function get_default_headers(cookie_name: string = COOKIE_NAME): DefaultHeaderType {
  const token = Cookies.get(cookie_name);
  const headers = {
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

async function fetcher_post<T>(url: string, data: T): Promise<Response> {
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

export { fetcher, fetcher_post };