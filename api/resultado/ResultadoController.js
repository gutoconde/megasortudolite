'use strict';

const ServiceFactory = require('../model/ServiceFactory');

module.exports.ultimoResultado = async(req, res) => {
	try {
        const ultimoResultado = await ServiceFactory.getServicoResultado(req.db).recuperarUltimoResultado();
		res.json(ultimoResultado);
		res.end();	
	} catch(err) {
		console.error(err.stack);
		var data = {
			'mensagem' : 'Erro ao consultar último resultado: ' + err.message,
			'error' : err.message
		}
		res.status(500).json(data);
	}
};

module.exports.resultadoConcurso = async(req, res) => {
	try {
		var concurso = req.params.concurso;
		const resultado = await ServiceFactory.getServicoResultado(req.db).retornarResultadoConcurso(concurso);
		res.json(resultado);
		res.end();	
	} catch(err) {
		console.error(err.stack);
		var data = {
			'mensagem' : 'Erro ao consultar resultado de concurso: ' + err.message ,
			'error' : err.message
		}
		res.status(500).json(data);
	}
};