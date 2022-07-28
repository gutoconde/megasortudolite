'use strict';

const ServiceFactory = require('../model/ServiceFactory');

module.exports.dezenaInfo = async(req, res) => {
	try {
		var dezena = req.params.dezena;
		const dezenaInfo = await ServiceFactory.getRepositorioDezena(req.db).dezenaInfo(dezena);
		res.json(dezenaInfo);
		res.end();	
	} catch(err) {
		console.error(err.stack);
		var data = {
			'mensagem' : 'Erro ao consultar informações de dezena: ' + err.message,
			'error' : err.message
		}
		res.status(500).json(data);
	}
};

module.exports.dezenasMaisFrequentes = async(req, res) => {
	try {
		const dezenasMaisFrequente = await ServiceFactory.getRepositorioDezena(req.db).dezenasMaisFrequentes();
		res.json(dezenasMaisFrequente);
		res.end();	
	} catch(err) {
		console.error(err.stack);
		var data = {
			'mensagem' : 'Erro ao consultar informações de dezena: ' + err.message,
			'error' : err.message
		}
		res.status(500).json(data);
	}
};

module.exports.dezenasMenosFrequentes = async(req, res) => {
	try {
		const dezenasMenosFreq = await ServiceFactory.getRepositorioDezena(req.db).dezenasMenosFrequentes();
		res.json(dezenasMenosFreq);
		res.end();	
	} catch(err) {
		console.error(err.stack);
		var data = {
			'mensagem' : 'Erro ao consultar informações de dezena: ' + err.message,
			'error' : err.message
		}
		res.status(500).json(data);
	}
};