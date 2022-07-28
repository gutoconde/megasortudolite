module.exports.calcularIndices = 
    ' INSERT INTO DEZENA_INDICE(concurso, valor, indice_previsao, indice_concursos_atras, indice_frequencia, indice) ' +
    ' SELECT  ' +
    '   IFNULL($concurso, (SELECT MAX(numero) FROM RESULTADO)) , ' +
    '   valor, ' + 
    '   indice_previsao, ' + 
    '   indice_concursos_atras, ' + 
    '   indice_frequencia, ' + 
    '   (1*indice_previsao + 1*indice_concursos_atras + 0*indice_frequencia)/2 as indice ' +
    ' FROM ' +
    ' (SELECT ' +
    '     valor, ' +
    '     (1 - ABS(CAST(proximo_concurso as FLOAT) - CAST(IFNULL($concurso, ultimo_concurso) AS FLOAT) - 1.0)/(CAST(IFNULL($concurso, ultimo_concurso) as FLOAT) + 1.0)) as indice_previsao, ' +
    '     (CAST(concursos_atras as FLOAT)/CAST(max_concursos_atras as FLOAT)) as indice_concursos_atras, ' +
    '     abs(frequencia_media - frequencia)/frequencia_media as indice_frequencia ' +
    ' FROM ' +
    '     ( ' +
    '     select  ' +
    '         valor, ' + 
    '         (select AVG(frequencia) from DEZENA_FREQUENCIA where concurso = IFNULL($concurso, (SELECT MAX(numero) FROM RESULTADO))) as frequencia_media ,  ' + 
    '         (select max(concursos_atras) from DEZENA_FREQUENCIA where concurso = IFNULL($concurso, (SELECT MAX(numero) FROM RESULTADO))) as max_concursos_atras,  ' +
    '         (select AVG(concursos_atras) from DEZENA_FREQUENCIA where concurso = IFNULL($concurso, (SELECT MAX(numero) FROM RESULTADO))) as concursos_atras_medio, ' +
    '         frequencia,  ' +
    '         concursos_atras,  ' +
    '         proximo_concurso  ' +
    '     from DEZENA_FREQUENCIA ' +
    '     where concurso = IFNULL($concurso, (SELECT MAX(numero) FROM RESULTADO)) ' +
    '     )  ' +
    '     JOIN ' +
    '     ( ' +
    '     select  ' +
    '         valor, max(concurso) as ultimo_concurso  ' +
    '     from DEZENA  ' +
    '     group by valor ' +
    '     ) USING(valor) ' +
    ' ) ';

module.exports.deleteDezenas = 
    'DELETE FROM DEZENA';

module.exports.deleteDezenaFrequencia = 
    'DELETE FROM DEZENA_FREQUENCIA WHERE CONCURSO = IFNULL($concurso, (SELECT MAX(numero) FROM RESULTADO))';

module.exports.deleteDezenaIndice = 
    'DELETE FROM DEZENA_INDICE WHERE CONCURSO = IFNULL($concurso, (SELECT MAX(numero) FROM RESULTADO))';

module.exports.calculaFrequencias =
    ' INSERT INTO DEZENA_FREQUENCIA(CONCURSO, VALOR, FREQUENCIA, CONCURSOS_ATRAS) ' +
    ' SELECT ' + 
    ' IFNULL($concurso, (SELECT MAX(numero) FROM RESULTADO)) AS CONCURSO, ' +
    ' VALOR, ' + 
    ' FREQUENCIA, ' + 
    ' (IFNULL($concurso, (SELECT MAX(numero) FROM RESULTADO)) - ULTIMA_OCORRENCIA) AS CONCURSOS_ATRAS ' +
    ' FROM ' +
    '   (SELECT VALOR, COUNT(VALOR) AS FREQUENCIA FROM DEZENA ' + 
    '    WHERE ' + 
    '       CONCURSO <= IFNULL($concurso, (SELECT MAX(numero) FROM RESULTADO)) GROUP BY VALOR ORDER BY FREQUENCIA DESC) ' +
    ' JOIN ' +
    ' (SELECT VALOR, MAX(CONCURSO) AS ULTIMA_OCORRENCIA FROM DEZENA WHERE CONCURSO <= IFNULL($concurso, (SELECT MAX(numero) FROM RESULTADO)) GROUP BY VALOR) USING(VALOR) ';

module.exports.atualizaProximoConcurso = 
    ' UPDATE DEZENA_FREQUENCIA ' +
    '   SET PROXIMO_CONCURSO = $proximoConcurso' +
    ' WHERE ' + 
    '   VALOR = $dezena ' +
    '   AND CONCURSO = $concurso ';

module.exports.salvarPrevisoes = 
    ' INSERT INTO DEZENA_PREVISTA(numero_concurso, dezena, sorteada) ' +
    ' SELECT  ' +
    '     $concurso as numero_concurso, ' +
    '     valor as dezena, ' +
    '     0 as sorteada ' +
    ' FROM DEZENA_INDICE ' + 
    ' WHERE concurso = $concurso-1 ' + 
    ' ORDER BY INDICE DESC LIMIT $numeroDezenas ';

module.exports.atualizaDezenasSorteadas = 
    ' UPDATE DEZENA_PREVISTA SET SORTEADA = 1 WHERE NUMERO_CONCURSO = $concurso AND DEZENA IN ' +
    ' ( ' +
    ' SELECT A.DEZENA FROM ( ' +
    ' SELECT P.DEZENA FROM DEZENA_PREVISTA P ' +
    ' WHERE ' +
    '         P.NUMERO_CONCURSO = $concurso ' +
    '         AND P.DEZENA IN ( ' +
    '         SELECT R.DEZENA_1 AS D FROM RESULTADO R WHERE R.NUMERO = $concurso UNION ' +
    '         SELECT R.DEZENA_2 AS D FROM RESULTADO R WHERE R.NUMERO = $concurso UNION ' +
    '         SELECT R.DEZENA_3 AS D FROM RESULTADO R WHERE R.NUMERO = $concurso UNION ' +
    '         SELECT R.DEZENA_4 AS D FROM RESULTADO R WHERE R.NUMERO = $concurso UNION ' +
    '         SELECT R.DEZENA_5 AS D FROM RESULTADO R WHERE R.NUMERO = $concurso UNION ' +
    '         SELECT R.DEZENA_6 AS D FROM RESULTADO R WHERE R.NUMERO = $concurso ' +
    '     ) ' +
    '     ) AS A ' +
    ' )';

module.exports.selectFrequencias = 
    ' SELECT ' +
    '   VALOR as dezena, ' +
    '   COUNT(*) as frequencia ' +
    ' FROM DEZENA ' +
    ' WHERE ' +
    '     CONCURSO <= $concurso ' +
    ' GROUP BY VALOR ' +
    ' ORDER BY VALOR ASC ';

module.exports.selectIndices = 
    ' SELECT ' +
    '   VALOR as dezena, ' +
    '   INDICE as indice ' +
    ' FROM DEZENA_INDICE ' +
    ' WHERE CONCURSO = $concurso ' +
    ' ORDER BY INDICE DESC ';

module.exports.selectFrequenciasPorColuna = 
    'SELECT ' +
    ' VALOR as dezena, ' +
    '     SUM(case when DEZENA = 1 then frequencia else 0 end) coluna1, ' +
    '     SUM(case when DEZENA = 2 then frequencia else 0 end) coluna2, ' +
    '     SUM(case when DEZENA = 3 then frequencia else 0 end) coluna3, ' +
    '     SUM(case when DEZENA = 4 then frequencia else 0 end) coluna4, ' +
    '     SUM(case when DEZENA = 5 then frequencia else 0 end) coluna5, ' +
    '     SUM(case when DEZENA = 6 then frequencia else 0 end) coluna6 ' +
    ' FROM ' +
    ' ( ' +
    ' SELECT ' + 
    '     VALOR, ' +
    '     DEZENA, ' +
    '     count(*) as frequencia ' +
    ' FROM DEZENA ' +
    ' WHERE ' +
    '     CONCURSO <= $concurso ' +
    ' GROUP BY VALOR, DEZENA ' +
    ' ORDER BY VALOR, DEZENA ' +
    ' ) ' +
    ' GROUP BY VALOR ' +
    ' ORDER BY VALOR ASC ';

    module.exports.dezenaInfo =  
		' SELECT '
		+ ' D.valor as dezena, D.frequencia as frequencia, '
		+ ' ((select max(numero) from RESULTADO) - D.concursos_atras) as ultimo_concurso, '
		+ ' (select D.valor in ( '
		+ ' select valor from DEZENA_FREQUENCIA where frequencia = '
		+ ' (select max(frequencia) from DEZENA_FREQUENCIA ) '
        + ' AND '
        + ' CONCURSO = '
		+ ' (SELECT MAX(NUMERO) FROM RESULTADO) '
		+ ' )) as mais_frequente, '
		+ ' (select D.valor in ( '
		+ ' select valor from DEZENA_FREQUENCIA where frequencia = '
		+ ' (select min(frequencia) from DEZENA_FREQUENCIA ) '
        + ' AND '
        + ' CONCURSO = '
		+ ' (SELECT MAX(NUMERO) FROM RESULTADO) '
		+ ' )) as menos_frequente '
		+ ' FROM DEZENA_FREQUENCIA D '
		+ ' WHERE '
		+ ' D.valor = $dezena '
        + ' AND '
        + ' D.CONCURSO = '
		+ ' (SELECT MAX(NUMERO) FROM RESULTADO)';

module.exports.dezenasMaisFrequentes = 
		'SELECT '
		+ ' D.valor as dezena, D.frequencia as frequencia, '
		+ ' ((select max(numero) from RESULTADO) - D.concursos_atras) as ultimo_concurso, '
		+ ' (select D.valor in ( '
		+ ' select valor from DEZENA_FREQUENCIA where CONCURSO = (SELECT MAX(NUMERO) FROM RESULTADO) and frequencia = '
		+ ' (select max(frequencia) from DEZENA_FREQUENCIA WHERE CONCURSO = (SELECT MAX(NUMERO) FROM RESULTADO) ) '
		+ ' )) as mais_frequente, '
		+ ' (select D.valor in ( '
		+ ' select valor from DEZENA_FREQUENCIA where CONCURSO = (SELECT MAX(NUMERO) FROM RESULTADO) and frequencia = '
		+ ' (select min(frequencia) from DEZENA_FREQUENCIA WHERE CONCURSO = (SELECT MAX(NUMERO) FROM RESULTADO) ) '
		+ ' )) as menos_frequente '
		+ ' FROM DEZENA_FREQUENCIA D '
		+ ' WHERE '
		+ ' D.frequencia = (select max(frequencia) from DEZENA_FREQUENCIA where CONCURSO = (SELECT MAX(NUMERO) FROM RESULTADO)) '
        + ' AND '
        + ' D.CONCURSO = '
		+ ' (SELECT MAX(NUMERO) FROM RESULTADO)';

module.exports.dezenasMenosFrequentes = 
		'SELECT '
		+ ' D.valor as dezena, D.frequencia as frequencia, '
		+ ' ((select max(numero) from RESULTADO) - D.concursos_atras) as ultimo_concurso, '
		+ ' (select D.valor in ( '
		+ ' select valor from DEZENA_FREQUENCIA where CONCURSO = (SELECT MAX(NUMERO) FROM RESULTADO) and frequencia = '
		+ ' (select max(frequencia) from DEZENA_FREQUENCIA WHERE CONCURSO = (SELECT MAX(NUMERO) FROM RESULTADO) ) '
		+ ' )) as mais_frequente, '
		+ ' (select D.valor in ( '
		+ ' select valor from DEZENA_FREQUENCIA where CONCURSO = (SELECT MAX(NUMERO) FROM RESULTADO) and frequencia = '
		+ ' (select min(frequencia) from DEZENA_FREQUENCIA WHERE CONCURSO = (SELECT MAX(NUMERO) FROM RESULTADO) ) '
		+ ' )) as menos_frequente '
		+ ' FROM DEZENA_FREQUENCIA D '
		+ ' WHERE '
		+ ' D.frequencia = (select min(frequencia) from DEZENA_FREQUENCIA WHERE CONCURSO = (SELECT MAX(NUMERO) FROM RESULTADO)) '
        + ' AND '
        + ' D.CONCURSO = '
		+ ' (SELECT MAX(NUMERO) FROM RESULTADO)';
