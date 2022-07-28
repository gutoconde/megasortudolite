const sql = require('./sql/resultado');

class RepositorioResultado {

    constructor(db) {
        this.db = db;
    }

    deleteResultados() {
        const promise = new Promise((resolve, reject) => {
            this.db.run(sql.deleteResultados, (error) => {
                if(error) {
                    reject(error);
                } else {
                    resolve(true);
                }
            });
        });
        return promise;
    }

    insert(resultado) {
        var param = {
            '$numero': resultado.numero,
            '$data': resultado.data,
            '$dezena_1' : resultado.dezena1,
            '$dezena_2' : resultado.dezena2,
            '$dezena_3' : resultado.dezena3,
            '$dezena_4' : resultado.dezena4,
            '$dezena_5' : resultado.dezena5,
            '$dezena_6' : resultado.dezena6
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

    listarResultados() {
        const resultado = new Promise((resolve, reject) => {
            this.db.all(sql.selectResultados, (error, rows) => {
                if(error) {
                    reject(error);	
                } else {
                    resolve(rows);
                }
            });
        });
        return resultado;
    }

    retornaUltimoConcurso() {
        const concurso = new Promise((resolve, reject) => {
            this.db.get(sql.retornaUltimoConcurso, (error, result) => {
                if(error) {
                    reject(error);	
                } else {
                    resolve(result.ultimoConcurso);
                }
            });
        });
        return concurso;
    }

    recuperarUltimoResultado() {
        const resultado = new Promise((resolve, reject) => {
            this.db.get(sql.recuperarUltimoResultado, (error, result) => {
                if(error) {
                    reject(error);	
                } else {
                    resolve(result);
                }
            });
        });
        return resultado;
    }

    retornarResultadoConcurso(concurso) {
        var param = {
            '$concurso' : concurso,
        }
        const resultado = new Promise((resolve, reject) => {
            this.db.get(sql.retornarResultadoConcurso, param,  (error, result) => {
                if(error) {
                    reject(error);	
                } else {
                    resolve(result);
                }
            });
        });
        return resultado;
    }
};

module.exports = RepositorioResultado;