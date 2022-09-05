import axios, { AxiosError } from 'axios';

export type ExpectedAxiosError = {
  message: string;
};

export const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const isAxiosError = (error: unknown): error is AxiosError<ExpectedAxiosError> => {
  return axios.isAxiosError(error);
};
