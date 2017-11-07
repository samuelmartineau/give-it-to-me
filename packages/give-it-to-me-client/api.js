import { checkStatus } from "utils/fetch";

const apiBase = "/api";

function errorHandler(error) {
  console.error("error", error);
  throw error;
}

export const getRoutes = searchType =>
  fetch(`${apiBase}/Parcours/GetDistribTree`, { credentials: "include" })
    .then(checkStatus)
    .catch(errorHandler);

export const getUser = () =>
  fetch(`${apiBase}/Users/CurrentFullInfos`, {
    credentials: "include"
  })
    .then(checkStatus)
    .catch(errorHandler);

export const getDepartments = () =>
  fetch(`${apiBase}/departements/All`, { credentials: "include" })
    .then(checkStatus)
    .then(departments => {
      departments.sort((a, b) => a.CodeDepartement - b.CodeDepartement);
      return departments;
    })
    .catch(errorHandler);
