import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state : {
        loading: false,
    },

    getters: {
        isLoading : state => {
          return state.loading;
        },
    },
    
    mutations: {

        requestStarted(state) {
          state.loading = true;
        },
    
        requestFinished(state) {
          state.loading = false;
        }

    },
    
    actions: {
      requestStarted(context) {
        context.commit('requestStarted')
      },

      requestFinished(context) {
        context.commit('requestFinished')
      },

    }
});

export default store;