import axios from 'axios';
import store from '../store';

const http = axios.create(
    {
        baseURL: process.env.VUE_APP_API_URL
    }
);

http.interceptors.request.use(function (config) {
    store.dispatch('requestStarted');
    return config;
  }, function(err) {
    store.dispatch('requestFinished');
    return Promise.reject(err);
  });
  
  http.interceptors.response.use(
    function (response) {
      store.dispatch('requestFinished');
      return response;
    }, 
    function (error) {
      store.dispatch('requestFinished');
      return Promise.reject(error);
    }
  );

export default http;