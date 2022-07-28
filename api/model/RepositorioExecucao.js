const sql = require('./sql/execucao');

class RepositorioExecucao {

    constructor(db) {
        this.db = db;
    }

    insert(numeroConcurso) {
        var param = {
            '$concurso' : numeroConcurso
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

    update(id, status) {
        var param = {
            '$idExecucao' : id,
            '$status': status
        };
        const count = new Promise((resolve, reject) => {
            this.db.run(sql.update, param, function(error) {
                if(error) {
                    reject(error);
                } else {
                    resolve(this.changes);
                }
            });
        });
        return count;
    }

    isConcursoProcessado(numeroConcurso) {
        var param = {
            '$concurso' : numeroConcurso
        };
        const resultado = new Promise((resolve, reject) => {
            this.db.get(sql.isConcursoProcessado, param, (error, result) => {
                if(error) {
                    reject(error);	
                } else {
                    resolve(result.count > 0 ? true : false);
                }
            });
        });
        return resultado;
    }

    retornaUltimoConcursoProcessado() {
        const resultado = new Promise((resolve, reject) => {
            this.db.get(sql.retornaUltimoConcursoProcessado, (error, result) => {
                if(error) {
                    reject(error);	
                } else {
                    resolve(result.ultimoConcursoProcessado ? result.ultimoConcursoProcessado : 1999);
                }
            });
        });
        return resultado;
    }
};

module.exports = RepositorioExecucao;