'use strict';

const path = require('path');
require('dotenv').config();
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const config = require('./config');
const ServiceFactory = require('../model/ServiceFactory');


const db = require('../integracao/Database');
const executorCarga = require('./ExecutorCarga');

const INICIADA = 1;
const FINALIZADA_COM_SUCESSO = 2;
const FINALIZADA_COM_ERRO = 3;

module.exports.execute = async() => {
    var ultimoResultadoCarregado = null;
    try {
        console.log('Limpando banco de dados...');
        await executorCarga.limparTudo(db);
        console.log('Banco de dados limpo.');

        console.log('Carregando resultados...');
        ultimoResultadoCarregado = await ServiceFactory.getServicoResultado(db).carregarTodosConcursos('megasena');
        console.log('Resultados carregados ate o concurso ' + ultimoResultadoCarregado);
    
    } catch(error) {
        throw error;
    }

    var concursoInicial = 2000;
    var concursoFinal = ultimoResultadoCarregado !== null ? ultimoResultadoCarregado : concursoInicial - 1;
    
    await executorCarga.carregarDezenas(db);
    for(var concurso = concursoInicial; concurso <= concursoFinal; concurso++ ) {  
        console.log('Processando previsao para o concurso ' + (concurso + 1) + '...');
        await executorCarga.calcularFrequencias(db, concurso);
        await executorCarga.atualizaPrevisao(db, concurso);
        await executorCarga.calcularIndices(db, concurso);
        await executorCarga.salvarPrevisao(db, concurso);
        console.log('Previsao para o concurso ' + (concurso + 1) + ' processada.');
    }

   return;
};

this.execute();






