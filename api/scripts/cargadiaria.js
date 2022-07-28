'use strict';

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
        console.log('Executando carga dos resultados faltantes na base de dados...');  
        await executorCarga.carregarConcursosFaltantes(db);
        console.log('Resultados faltantes carregados com sucesso.');

    } catch(error) {
        throw error;
    }

    var ultimoConcurso = await executorCarga.retornaUltimoConcurso(db);
    var ultimoConcursoProcessado = await executorCarga.retornaUltimoConcursoProcessado(db);
    
    var concurso = ultimoConcursoProcessado + 1;
    
    for(concurso; concurso <= ultimoConcurso; concurso++) {
        console.log('Executando o processamento do concurso ' + concurso );
        var concursoDoArquivoJaProcessado = await executorCarga.verificaConcursoProcessado(concurso, db);

        if(concursoDoArquivoJaProcessado) {
            console.log('Concurso ' + concurso + ' do arquivo ja processado anteriormente.');
            process.exitCode = 0;
            return;
        }
        var statusExecucao = 1;
        var idExecucao = await executorCarga.inicializaExecucao(concurso, db);
        await executorCarga.carregarDezenas(db);
        try {
            await executorCarga.executaPrevisao(concurso, db);
            console.log('Concurso ' + concurso + ' processado com sucesso.');
            statusExecucao = 2;
            process.exitCode = 0;
        } catch(err) {
            console.log('Erro ao processar concurso  ' + concurso + '.');
            console.log(err.stack);
            statusExecucao = 3;
            process.exitCode = 1;
        }
        await executorCarga.finalizaExecucao(idExecucao, statusExecucao, db);
    }
    return;  
};

this.execute();






