module.exports.insert =
    'INSERT INTO SIMULACAO(NUMERO_CONCURSO, NUMERO_SIMULACOES) ' +
    ' VALUES($concurso, $numeroSimulacoes)';

module.exports.delete =
    'DELETE FROM SIMULACAO WHERE NUMERO_CONCURSO = $concurso ';

module.exports.insertDezenaSimulacao =
    ' INSERT INTO DEZENA_SIMULACAO(NUMERO_CONCURSO, VALOR, FREQUENCIA) ' +
    '   VALUES( ' + 
    '       $concurso, ' +
    '       $valor, ' + 
    '       $frequencia) ';
    
    