import axios from "axios";

const BASE_URL = "https://new-api.sevendisplays.com";



export const publicRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    ContentType: "application/json",
    AcceptLanguage: "de",
  },
});


// export const userRequest = axios.create({
//   baseURL: BASE_URL,
//   headers: { token: `Bearer ${TOKEN}` },
// });
