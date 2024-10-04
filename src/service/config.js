import axios from "axios";

const https = axios.create({
   baseURL: import.meta.env.VITE_API_KEY,
});

https.interceptors.request.use((config) => {
   const access_token = localStorage.getItem("access_token");
   if (access_token) {
      config.headers["Authorization"] = `Bearer ${access_token}`;
   }
   return config;
});

export default https;
