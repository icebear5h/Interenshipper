import http from "./httpService";
import { Clerk } from "@clerk/clerk-sdk-node";
import config from "../config.json";

const clerk = new Clerk(process.env.CLERK_BACKEND_API_KEY);
const apiEndpoint = config.apiUrl + "/users";

export async function getUser(userId) {
  const user = await clerk.users.getUser(userId);
  return user;
}

export async function addToList(internshipId, sessionToken) {
  const session = await clerk.sessions.verifyToken(sessionToken);
  if (!session) throw new Error("User not signed in");

  const response = await http.post(apiEndpoint + "/me/interestList", {
    internshipId,
    userId: session.userId
  });

  return response.data;
}

export async function removeFromList(internshipId, sessionToken) {
  const session = await clerk.sessions.verifyToken(sessionToken);
  if (!session) throw new Error("User not signed in");

  const response = await http.post(apiEndpoint + "/me/deleteFromInterestList", {
    internshipId,
    userId: session.userId
  });

  return response.data;
}