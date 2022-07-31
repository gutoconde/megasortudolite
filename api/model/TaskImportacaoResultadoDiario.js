'use strict'

const Task = require('../model/Task');
const ServiceFactory = require('../model/ServiceFactory');

class TaskImportacaoResultadoDiario extends Task {

    constructor(db) {
        super(db);
    }
    
    async execute() {
        await ServiceFactory.getServicoCarga(this.db).carregarResultadoDiario();
    }

    get descricao() {
        return "Tarefa de importação de resultado diário";
    }
};

module.exports = TaskImportacaoResultadoDiario;