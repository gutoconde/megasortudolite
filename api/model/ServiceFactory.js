const RepositorioResultado = require('../model/RepositorioResultado');
const RepositorioDezena = require('../model/RepositorioDezena');
const RepositorioConcurso = require('../model/RepositorioConcurso');
const RepositorioSimulacao = require('../model/RepositorioSimulacao');
const RepositorioExecucao = require('../model/RepositorioExecucao');
const RepositorioPrevisao = require('../model/RepositorioPrevisao');

const ServicoSimulacao = require('../model/ServicoSimulacao');
const ServicoResultado = require('../model/ServicoResultado');

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

};

module.exports = ServiceFactory;

