'use strict';

const ServiceFactory = require('../model/ServiceFactory');

module.exports.previsoes = async(req, res) => {
	try {
		const previsaoList = await ServiceFactory.getRepositorioPrevisao(req.db).listarPrevisoes();
		res.json(previsaoList);
		res.end();	
	} catch(err) {
		console.error(err.stack);
		var data = {
			'mensagem' : 'Erro ao consultar previsões',
			'error' : err
		}
		res.status(500).json(data);
	}
};

module.exports.estatisticas = async(req, res) => {
	try {
		const estatisticaList = await ServiceFactory.getRepositorioPrevisao(req.db).listarEstatisticas();
		res.json(estatisticaList);
		res.end();	
	} catch(err) {
		console.error(err.stack);
		var data = {
			'mensagem' : 'Erro ao consultar estatísticas',
			'error' : err
		}
		res.status(500).json(data);
	}
};

module.exports.ultimaPrevisao = async(req, res) => {
	try {
		const ultimaPrevisao = await ServiceFactory.getRepositorioPrevisao(req.db).loadUltimaPrevisao();
		res.json(ultimaPrevisao);
		res.end();	
	} catch(err) {
		console.error(err.stack);
		var data = {
			'mensagem' : 'Erro ao consultar última previsão',
			'error' : err
		}
		res.status(500).json(data);
	}
};