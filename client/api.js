import 'isomorphic-unfetch';
import config from '~/config';

const apiBase = `http://localhost:4000${config.API_BASE_URL}`;

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return parseJSON(response);
  }
  return parseJSON(response).then(result =>
    Promise.reject(new Error(result.message))
  );
}

function errorHandler(error) {
  console.error('error', error);
  throw error;
}

export const getCellar = () =>
  fetch(`${apiBase}${config.ROUTES.WINE}`, { credentials: 'include' })
    .then(checkStatus)
    .catch(errorHandler);

export const uploadWinePicture = picture => {
  const data = new window.FormData();
  data.append(config.PICTURE_UPLOAD.FILE_NAME, picture);
  return fetch(`${apiBase}${config.ROUTES.PICTURE}`, {
    method: 'POST',
    body: data
  })
    .then(checkStatus)
    .catch(errorHandler);
};

export const addWine = wine => {
  return fetch(`${apiBase}${config.ROUTES.WINE}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ wine })
  })
    .then(checkStatus)
    .catch(errorHandler);
};

export const removeBottles = bottleIds => {
  return fetch(`${apiBase}${config.ROUTES.BOTTLE}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ bottleIds })
  })
    .then(checkStatus)
    .catch(errorHandler);
};
