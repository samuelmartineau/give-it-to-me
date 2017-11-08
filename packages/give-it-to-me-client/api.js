import "isomorphic-unfetch";

const apiBase = "http://localhost:4000/api";

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
  console.error("error", error);
  throw error;
}

export const getCellar = () =>
  fetch(`${apiBase}/wine`, { credentials: "include" })
    .then(checkStatus)
    .catch(errorHandler);
