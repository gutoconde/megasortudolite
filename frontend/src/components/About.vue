<template>
  <div>
    <h3>O que é o Mega-Sort&#x028A;do?</h3>
    <br>
    <div class="container">
		<blockquote>
			<p>
				A chance de se ganhar na <b>Mega-sena</b> com um jogo de seis dezenas é cerca de uma em 50 milhões. E não existe
				ferramenta ou técnica que permita prever com exatidão quais números serão sorteados. No entanto, podemos escolher as 
				dezenas de forma mais racional.
			</p>
			<p>
				O <b>Mega-sortudo</b> é um sistema que gera palpites para os concursos da <b>Mega-sena</b>. A cada concurso, são sugeridas
				8 dezenas para o concurso seguinte. Estas 8 dezenas são escolhidas a partir de um ranqueamento 
				baseado em informações estatísticas dos concursos anteriores.
			</p>
			<p>
				Com base na idéia de que as dezenas são igualmente prováveis, e que, após um grande número de concursos, a frequência de cada uma das dezenas tende a se igualar, o <b>Mega-sortudo</b> tenta detectar as dezenas que distoam do comportamento médio. Grande parte do trabalho do sistema é focado nas dezenas que são mais frequentes, ou menos frequentes, que a média.
			</p>
			<p>
				Como exemplo, uma dezena que foi sorteada em dez concursos a mais que a média das dezenas terá um ranqueamento 
				maior do que as dezenas que têm um comportamento próximo da média.
			</p>
			<p>
				De outra forma, entre dois números que foram sorteados com a mesma frequência, terá um ranqueamento melhor aquele
				que não é sorteado há mais tempo.  
			</p>
			<p>
				Enfim, o sistema de palpites do <b>Mega-sortudo</b> não tenta prever as dezenas que serão sorteadas, mas
				sim, dá boas sugestões com base nos concursos passados. 
			</p>
			<footer class="blockquote-footer">Equipe técnia do <b>megasortudo.com</b></footer>
			<p>&#9752;</p>
		</blockquote>
	</div>
  </div>
 
</template>

<script>

export default {
	name: 'AboutPage',
	data: function () {
		return {
			msg: 'Test',
		}
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

a {
  color: #42b983;
}

</style>
