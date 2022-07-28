INSERT INTO DEZENA_FREQUENCIA(valor, frequencia, concursos_atras) 
select valor, frequencia, 2498 - ultima_ocorrencia as concursos_atras
from 
(select valor, count(valor) as frequencia from DEZENA WHERE concurso <= 2498 group by valor order by frequencia desc)
    join
(select valor, max(concurso) as ultima_ocorrencia from DEZENA where concurso <= 2498 group by valor) using(valor);

SELECT CONC,CONCURSO FROM
    (SELECT CONCURSO FROM DEZENA
    WHERE
        VALOR = 10
        AND CONCURSO < 2400
    ORDER BY CONCURSO DESC) CONC
ORDER BY CONCURSO ASC

INSERT INTO DEZENA_INDICE(valor, indice_previsao, indice_concursos_atras, indice_frequencia, indice)
SELECT 
    valor, indice_previsao, indice_concursos_atras, indice_frequencia, (indice_previsao + indice_concursos_atras + indice_frequencia)/3 as indice
FROM
(SELECT
    valor,
    (1 - ABS(CAST(proximo_concurso as FLOAT) - CAST(ultimo_concurso AS FLOAT) - 1.0)/(CAST(ultimo_concurso as FLOAT) + 1.0)) as indice_previsao,
    (CAST(concursos_atras as FLOAT)/CAST(max_concursos_atras as FLOAT)) as indice_concursos_atras,
    abs(frequencia_media - frequencia)/frequencia_media as indice_frequencia
FROM
    (
    select 
        valor, 
        (select AVG(frequencia) from DEZENA_FREQUENCIA) as frequencia_media, 
        (select max(concursos_atras) from DEZENA_FREQUENCIA) as max_concursos_atras, 
        (select AVG(concursos_atras) from DEZENA_FREQUENCIA) as concursos_atras_medio,
        frequencia, 
        concursos_atras, 
        proximo_concurso 
    from DEZENA_FREQUENCIA
    ) 
    JOIN
    (
    select 
        valor, max(concurso) as ultimo_concurso 
    from DEZENA 
    group by valor
    ) USING(valor)
);

INSERT INTO DEZENA_PREVISTA(concurso_id, dezena, sorteada)
SELECT 
    (SELECT ID FROM CONCURSO WHERE NUMERO = $concurso) as concurso_id, 
    valor as dezena, 
    0 as sorteada 
FROM DEZENA_INDICE 
ORDER BY INDICE DESC LIMIT $numero_dezenas;

INSERT INTO DEZENA_PREVISTA(CONCURSO_ID, DEZENA, SORTEADA)
SELECT 
    (SELECT ID FROM CONCURSO WHERE NUMERO = 2498) as CONCURSO_ID, 
    valor as dezena, 
    0 as sorteada 
FROM DEZENA_INDICE 
ORDER BY INDICE DESC LIMIT 8;

UPDATE DEZENA_PREVISTA SET SORTEADA = 1 WHERE ID IN
(
SELECT A.ID FROM (	
SELECT P.ID FROM DEZENA_PREVISTA P
	JOIN CONCURSO C ON C.ID = P.CONCURSO_ID WHERE C.NUMERO = $concursoAtual
	AND P.DEZENA IN (
		SELECT R.DEZENA_1 AS D FROM RESULTADO R WHERE R.NUMERO = $concursoAtual UNION 
		SELECT R.DEZENA_2 AS D FROM RESULTADO R WHERE R.NUMERO = $concursoAtual UNION 
		SELECT R.DEZENA_3 AS D FROM RESULTADO R WHERE R.NUMERO = $concursoAtual UNION 
		SELECT R.DEZENA_4 AS D FROM RESULTADO R WHERE R.NUMERO = $concursoAtual UNION 
		SELECT R.DEZENA_5 AS D FROM RESULTADO R WHERE R.NUMERO = $concursoAtual UNION
		SELECT R.DEZENA_6 AS D FROM RESULTADO R WHERE R.NUMERO = $concursoAtual
	)
	) AS A
);

select numero_concurso, sum(sorteada) from dezena_prevista group by numero_concurso having sum(sorteada) > 3;
select * from dezena_prevista where numero_concurso = 2500;


SELECT 
    VALOR,
    DEZENA,
    count(*) 
FROM DEZENA
WHERE
    VALOR = 2
GROUP BY VALOR, DEZENA
ORDER BY VALOR, DEZENA;



SELECT 
    VALOR,
    SUM(case when DEZENA = 1 then frequencia else 0 end) COLUNA_1,
    SUM(case when DEZENA = 2 then frequencia else 0 end) COLUNA_2,
    SUM(case when DEZENA = 3 then frequencia else 0 end) COLUNA_3,
    SUM(case when DEZENA = 4 then frequencia else 0 end) COLUNA_4,
    SUM(case when DEZENA = 5 then frequencia else 0 end) COLUNA_5,
    SUM(case when DEZENA = 6 then frequencia else 0 end) COLUNA_6
FROM
(
SELECT 
    VALOR,
    DEZENA,
    count(*) as frequencia
FROM DEZENA
WHERE
    CONCURSO <= 1000
GROUP BY VALOR, DEZENA
ORDER BY VALOR, DEZENA
)
GROUP BY VALOR
ORDER BY VALOR ASC;


SELECT 
    VALOR,
    count(*) as frequencia
FROM DEZENA
WHERE
    CONCURSO <= 1000
GROUP BY VALOR
ORDER BY VALOR ASC;


    INSERT INTO DEZENA_SIMULACAO(ID_SIMULACAO, VALOR, FREQUENCIA)
     VALUES(
     (select ID from SIMULACAO where NUMERO_CONCURSO = 2503) ,
     1, 1)