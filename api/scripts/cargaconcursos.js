'use strict';

const path = require('path');
require('dotenv').config();
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const config = require('./config');

const db = require('../integracao/Database');
const executorCarga = require('./ExecutorCarga');

const INICIADA = 1;
const FINALIZADA_COM_SUCESSO = 2;
const FINALIZADA_COM_ERRO = 3;

module.exports.execute = async() => {
    
    try {
        /** 
        console.log('Executando Download do arquivo de resultados...');
        var html = await executorCarga.recuperarPaginaResultados(config.appOptions.url); 
        console.log('Página de resultados recuperada com sucesso.');   
    

        console.log('Limpando tabela de resultados...');
        await executorCarga.limparResultados(db);
        console.log('Tabela de resultados limpa.');
    

        console.log('Executando carga dos resultados na base de dados...');  
        await executorCarga.carregarResultadoMegasena(html, db);
        console.log('Resultados carregados com sucesso.');
        */
        console.log('Executando carga dos resultados na base de dados...');  
        //await executorCarga.carregarTodosConcursos(db);
        console.log('Resultados carregados com sucesso.');

    } catch(error) {
        throw error;
    }

    var concursoInicial = 10;
    var concursoFinal = 2703;
    
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






