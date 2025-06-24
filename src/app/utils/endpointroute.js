import axios from "axios";

const endpointroute = axios.create({
  baseURL: "https://report-backend-xe01.onrender.com/api/",
});

//  Attach token only if available
endpointroute.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default endpointroute;
