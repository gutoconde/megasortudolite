<template>
  <div>
    <h1>Mega-Sort&#x028A;do</h1>
    
    <div>
      <b-card :title="'Palpites para o Concurso ' + concursos[currentPage -1].concurso">
            <div class="card-body">
              <ul class="resultado-loteria">
                <li v-bind:style="{ background:  previsao.sorteada ? '#ff3300' : '#0369FF'}" v-for="previsao in concursos[currentPage -1].dezenas" :key="previsao.concurso">
                  {{(previsao.dezena).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}} 
                </li>
              </ul>
            </div>
            <h4 class="card-title" v-if="currentPage != 1">Dezenas Sorteadas</h4>
            <div class="card-body" v-if="currentPage != 1"> 
              <ul class="resultado-loteria">
                <li style="background:  #008C50" v-for="dezena_sorteada in concursos[currentPage -1].dezenas_sorteadas" :key="dezena_sorteada">
                  {{(dezena_sorteada).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}} 
                </li>
              </ul>

            </div>
            <br/>
            <b-pagination size="lg" align="center" 
              :limit='1' hide-goto-end-buttons :total-rows="concursos.length" 
              v-model="currentPage" :per-page="1"
              prev-text="Próximo" next-text="Anterior">
            </b-pagination>
      </b-card>
      
    </div>
  </div>
  

</template>

<script>

export default {

  name: 'PalpitesPage',
  data () {
    return {
      currentPage: 1,
      concursos : [
        {
          'concurso': ''
        }
      ]
    }
  },
  methods: {
    change(page) {
      this.currentPage = page;
    },
  },
  mounted : function () {
    var url = "previsao";
    this.$http.get(url)
      .then(response => {
        this.concursos = response.data;
      });
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}


.resultado-loteria {
    padding:0;
    margin:5px 0 0;
    list-style:none;
}

.resultado-loteria li {
    margin:2px 5px;
    display:inline-block;
    background:#0369b9;
    padding:10px;
    border-radius:30px;
    font-family:"FuturaWeb", sans-serif;
    font-weight:bold;
    color:#fff;
    font-size:1.2rem;
}

</style>
