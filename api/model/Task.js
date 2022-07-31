'use strict'

class Task {

    constructor(db) {
        this.db = db;
    }

    async run() {
            
            try {
                console.log((new Date()).toISOString() + " - Tarefa " + this.descricao + " iniciada.");
                await this.execute();
                console.log((new Date()).toISOString() + " - Tarefa " + this.descricao + " finalizada sem erros.");
            } catch(error) {
                console.log((new Date()).toISOString() + " - Tarefa " + this.descricao + " finalizada com erros.");
                console.error(error);
            }
    }

    async execute() {
        throw 'O metodo execute() deve ser implementado';
    }

    get nome() {
        return this.constructor.name;
    }

    get descricao() {
        return "Tarefa base";
    }
};

module.exports = Task;