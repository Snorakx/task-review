const BASE_URL = 'API_URL';

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Something went wrong');
  }
  return response.json();
};

const get = async (url: string) => {
  const response = await fetch(`${BASE_URL}${url}`);
  return handleResponse(response);
};

const post = async (url: string, data: unknown) => {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const put = async (url: string, data: unknown) => {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const del = async (url: string) => {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: 'DELETE',
  });
  return handleResponse(response);
};

export const apiService = {
  get,
  post,
  put,
  del,
};
