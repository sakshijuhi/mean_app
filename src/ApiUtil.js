import axios from "axios";
const API_BASE_URL = "http://localhost:5000";

const request = options => {
  const head = {
    "Content-Type": "application/json"
  };

  if (localStorage.getItem("accessToken")) {
    head["Authorization"] = "Bearer " + localStorage.getItem("accessToken");
  }

  const defaults = { headers: head };
  options = Object.assign({}, defaults, options);

  return axios(options.url, options).then(response => {
    return response.data;
  }).catch(error=>{
    return Promise.reject(error);
  });
};

export function signup(signuprequest) {
  return request({
    url: API_BASE_URL + "/auth/signup",
    method: "post",
    data: signuprequest
  });
}

export function signin(signinrequest) {
  return request({
    url: API_BASE_URL + "/auth/signin",
    method: "POST",
    data: signinrequest
  });
}

export function dashboard(dashboard) {
  return request({
    url: API_BASE_URL + "/auth/dashboard",
    method: "POST",
    data: dashboard
  });
}

export function udpateDetails(details) {
  return request({
    url: API_BASE_URL + "/user/details",
    method: "POST",
    data: details
  });
}

export function getDetails(id) {
  return request({
    url: API_BASE_URL + "/user/details/" + id,
    method: "GET"
  });
}

export function getRoles(id) {
  return request({
    url: API_BASE_URL + "/user/details/",
    method: "POST"
  });
}

export function getCurrentUser() {
  return request({
    url: API_BASE_URL + "/auth/me",
    method: "GET"
  });
}

export function authorizeUser(id) {
  return request({
    url: API_BASE_URL + "/user/authorize/" + id,
    method: "GET"
  });
}

export function unauthorizeUser(id) {
  return request({
    url: API_BASE_URL + "/user/unauthorize/" + id,
    method: "GET"
  });
}

export function changeRole(value, id) {
  return request({
    url: API_BASE_URL + "/user/changerole/" + id,
    method: "POST",
    data: { name: value }
  });
}

export function fetchRoles() {
  return request({
    url: API_BASE_URL + "/roles",
    method: "GET"
  });
}

export function createRole(role) {
  return request({
    url: API_BASE_URL + "/roles",
    method: "POST",
    data: role
  });
}

export function search(authType, searchText) {
  return request({
    url: API_BASE_URL + "/user/search",
    method: "POST",
    data: { authType: authType, searchText: searchText }
  });
}
