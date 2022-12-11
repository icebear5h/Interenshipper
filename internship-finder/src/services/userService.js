import http from "./httpService";
import { getCurrentUser } from "./authService";
import config from "../config.json";
//import { get } from "lodash";
//import { getByDisplayValue, getByTestId } from "@testing-library/react";

const apiEndpoint = config.apiUrl + "/users";

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name,
  });
}

export async function getUser() {
  //get token
  const userJWT = getCurrentUser();
  if (userJWT === null) return null;
  //console.log(userJWT);
  //find by id
  const user = await http.post(apiEndpoint+"/me", {
    userId:userJWT._id
  });
  //console.log(user.data.user);
  return user.data.user;
}

export async function addToList (internshipId, userId){
  const user = await http.post(apiEndpoint+"/me/interestList", {
    internshipId,
    userId
  });
  return user.data;
}

export async function removeFromList (internshipId, userId){
  const user  = await http.post(apiEndpoint+"/me/deleteFromInterestList", {
    internshipId,
    userId
  });
  return user.data;
}