import axios from "axios";

const entryPointUrl =
  process.env.REACT_APP_SERVER_ENDPOINT ?? "http://localhost:8000/api/";

export default axios.create({
  baseURL: entryPointUrl,
  headers: { "Content-Type": "application/json" },
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFTOKEN",
  withXSRFToken: true,
  withCredentials: true,
});
