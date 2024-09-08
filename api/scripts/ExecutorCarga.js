'use strict';

const axios = require('axios');
const fs = require('fs');
const unzip = require('unzipper');
const path = require('path');
const megasenaParser = require('./MegasenaParser');
const serviceFactory = require('../model/ServiceFactory');
const predictor = require('./MegaPredictor');

module.exports.carregarConcursosFaltantes = async (db) => {
    await serviceFactory.getServicoResultado(db).carregarConcursosFaltantes('megasena');
};

module.exports.carregarTodosConcursos = async (db) => {
    await serviceFactory.getServicoResultado(db).carregarTodosConcursos('megasena');
};

module.exports.recuperarPaginaResultados = async (url) => {
    var html = null;
    const options = {
        method: 'GET',
        url: url
    };
    try {
        const response = await axios(options);
        html = response.data.html;
    } catch(error) {
        console.error(error);
    }
    return html;
};

module.exports.limparTudo = async(db) => {
    await serviceFactory.getRepositorioPrevisao(db).deletePrevisoes();
    await serviceFactory.getRepositorioConcurso(db).deleteAll();
    await serviceFactory.getRepositorioResultado(db).deleteResultados();
    await serviceFactory.getRepositorioDezena(db).deleteDezenaFrequencia();
    await serviceFactory.getRepositorioDezena(db).deleteDezenaIndice();
    await serviceFactory.getRepositorioDezena(db).deleteDezenas();
    return ;
};

module.exports.limparResultados = async(db) => {
    return await serviceFactory.getRepositorioResultado(db).deleteResultados();
};

module.exports.carregarResultadoMegasena = async (html, db) => {
    var resultados = await megasenaParser.parse(html);
    for(var i = 0; i< resultados.length; i++) {
        await serviceFactory.getRepositorioResultado(db).insert(resultados[i]);
    }
};

module.exports.retornaUltimoConcursoProcessado = async (db) => {
    return await serviceFactory.getRepositorioExecucao(db).retornaUltimoConcursoProcessado();
};

module.exports.retornaUltimoConcurso = async (db) => {
    return await serviceFactory.getRepositorioResultado(db).retornaUltimoConcurso();
};

module.exports.verificaConcursoProcessado = async(numeroConcuso, db) => {
    return await serviceFactory.getRepositorioExecucao(db).isConcursoProcessado(numeroConcuso);
};

module.exports.recuperarResultadoUltimoConcurso = () => {
    const promise = new Promise((resolve, reject) => {
        var url = 'http://www.loterias.caixa.gov.br/wps/portal/loterias/landing/megasena/!ut/p/a1/04_Sj9CPykssy0xPLMnMz0vMAfGjzOLNDH0MPAzcDbwMPI0sDBxNXAOMwrzCjA0sjIEKIoEKnN0dPUzMfQwMDEwsjAw8XZw8XMwtfQ0MPM2I02-AAzgaENIfrh-FqsQ9wNnUwNHfxcnSwBgIDUyhCvA5EawAjxsKckMjDDI9FQE-F4ca/dl5/d5/L2dBISEvZ0FBIS9nQSEh/pw/Z7_HGK818G0KO6H80AU71KG7J0072/res/id=buscaResultado/c=cacheLevelPage/=/';        
        const options = {
            method: 'GET',
            headers: {
                Cookie: 'security=true; path=/'
            }
        };
        const request = http.get(url, options, (res) => {
            var body = '';
            res.setEncoding('utf8');
            res.on('data', (data) => {
                body += data;
            }); 
            res.on('end', () => {
                try {
                    var dados = JSON.parse(body);
                    var dezenas = dados.resultado.split('-');
                    var dadosConcurso = {
                        numero: parseInt(dados.concurso),
                        data: new Date(dados.data),
                        dezena1: parseInt(dezenas[0]),
                        dezena2: parseInt(dezenas[1]),
                        dezena3: parseInt(dezenas[2]),
                        dezena4: parseInt(dezenas[3]),
                        dezena5: parseInt(dezenas[4]),
                        dezena6: parseInt(dezenas[5])
                    }
                    resolve(dadosConcurso);
                } catch(error) {
                    reject(error);
                }
            });
        }).on('error', (err) => {
            console.log(err.message);
            reject(err);
        })
    });
    return promise;
};
module.exports.executaPrevisao = async (concurso, db) => {
    await this.calcularFrequencias(db, concurso);
    await this.atualizaPrevisao(db, concurso);
    await this.calcularIndices(db, concurso);
    return await this.salvarPrevisao(db, concurso);
}

module.exports.executaPrevisao_ = async (conn) => {
    const promise = new Promise((resolve, reject) => {
        conn.beginTransaction( err => {
            if(err){
                reject(err);
            }
            try {
                this.calcularFrequencias(conn);
                this.atualizaPrevisao(conn);
                this.calcularIndices(conn);
                this.salvarPrevisao(conn);
                conn.commit(err => {
                    if(err) {
                        reject(err);
                    }
                    resolve(true);
                });
                
            }catch(err) {
                conn.rollback( err => {
                    if(err) {
                        reject(err);        
                    }
                });
                reject(err);
            }
        })
    });
    return promise;
};

module.exports.executaPrevisaoConcurso = async (conn, concurso) => {
        conn.beginTransaction( err => {
            if(err){
                throw err;
            }
            try {
                this.calcularFrequencias(conn, concurso);
                this.atualizaPrevisao(conn, concurso);
                this.calcularIndices(conn, concurso);
                this.salvarPrevisao(conn, concurso);
                conn.commit(err => {
                    if(err) {
                        throw err;
                    }
                });
                
            }catch(err) {
                conn.rollback( err => {
                    if(err) {
                        throw err;        
                    }
                });
                throw err;
            }
        })
};

module.exports.carregarDezenas = async(db) => {
    await serviceFactory.getRepositorioDezena(db).deleteDezenas();
    for(var indice = 1; indice <= 6; indice++) {
        await serviceFactory.getRepositorioDezena(db).carregarDezena(indice);
    }
}

module.exports.calcularFrequencias = async(db, concurso) => {
    await serviceFactory.getRepositorioDezena(db).deleteDezenaFrequencia(concurso);
    await serviceFactory.getRepositorioDezena(db).calculaFrequencias(concurso);
};

module.exports.calcularIndices = async(db, concurso) => {
    await serviceFactory.getRepositorioDezena(db).deleteDezenaIndice(concurso);
    await serviceFactory.getRepositorioDezena(db).calcularIndices(concurso);
}

module.exports.atualizaPrevisao = async (db, concurso) => {
    for(var dezena = 1; dezena <= 60; dezena++) {
        var concursos = await serviceFactory.getRepositorioConcurso(db).retornaConcursos(dezena, concurso);
        var proximoConcurso = predictor.linearReg(concursos);
        var result = await serviceFactory.getRepositorioDezena(db).atualizaProximoConcurso(concurso, proximoConcurso, dezena)
    }
}

module.exports.salvarPrevisao = async(db, concurso) => {
    //Cria o concurso que estah sendo feita a previsao
    await serviceFactory.getRepositorioConcurso(db).delete(concurso + 1);//DELETA SE HOUVER DO MESMO NUMERO
    await serviceFactory.getRepositorioConcurso(db).insert(concurso + 1);
    //Atualiza quais dezenas foram sorteadas na previsao anterior
    await serviceFactory.getRepositorioDezena(db).atualizaDezenasSorteadas(concurso);
    //Salva a previsao para o proximo concurso
    await serviceFactory.getRepositorioDezena(db).salvarPrevisoes(concurso+1);
}

module.exports.inicializaExecucao = async(numeroConcurso, db) => {
    return await serviceFactory.getRepositorioExecucao(db).insert(numeroConcurso);
};

module.exports.finalizaExecucao = async(idExecucao, status, db) => {
    return await serviceFactory.getRepositorioExecucao(db).update(idExecucao, status);
};