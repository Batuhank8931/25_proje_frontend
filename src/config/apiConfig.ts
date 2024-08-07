// src/config/apiConfig.ts

const BASE_URL = "https://api.management.parse25proje.link/api";

const API_URLS = {
  register: `${BASE_URL}/auth/register`,
  login: `${BASE_URL}/auth/login`,
  profile: `${BASE_URL}/auth/profile`,
  flags: `${BASE_URL}/commons/flags`,
  boards: `${BASE_URL}/boards`,
  tasks: `${BASE_URL}/tasks`,
  updateTask: (code: string) => `${BASE_URL}/tasks/${code}`,
  deleteTask: (code: string) => `${BASE_URL}/tasks/${code}`
};

export default API_URLS;
