const assert = require('assert');
const DoctorStrange = require('../../model/DoctorStrange');
const simulacao01 = require('../simulacoes/simulacao01');

describe('Testando geração de números aleatórios', () => {
    
    it('Geração de número aleatório dentro de uma faixa', function() {
        ds = new DoctorStrange();
        for(var i = 0; i < 1000000; i ++) {
            var numero = ds.getRandomNumber(100,1000);
            assert.equal(numero >= 100, true);
            assert.equal(numero <= 1000, true);
        }
    });

    it('Teste de criação de faixas', function() {
        var frequencias = require('../simulacoes/simulacao01');
        ds = new DoctorStrange();
        var resultado = ds.criarFaixas(frequencias);
        assert.equal(resultado.length, frequencias.length);
        var faixaInicio = 1;
        for(var i = 0; i < resultado.length; i++) {
            assert.equal(resultado[i].faixaInicio, faixaInicio);
            assert.equal(resultado[i].faixaFim, resultado[i].faixaInicio + frequencias[i].frequencia - 1);
            faixaInicio = resultado[i].faixaFim + 1;
        }
    });

    it('Teste de criação de faixas excluindo um numero', function() {
        var frequencias = require('../simulacoes/simulacao01');
        ds = new DoctorStrange();
        var excluir = [2];
        var resultado = ds.criarFaixas(frequencias, excluir);
        assert.equal(resultado.length, frequencias.length -1);
        assert.equal(resultado[0].faixaInicio, 1);
        assert.equal(resultado[0].faixaFim, 100);
        assert.equal(resultado[1].faixaInicio, 101);
        assert.equal(resultado[1].faixaFim, 300);
    });

    it('Simulação parcial - apenas uma coluna sorteada', function() {
        var frequencias = require('../simulacoes/simulacao01');
        ds = new DoctorStrange();
        for(var i = 0; i < 1000000; i++) {
            var dezenaSorteada = ds.simular(frequencias);
            var faixas = ds.criarFaixas(frequencias);
            var faixa = faixas.find(function(faixa) {return faixa.dezena === dezenaSorteada});
            assert.equal(faixa.dezena, dezenaSorteada);
        }
        
    });

    it('Simulação parcial - apenas uma coluna sorteada removendo uma dezena', function() {
        var frequencias = require('../simulacoes/simulacao01');
        ds = new DoctorStrange();
        var excluir = [1];
        for(var i = 0; i < 1000000; i++) {
            var dezenaSorteada = ds.simular(frequencias, excluir);
            assert.notEqual(dezenaSorteada, excluir[0])
            var faixas = ds.criarFaixas(frequencias, excluir);
            var faixa = faixas.find(function(faixa) {return faixa.dezena === dezenaSorteada});
            assert.equal(faixa.dezena, dezenaSorteada);
        }
        
    });

    it('Simulação completa 01 - frequencia por coluna', function() {
        var frequencias = require('../simulacoes/simulacaocompleta01');
        ds = new DoctorStrange();
        var resultado = ds.executarSimulacao(frequencias);
        assert.equal(resultado.length, 6);
    });

    it('Simulação completa 02 - frequencia por coluna', function() {
        this.timeout(10000);
        var frequencias = require('../simulacoes/simulacaocompleta02');
        ds = new DoctorStrange();
        ds.executar(frequencias, 100000);
        assert.equal(ds.resultadoFinal.size, 60);
        for(var i = 1; i<= 60; i++) {
            assert.equal(ds.resultadoFinal.get(i) !== null, true);
            assert.equal(ds.resultadoFinal.get(i) > 0, true);
        }
    });

    it('Simulação completa 01', function() {
        var frequencias = require('../simulacoes/simulacaocompleta01');
        ds = new DoctorStrange();
        var resultado = ds.executarSimulacao(frequencias);
        assert.equal(resultado.length, 6);
    });

    it('Simulação completa 02', function() {
        this.timeout(10000);
        var frequencias = require('../simulacoes/simulacaocompleta02');
        ds = new DoctorStrange();
        ds.executar(frequencias, 100000, true);
        assert.equal(ds.resultadoFinal.size, 60);
        for(var i = 1; i<= 60; i++) {
            assert.equal(ds.resultadoFinal.get(i) !== null, true);
            assert.equal(ds.resultadoFinal.get(i) > 0, true);
        }
    });
});