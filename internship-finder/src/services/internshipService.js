import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/internships";

function internshipUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getInternships() {
  return http.get(apiEndpoint);
}

export function getInternship(internshipId) {
  return http.get(internshipUrl(internshipId));
}

export function saveInternship(internship) {
  if (internship._id) {
    const body = { ...internship };
    delete body._id;
    return http.put(internshipUrl(internship._id), body);
  }

  return http.post(apiEndpoint, internship);
}

export function deleteInternship(internshipId) {
  return http.delete(InternshipUrl(internshipId));
}