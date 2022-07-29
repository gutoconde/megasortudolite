<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="dark" fixed="top">
      <b-navbar-brand to="/">Mega-Sort&#x028A;do</b-navbar-brand>
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/">Palpites</b-nav-item>
          <b-nav-item to="/estatisticaList">Estatísticas</b-nav-item>
          <b-nav-item to="/about">Saiba mais</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-img :src="require('./assets/ferradura.jpg')" fluid alt="Ferradura da Sorte"/>
    
    <b-overlay :show="$store.getters.isLoading">
      <main role="main" class="container">
          <div class="starter-template">
              <router-view/>
          </div>
      </main>
    </b-overlay>
    <p><small>build: {{build}}</small></p>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: function () {
    return {
      build: process.env.VUE_APP_VERSAO + '-' + process.env.VUE_APP_TIMESTAMP + '-' + process.env.VUE_APP_GITHASH,
      usuarioLogado: false,
    }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.img-fluid {
  max-width: 50%;
  height: auto;
}

</style>
