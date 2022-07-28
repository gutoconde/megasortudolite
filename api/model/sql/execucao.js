module.exports.insert =
    ' INSERT INTO EXECUCAO(CONCURSO, DATA_INICIO, STATUS) ' +
    ' VALUES(' + 
    ' $concurso, ' + 
    ' datetime(\'now\', \'localtime\'), ' +
    ' 1) ';

module.exports.update = 
    ' UPDATE EXECUCAO ' +
    ' SET DATA_FIM = datetime(\'now\', \'localtime\'), ' +
    ' STATUS = $status ' +
    ' WHERE ID_EXECUCAO = $idExecucao ';

module.exports.isConcursoProcessado = 
    ' SELECT ' + 
    '   count(*) as count ' + 
    ' FROM EXECUCAO ' + 
    ' WHERE ' + 
    '   CONCURSO = $concurso ' +
    '   AND STATUS = 2 '; //2-PROCESSADA_COM_SUCESSO

module.exports.retornaUltimoConcursoProcessado = 
    'SELECT MAX(CONCURSO) as ultimoConcursoProcessado FROM EXECUCAO WHERE STATUS = 2';