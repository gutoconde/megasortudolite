const RepositorioResultado = require('../model/RepositorioResultado');
const RepositorioDezena = require('../model/RepositorioDezena');
const RepositorioConcurso = require('../model/RepositorioConcurso');
const RepositorioSimulacao = require('../model/RepositorioSimulacao');
const RepositorioExecucao = require('../model/RepositorioExecucao');
const RepositorioPrevisao = require('../model/RepositorioPrevisao');

const ServicoSimulacao = require('../model/ServicoSimulacao');
const ServicoResultado = require('../model/ServicoResultado');
const ServicoCarga = require('../model/ServicoCarga');

const ServicoIntegracaoLoterias = require("../integracao/ServicoIntegracaoLoterias");

class ServiceFactory {

    static getRepositorioResultado(db) {
        return new RepositorioResultado(db);
    }

    static getRepositorioDezena(db) {
        return new RepositorioDezena(db);
    }

    static getRepositorioConcurso(db) {
        return new RepositorioConcurso(db);
    }

    static getRepositorioSimulacao(db) {
        return new RepositorioSimulacao(db);
    }

    static getRepositorioExecucao(db) {
        return new RepositorioExecucao(db);
    }

    static getRepositorioPrevisao(db) {
        return new RepositorioPrevisao(db);
    }

    static getServicoSimulacao(db) {
        return new ServicoSimulacao(
            this.getRepositorioDezena(db),
            this.getRepositorioSimulacao(db)
        );
    }

    static getServicoResultado(db) {
        return new ServicoResultado(
            this.getRepositorioResultado(db)
        );
    }

    static getServicoCarga(db) {
        return new ServicoCarga(
            this.getRepositorioResultado(db), this.getRepositorioExecucao(db),
            this.getRepositorioDezena(db), this.getRepositorioConcurso(db),
            this.getRepositorioPrevisao(db), 
            this.getServicoResultado(db));
    }

    static getServicoIntegracaoLoterias() {
        return ServicoIntegracaoLoterias;
    }
};

module.exports = ServiceFactory;

