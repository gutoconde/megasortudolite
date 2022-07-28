'use strict';

const DoctorStrange = require("./DoctorStrange");

class ServicoSimulacao {

    constructor(repositorioDezena_, repositorioSimulacao_) {
        this.repositorioDezena = repositorioDezena_;
        this.repositorioSimulacao = repositorioSimulacao_;
    }

    async executarSimulacaoComIndices(concurso, numeroSimulacoes) {
        var indices = await this.listarIndices(concurso-1);
        var ds = new DoctorStrange();
        await ds.executar(indices, numeroSimulacoes);
        await this.salvarResultadoSimulacao(concurso + 1, numeroSimulacoes, ds.resultado);
    }

    async executarSimulacaoComFrequencias(concurso, numeroSimulacoes, frequenciasPorColuna = false) {
        var frequencias = [];
        if(frequenciasPorColuna) {
            frequencias = await this.listarFrequenciasPorColuna(concurso);
        } else {
            frequencias = await this.listarFrequencias(concurso);
        }
        var ds = new DoctorStrange();
        ds.executar(frequencias, numeroSimulacoes, frequenciasPorColuna);
        await this.salvarResultadoSimulacao(concurso + 1, numeroSimulacoes, ds.resultado);
    }

    async salvarResultadoSimulacao(concursoSimulado, numeroSimulacoes, resultado) {
        var simulacao = {
            numeroConcurso : concursoSimulado,
            numeroSimulacoes: numeroSimulacoes
        }
        await this.repositorioSimulacao.delete(concursoSimulado);
        await this.repositorioSimulacao.insert(simulacao);
        
        await resultado.forEach(async(frequencia, dezena) => {
            var dezenaSimulacao = {
                concurso: concursoSimulado,
                valor : dezena,
                frequencia: frequencia
            };
            await this.repositorioSimulacao.insertDezenaSimulacao(dezenaSimulacao);
        });
    }

    async listarFrequenciasPorColuna(concurso) {
        var resultado = await this.repositorioDezena.listarFrequenciasPorColuna(concurso);
        return resultado.map(item => {
            return {
                dezena: item.dezena, 
                frequencias : [
                    item.coluna1, item.coluna2, item.coluna3, 
                    item.coluna4, item.coluna5, item.coluna6
                ]
            };
        })
    }

    async listarFrequencias(concurso) {
        var resultado = await this.repositorioDezena.listarFrequencias(concurso);
        return resultado.map(item => {
            return {
                dezena: item.dezena, 
                frequencias : [item.frequencia]
            };
        })
    }

    async listarIndices(concurso) {
        var resultado = await this.repositorioDezena.listarIndices(concurso);
        return resultado.map(item => {
            return {
                dezena: item.dezena, 
                frequencias : [parseInt(item.indice * 1000 + 10000)]
            };
        })
    }
};

module.exports = ServicoSimulacao;