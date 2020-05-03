import 'isomorphic-unfetch';
import config from '~/config';

const apiBase = `${config.API_URL}${config.API_BASE_URL}`;

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return parseJSON(response);
  }
  return parseJSON(response).then((result) =>
    Promise.reject(new Error(result.message))
  );
}

function errorHandler(error) {
  console.error('error', error);
  throw error;
}

export const getCellar = () =>
  fetch(`${apiBase}${config.ROUTES.WINE}`)
    .then(checkStatus)
    .catch(errorHandler);

export const uploadWinePicture = (picture) => {
  const data = new window.FormData();
  data.append(config.PICTURE_UPLOAD.FILE_NAME, picture);
  return fetch(`${apiBase}${config.ROUTES.PICTURE}`, {
    method: 'POST',
    body: data,
  })
    .then(checkStatus)
    .catch(errorHandler);
};

export const addWine = (wine) => {
  return fetch(`${apiBase}${config.ROUTES.WINE}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ wine }),
  })
    .then(checkStatus)
    .catch(errorHandler);
};

export const removeBottles = (bottleIds) => {
  return fetch(`${apiBase}${config.ROUTES.BOTTLE}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ bottleIds }),
  })
    .then(checkStatus)
    .catch(errorHandler);
};

export const getWineFamilies = () => {
  return fetch(`${apiBase}${config.ROUTES.WINE_FAMILY}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(checkStatus)
    .catch(errorHandler);
};

export const addToFavorite = (wineId) => {
  return fetch(`${apiBase}${config.ROUTES.FAVORITE}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ wineId }),
  })
    .then(checkStatus)
    .catch(errorHandler);
};

export const removeFromFavorite = (wineId) => {
  return fetch(`${apiBase}${config.ROUTES.FAVORITE}/${wineId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(checkStatus)
    .catch(errorHandler);
};

export const createWineFamily = (name) => {
  return fetch(`${apiBase}${config.ROUTES.WINE_FAMILY}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  })
    .then(checkStatus)
    .catch(errorHandler);
};

export const removeOutsideBottles = (wineId, count) => {
  return fetch(`${apiBase}${config.ROUTES.WINE}/${wineId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ count }),
  })
    .then(checkStatus)
    .catch(errorHandler);
};
