import axios from "axios";
import logger from "./logService";
import { toast } from "react-toastify";
import { Clerk } from "@clerk/clerk-sdk-node";

const clerk = new Clerk({ apiKey: process.env.CLERK_BACKEND_API_KEY });

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log(error);
    toast.error("An unexpected error occurrred.");
  }

  return Promise.reject(error);
});

async function setJwt() {
  const sessionToken = await clerk.sessions.verifyToken(sessionToken);
  axios.defaults.headers.common["Authorization"] = `Bearer ${sessionToken}`;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
};