const sql = require('./sql/concurso');

class RepositorioConcurso {

    constructor(db) {
        this.db = db;
    }

    insert(numeroConcurso) {
        var param = {
            '$numeroConcurso': numeroConcurso
        };
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

    delete(numeroConcurso) {
        var param = {
            '$numeroConcurso': numeroConcurso
        };
        const changes = new Promise((resolve, reject) => {
            var stmt = this.db.prepare(sql.delete);
            stmt.run(param,
                function(error){
                    if(error) {
                        reject(error);	
                    } else {   
                        resolve(this.changes);
                    }
                });	
        });
        return changes;
    }

    deleteAll(numeroConcurso) {
        var param = {
            '$numeroConcurso': numeroConcurso
        };
        const changes = new Promise((resolve, reject) => {
            var stmt = this.db.prepare(sql.deleteAll);
            stmt.run(param,
                function(error){
                    if(error) {
                        reject(error);	
                    } else {   
                        resolve(this.changes);
                    }
                });	
        });
        return changes;
    }

    retornaConcursos(dezena, concursoAtual) {
        const param = {
            '$dezena': dezena,
            '$concurso': concursoAtual
        };
        const resultado = new Promise((resolve, reject) => {
            this.db.all(sql.retornaConcursos, param, (error, rows) => {
                if(error) {
                    reject(error);	
                } else {
                    resolve(rows.map(c => c.concurso));
                }
            });
        });
        return resultado;
    }
};

module.exports = RepositorioConcurso;