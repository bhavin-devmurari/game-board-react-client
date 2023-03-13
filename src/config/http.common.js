import axios from "axios";

// For local use _BASE_URL
// const BASE_URL = "http://localhost:9000/";

//For live
const BASE_URL = "https://gameboard-api.onrender.com/";

const NETWORK_TIMEOUT = 30000;

export const httpClient = axios.create({
  baseURL: BASE_URL,
  timeout: NETWORK_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});
