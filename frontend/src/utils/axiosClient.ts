import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
