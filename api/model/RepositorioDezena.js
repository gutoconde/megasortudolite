const sql = require('./sql/dezena');

class RepositorioDezena {

    constructor(db) {
        this.db = db;
    }

    carregarDezena(indice) {
        const id = new Promise((resolve, reject) => {
            var query =  
                'INSERT INTO DEZENA(CONCURSO, VALOR, DEZENA) ' +
                'SELECT NUMERO AS CONCURSO, DEZENA_' + indice + ' AS VALOR, ' + indice + ' AS DEZENA FROM RESULTADO';
            var stmt = this.db.prepare(query);
            stmt.run(
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

    deleteDezenas() {
        const promise = new Promise((resolve, reject) => {
            this.db.run(sql.deleteDezenas, (error) => {
                if(error) {
                    reject(error);
                } else {
                    resolve(true);
                }
            });
        });
        return promise;
    }

    deleteDezenaFrequencia(concurso = null) {
        var param = {
            '$concurso': concurso
        }
        const promise = new Promise((resolve, reject) => {
            this.db.run(sql.deleteDezenaFrequencia, param, function(error) {
                if(error) {
                    reject(error);
                } else {
                    resolve(this.changes);
                }
            });
        });
        return promise;
    }

    deleteDezenaIndice(concurso = null) {
        var param = {
            '$concurso': concurso
        }
        const promise = new Promise((resolve, reject) => {
            this.db.run(sql.deleteDezenaIndice, param, function(error) {
                if(error) {
                    reject(error);
                } else {
                    resolve(this.changes);
                }
            });
        });
        return promise;
    }

    calculaFrequencias(concurso=null) {
        var param = {
            '$concurso': concurso 
        };
        const result = new Promise((resolve, reject) => {
            var stmt = this.db.prepare(sql.calculaFrequencias);
            stmt.run(param,
                function(error){
                    if(error) {
                        reject(error);	
                    } else {   
                        resolve(true);
                    }
                });	
        });
        return result;
    }

    calcularIndices(concurso=null) {
        var param = {
            '$concurso' : concurso,
        };
        const result = new Promise((resolve, reject) => {
            var stmt = this.db.prepare(sql.calcularIndices);
            stmt.run(param,
                function(error){
                    if(error) {
                        reject(error);	
                    } else {   
                        resolve(true);
                    }
                });	
        });
        return result;
    }

    atualizaProximoConcurso(concurso, proximoConcurso, dezena) {
        var param = {
            '$concurso': concurso,
            '$proximoConcurso' : proximoConcurso,
            '$dezena' : dezena
        }
        const resultado = new Promise((resolve, reject) => {
            var stmt = this.db.prepare(sql.atualizaProximoConcurso);
            stmt.run(param,
                function(error){
                    if(error) {
                        reject(error);	
                    } else {   
                        resolve(this.changes);
                    }
                });	
        });
        return resultado;
    }

    atualizaDezenasSorteadas(concurso) {
        var param = {
            '$concurso' : concurso,
        };
        const result = new Promise((resolve, reject) => {
            var stmt = this.db.prepare(sql.atualizaDezenasSorteadas);
            stmt.run(param,
                function(error){
                    if(error) {
                        reject(error);	
                    } else {   
                        resolve(true);
                    }
                });	
        });
        return result;
    }

    salvarPrevisoes(concurso, numeroDezenas = 8) {
        var param = {
            '$concurso' : concurso,
            '$numeroDezenas' : numeroDezenas
        };
        const result = new Promise((resolve, reject) => {
            var stmt = this.db.prepare(sql.salvarPrevisoes);
            stmt.run(param,
                function(error){
                    if(error) {
                        reject(error);	
                    } else {   
                        resolve(true);
                    }
                });	
        });
        return result;
    }

    listarFrequencias(concurso) {
        var param = {'$concurso': concurso};
        const frequencias = new Promise((resolve, reject) => {
            this.db.all(sql.selectFrequencias, param, (error, rows) => {
                if(error) {
                    reject(error);	
                } else {
                    resolve(rows);
                }
            });
        });
        return frequencias;
    }

    listarIndices(concurso) {
        var param = {
            '$concurso': concurso
        }
        const indices = new Promise((resolve, reject) => {
            this.db.all(sql.selectIndices, param, (error, rows) => {
                if(error) {
                    reject(error);	
                } else {
                    resolve(rows);
                }
            });
        });
        return indices;
    }

    listarFrequenciasPorColuna(concurso) {
        var param = {'$concurso': concurso};
        const frequencias = new Promise((resolve, reject) => {
            this.db.all(sql.selectFrequenciasPorColuna, param, (error, rows) => {
                if(error) {
                    reject(error);	
                } else {
                    resolve(rows);
                }
            });
        });
        return frequencias;
    }

    dezenaInfo(dezena) {
        var param = {
            '$dezena': dezena
        }
		const dezenaInfo = new Promise((resolve, reject) => {
			this.db.get(sql.dezenaInfo, param , (error, result) => {
				if(error) {
					reject(error);	
				} else {
					resolve(result);
				}
			});	
		});
		return dezenaInfo;
	};

    dezenasMaisFrequentes() {
		const dezenasMaisFreq = new Promise((resolve, reject) => {
			this.db.all(sql.dezenasMaisFrequentes, (error, result) => {
				if(error) {
					reject(error);	
				} else {
					resolve(result);
				}
			});	
		});
		return dezenasMaisFreq;
	};
	
	dezenasMenosFrequentes() {
		const dezenasMenosFreq = new Promise((resolve, reject) => {
			this.db.all(sql.dezenasMenosFrequentes, (error, result) => {
				if(error) {
					reject(error);	
				} else {
					resolve(result);
				}
			});	
		});
		return dezenasMenosFreq;
	};
};

module.exports = RepositorioDezena;