module.exports.deletePrevisoes = 
    'DELETE FROM DEZENA_PREVISTA';

module.exports.previsoes = 'SELECT D.NUMERO_CONCURSO AS NUMERO, D.DEZENA, D.SORTEADA, '
		+ ' R.DEZENA_1, R.DEZENA_2, R.DEZENA_3, R.DEZENA_4, R.DEZENA_5, R.DEZENA_6 '
		+ ' FROM DEZENA_PREVISTA D '
		+ ' LEFT JOIN RESULTADO R ON D.NUMERO_CONCURSO = R.NUMERO '
		+ ' WHERE '
		+ ' D.NUMERO_CONCURSO >= '
		+ ' (SELECT (MAX(NUMERO) - 100) FROM CONCURSO)' 
		+ ' ORDER BY D.NUMERO_CONCURSO DESC, D.DEZENA ASC ';

module.exports.estatisticas = 'SELECT distinct '
			+ ' F.valor as dezena, '
			+ ' F.frequencia as frequencia, '
			+ ' F.concursos_atras as concursos_atras, '
			+ ' F.proximo_concurso as proximo_concurso, '
			+ ' I.indice as indice '
			+ ' FROM DEZENA_FREQUENCIA F '
			+ ' JOIN DEZENA_INDICE I ON F.valor = I.valor AND F.CONCURSO = I.CONCURSO '
            + ' WHERE '
            + ' F.CONCURSO = '
		    + ' (SELECT MAX(NUMERO) FROM RESULTADO)' 
			+ ' order by I.indice desc ';

module.exports.ultimaPrevisao = 'SELECT D.NUMERO_CONCURSO AS NUMERO, D.DEZENA '
		+ ' FROM DEZENA_PREVISTA D '
		+ ' WHERE '
		+ ' D.NUMERO_CONCURSO = '
		+ ' (SELECT MAX(NUMERO_CONCURSO) FROM DEZENA_PREVISTA)' 
		+ ' ORDER BY D.NUMERO_CONCURSO DESC, DEZENA ASC ';

module.exports.ultimoConcursoProcessado = 'SELECT MAX(CONCURSO) FROM DEZENA_INDICE';
		  
module.exports.isConcursoProcessado = 
		' SELECT ' + 
		'   count(*) as count ' + 
		' FROM DEZENA_INDICE ' + 
		' WHERE ' + 
		'   CONCURSO = $concurso ';