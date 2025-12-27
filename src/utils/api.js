import axios from 'axios';
import {variables} from '../constants/config.js';
const baseUrl = variables.BACKEND_URL;
console.log({baseUrl})
export const _post = (url, payload) => {
  return axios.post(`${baseUrl}${url}`, payload, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage?.getItem('token')}`,
    },
  });
};

export const _get = (url, options) => {
  return axios.get(`${baseUrl}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage?.getItem('token')}`,
    },
  });
};

export const _patch = (url, payload) => {
  return axios.patch(`${baseUrl}${url}`, payload, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage?.getItem('token')}`,
    },
  });
};

export const _del = (url) => {
  return axios.delete(`${baseUrl}${url}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage?.getItem('token')}`,
    },
  });
};