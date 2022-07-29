// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import http from './http'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.config.productionTip = false

http.interceptors.response.use(function (response) {
      store.commit('requestFinished');
      return response;
  }, function (error) {
    store.commit('requestFinished');
    if(error.response.status === 401) {
        localStorage.removeItem('megasortudo-token');
        store.commit('logout');	
        router.push({ name: 'Login', params: {mensagem: 'Sessao de usuário expirada.'}});  
    }
    return Promise.reject(error);
});

Vue.prototype.$http = http

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  data: {
    loading: false,
  },
})

