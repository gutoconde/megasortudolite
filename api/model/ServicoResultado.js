'use strict';

const ServicoIntegracaoLoterias = require("../integracao/ServicoIntegracaoLoterias");

class ServicoResultado {

    constructor(repositorioResultado_) {
        this.repositorioResultado = repositorioResultado_;
    }

    async carregarTodosConcursos(loteria) {
        var ultimoResultado = await ServicoIntegracaoLoterias.recuperaUltimoResultado(loteria);
        for(var concurso = 1; concurso <= ultimoResultado.numero; concurso++) {
            await this.carregarResultadoConcurso(loteria, concurso);
        }
        return ultimoResultado.numero;
    }

    async recuperarUltimoResultado() {
        return await this.repositorioResultado.recuperarUltimoResultado(); 
    }

    async retornarResultadoConcurso(concurso) {
        return await this.repositorioResultado.retornarResultadoConcurso(concurso); 
    }

    async carregarConcursosFaltantes(loteria) {
        var ultimoResultado = await ServicoIntegracaoLoterias.recuperaUltimoResultado(loteria);
        var ultimoConcursoNaBase = await this.repositorioResultado.retornaUltimoConcurso();
        var concurso = ultimoConcursoNaBase + 1;
        for(concurso; concurso <= ultimoResultado.numero; concurso++) {
            await this.carregarResultadoConcurso(loteria, concurso);
        }
    }
    
    async carregarResultadoConcurso(loteria, concurso) {
        var res = await ServicoIntegracaoLoterias.recuperaResultado(loteria, concurso);
        var dateParts = res.dataApuracao.split('/');
        var resultado = {
            numero : res.numero,
            data : dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0],
            dezena1 : res.dezenasSorteadasOrdemSorteio[0],
            dezena2 : res.dezenasSorteadasOrdemSorteio[1],
            dezena3 : res.dezenasSorteadasOrdemSorteio[2],
            dezena4 : res.dezenasSorteadasOrdemSorteio[3],
            dezena5 : res.dezenasSorteadasOrdemSorteio[4],
            dezena6 : res.dezenasSorteadasOrdemSorteio[5]
        };
        await this.repositorioResultado.insert(resultado);
    }
};

module.exports = ServicoResultado;