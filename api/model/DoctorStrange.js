'use strict';

class DoctorStrange {
    
    constructor() {
        this.resultado = new Map();
    }

    get resultadoFinal() {
        return this.resultado;
    }

    executar(frequencias, numeroSimulacoes, frequenciasPorColuna = false) {
        this.resultado = new Map();
        for(var i = 0; i< numeroSimulacoes; i++) {
            var sorteadas = this.executarSimulacao(frequencias, frequenciasPorColuna = false);
            sorteadas.forEach((dezena) => {this.resultado.set(dezena, this.resultado.get(dezena) + 1 || 1)});
        }
    }

    executarSimulacao(frequencias, frequenciasPorColuna = false) {
        var resultado = [];
        for(var i = 0; i < 6 ; i++ ) {
            //Se frequenciasPorColuna = true trata a frequencia por coluna
            //Se frequenciasPorColuna = false soma todas as frequencias do array
            var freq = frequencias.map(fc => {return {dezena: fc.dezena, frequencia: frequenciasPorColuna ? fc.frequencias[i] : fc.frequencias.reduce((pv, cv) => pv + cv, 0)};});
            var dezenaSorteada = this.simular(freq, resultado);
            resultado.push(dezenaSorteada);
        }
        return resultado;
    }
    /**
     * Simula o sorteio de uma dezena.
     * @param {*} frequencias 
     * @param {*} excluir 
     * @returns 
     */
    simular(frequencias, excluir=[]) {
        var faixas = this.criarFaixas(frequencias, excluir);
        var numero = this.getRandomNumber(1, faixas[faixas.length - 1].faixaFim);
        return this.recuperarFaixaDoNumero(numero, faixas);
    }

    recuperarFaixaDoNumero(numero, faixas) {
        var resultado = faixas.find(function(faixa) {return numero>= faixa.faixaInicio && numero <= faixa.faixaFim})
        return resultado ? resultado.dezena : null;
    }

    criarFaixas(frequencias, excluir=[]) {
        var faixas = []
        var faixaInicio = 1;
        for(var i = 0; i < frequencias.length; i++) {
            if(!excluir.includes(frequencias[i].dezena)) {
                var faixa = {
                    dezena : frequencias[i].dezena,
                    faixaInicio: faixaInicio,
                    faixaFim: faixaInicio + frequencias[i].frequencia -1
                };
                faixaInicio = faixa.faixaFim + 1; 
                faixas.push(faixa);
            }
        }
        return faixas
    }

    getRandomNumber(minimo, maximo) {
        return Math.floor(Math.random() * (maximo - minimo + 1) ) + minimo;
    }
};

module.exports = DoctorStrange;
