'use strict';
const sql = require('./sql/previsao')

class RepositorioPrevisao {
	
	constructor(db) {
		this.db = db;
	}

	listarPrevisoes() {
		const previsoes = new Promise((resolve, reject) => {
			this.db.all(sql.previsoes, (error, result) => {
				if(error) {
					reject(error);	
				} else {
					var concurso_anterior = null;
					var previsoes = [];
					var dezenas = [];
					var dezenas_sorteadas = [];
					
					for(var i = 0; i < result.length; i++) {
						if(concurso_anterior != null) {
							if(result[i].NUMERO != concurso_anterior) {
								var previsao = {
									'concurso' : concurso_anterior,
									'dezenas' : dezenas,
									'dezenas_sorteadas' : dezenas_sorteadas 
								};
								previsoes.push(previsao);
								previsao = [];
								dezenas = [];
							}
						}
						
						var dezena = {
							'dezena': result[i].DEZENA, 
							'sorteada' : result[i].SORTEADA,
						}
	
						dezenas.push(dezena);
						
						concurso_anterior = result[i].NUMERO;
						
						if(result[i].DEZENA_1 != null) {
							dezenas_sorteadas = {
								'DEZENA_1': result[i].DEZENA_1,
								'DEZENA_2': result[i].DEZENA_2,
								'DEZENA_3': result[i].DEZENA_3,
								'DEZENA_4': result[i].DEZENA_4,
								'DEZENA_5': result[i].DEZENA_5,
								'DEZENA_6': result[i].DEZENA_6
							}
						}
					}
					var previsao = {
							'concurso': concurso_anterior,
							'dezenas': dezenas,
							'dezenas_sorteadas': dezenas_sorteadas
					};
					previsoes.push(previsao);	
					resolve(previsoes);	
				}
			});	
		});
		return previsoes;
	};
	
	listarEstatisticas() {
		const estatisticas = new Promise((resolve, reject) => {
			this.db.all(sql.estatisticas, (error, result) => {
				if(error) {
					reject(error);	
				} else {
					resolve(result);	
				}
			});	
		});
		return estatisticas;
	}
	
	loadUltimaPrevisao() {
		const ultimaPrevisao = new Promise((resolve, reject) => {
			this.db.all(sql.ultimaPrevisao, (error, result) => {
				if(error) {
					reject(error);	
				} else {
					var dezenas = [];
					for(var i = 0; i < result.length; i++) {
						dezenas.push(result[i].DEZENA);
					}
					
					var previsao = {
						'numero_concurso' : result[0].NUMERO,
						'dezenas' : dezenas
					};
					resolve(previsao);	
				}
			});	
		});
		return ultimaPrevisao;
	}
}

module.exports = RepositorioPrevisao;
