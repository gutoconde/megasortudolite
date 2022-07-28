module.exports.deleteResultados = 
    'DELETE FROM RESULTADO';

module.exports.selectResultados = 
    ' SELECT ' +
    '   R.ID as id, ' +
    '   R.CODIGO as codigo, ' +
    '   R.DATA as data, ' +
    '   R.DEZENA_1 as dezena_1, ' +
    '   R.DEZENA_2 as dezena_2, ' +
    '   R.DEZENA_3 as dezena_3, ' +
    '   R.DEZENA_4 as dezena_4, ' +
    '   R.DEZENA_5 as dezena_5, ' +
    '   R.DEZENA_6 as dezena_6, ' +
    ' FROM RESULTADO R ';

module.exports.insert = 
    'INSERT INTO ' + 
    ' RESULTADO ( ' + 
    ' NUMERO, DATA, ' + 
    ' DEZENA_1, DEZENA_2, DEZENA_3, ' +
    ' DEZENA_4, DEZENA_5, DEZENA_6) ' +
    '   VALUES ( ' +
    ' $numero, $data, ' + 
    ' $dezena_1, $dezena_2, $dezena_3, ' + 
    ' $dezena_4, $dezena_5, $dezena_6 ' +
    ' ) ';

module.exports.retornaUltimoConcurso = 
    ' SELECT MAX(numero) as ultimoConcurso FROM RESULTADO ';

module.exports.recuperarUltimoResultado = 
    'SELECT R.numero as numero, '
        + ' R.data as data, '
        + ' R.dezena_1 as dezena_1, '
        + ' R.dezena_2 as dezena_2, '
        + ' R.dezena_3 as dezena_3, '
        + ' R.dezena_4 as dezena_4, '
        + ' R.dezena_5 as dezena_5, '
        + ' R.dezena_6 as dezena_6 '
        + ' FROM RESULTADO R '
        + ' WHERE '
        + ' R.numero =  '
        + ' (SELECT MAX(NUMERO) FROM RESULTADO)';

module.exports.retornarResultadoConcurso = 
    'SELECT R.numero as numero, '
    + ' R.data as data, '
    + ' R.dezena_1 as dezena_1, '
    + ' R.dezena_2 as dezena_2, '
    + ' R.dezena_3 as dezena_3, '
    + ' R.dezena_4 as dezena_4, '
    + ' R.dezena_5 as dezena_5, '
    + ' R.dezena_6 as dezena_6 '
    + ' FROM RESULTADO R '
    + ' WHERE '
    + ' R.numero = $concurso ';

    