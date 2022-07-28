const sql = require('./sql/simulacao');

class RepositorioSimulacao {

    constructor(db) {
        this.db = db;
    }

    insert(simulacao) {
        var param = {
            '$concurso' : simulacao.numeroConcurso,
            '$numeroSimulacoes' : simulacao.numeroSimulacoes
        }
        const id = new Promise((resolve, reject) => {
            var stmt = this.db.prepare(sql.insert);
            stmt.run(param,
                function(error){
                    if(error) {
                        reject(error);	
                    } else {   
                        resolve(this.lastID);
                    }
                });	
        });
        return id;
    }

    delete(concurso) {
        var param = {'$concurso' : concurso};
        const count = new Promise((resolve, reject) => {
            this.db.run(sql.delete, param, function(error) {
                if(error) {
                    reject(error);
                } else {
                    resolve(this.changes);
                }
            });
        });
        return count;
    }

    insertDezenaSimulacao(dezenaSimulacao) {
        var param = {
            '$concurso' : dezenaSimulacao.concurso,
            '$valor' : dezenaSimulacao.valor,
            '$frequencia' : dezenaSimulacao.frequencia
        };
        const id = new Promise((resolve, reject) => {
            var stmt = this.db.prepare(sql.insertDezenaSimulacao);
            stmt.run(param,
                function(error){
                    if(error) {
                        reject(error);	
                    } else {
                        resolve(this.lastID);
                    }
                });	
        });
        return id;
    }


};

module.exports = RepositorioSimulacao;