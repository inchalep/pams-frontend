import axios from 'axios';
import {variables} from '../constants/config.js';
import store from '../store/index.js';

export const _post = (url, payload) => {
  return axios.post(`${variables.BACKEND_URL}${url}`, payload, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage?.getItem('token')}`,
    },
  });
};

export const _get = (url, options) => {
  return axios.get(`${variables.BACKEND_URL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage?.getItem('token')}`,
    },
  });
};

export const _patch = (url, payload) => {
  return axios.patch(`${variables.BACKEND_URL}${url}`, payload, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage?.getItem('token')}`,
    },
  });
};

export const _del = (url) => {
  return axios.delete(`${variables.BACKEND_URL}${url}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage?.getItem('token')}`,
    },
  });
};