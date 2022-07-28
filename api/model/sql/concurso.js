module.exports.retornaConcursos =
    ' SELECT CONC.CONCURSO as concurso FROM ( ' +
    '   SELECT CONCURSO FROM DEZENA  ' +
    '   WHERE ' + 
    '       VALOR = $dezena ' + 
    '       AND CONCURSO < $concurso ' +
    '   ORDER BY CONCURSO DESC) CONC ' +
    ' ORDER BY CONCURSO ASC ';

module.exports.insert =
    'INSERT INTO CONCURSO(NUMERO) VALUES($numeroConcurso)';

module.exports.delete =
    'DELETE FROM CONCURSO WHERE NUMERO = $numeroConcurso';

module.exports.deleteAll=
    'DELETE FROM CONCURSO';