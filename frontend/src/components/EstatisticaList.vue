<template>
	<div>
		<h3>Estatísticas do Mega-Sort&#x028A;do</h3>
    
    <b-alert :show="errors.length" variant="danger">
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </b-alert>
    
    <b-alert :show="messages.length" variant="dark">
      <ul>
        <li v-for="message in messages" :key="message">{{ message }}</li>
      </ul>
    </b-alert>

    <br/>
    
    <div v-if="estatisticas.length > 0">
      <b-table 
            small striped bordered hover
            class="table-condensed" 
            responsive="sm" foot-clone
            head-variant="dark"
            :items="estatisticas" :fields="fields">
        
        <template #cell(dezena)="data">
          {{data.item.dezena}}
        </template>

        <template #cell(frequencia)="data">
          {{data.item.frequencia}}
        </template>

        <template #cell(concursos_atras)="data">
          {{data.item.concursos_atras}}
        </template>

        <template #cell(proximo_concurso)="data">
          {{data.item.proximo_concurso}}
        </template>

        <template #cell(indice)="data">
          {{data.item.indice}}
        </template>
      </b-table>
    </div>
    <div v-else>
        Nenhuma estatística disponível
    </div>

	</div>
</template>

<script>

export default {
  data: function() {
    return {
      fields: [
        {
          key: 'dezena',
          label: 'DEZENA',
          sortable: true,
        },
        {
          key: 'frequencia',
          label: 'FREQUÊNCIA',
          sortable: true
        },
        {
          key: 'concursos_atras',
          label: 'Sorteado há x concursos',
          sortable: true
        },
        {
          key: 'proximo_concurso',
          label: 'Previsão mais próxima',
          sortable: true
        },
        {
          key: 'indice',
          label: 'ÍNDICE',
          sortable: true
        },
      ],
        errors: [],
        messages: [],
        estatisticas : []
    }
  },

  methods: {
    strConcursos: function(bolaoAtual) {
      let strConcursos = bolaoAtual.concurso_inicial;
      if(bolaoAtual.concurso_final) {
        if(bolaoAtual.concurso_inicial !== bolaoAtual.concurso_final) {
          strConcursos = 'Concursos ' + strConcursos + ' à ' + bolaoAtual.concurso_final;
        } else {
          strConcursos = 'Concurso ' + strConcursos;
        }
      } else {
        strConcursos = 'Concurso ' + strConcursos;
      } 
      return strConcursos;
    },
  },
  
  mounted : function () {

    if(this.$route.params.mensagem) {
      this.messages.push(this.$route.params.mensagem);
    }

    var url = "previsao/estatisticas";
    this.$http.get(url)
      .then(response => {
        this.estatisticas = response.data;
      });
  },


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2, h5, h6 {
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

.table-condensed {
  font-size: 12px;
}

a.disabled {
  pointer-events: none;
}

</style>
