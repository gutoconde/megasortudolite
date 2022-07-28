'use strict';

const previsaoController = require('../previsao/PrevisaoController.js');
const resultadoController = require('../resultado/ResultadoController.js');
const dezenaController = require('../resultado/DezenaController.js');

module.exports = function(app) {
    
    app.route('/rest/previsao').get(previsaoController.previsoes);
    app.route('/rest/previsao/estatisticas').get(previsaoController.estatisticas);
    app.route('/rest/previsao/ultima').get(previsaoController.ultimaPrevisao);

    app.route('/rest/resultadoconcurso/ultimo/').get(resultadoController.ultimoResultado);
    app.route('/rest/resultadoconcurso/:concurso').get(resultadoController.resultadoConcurso);
    
    app.route('/rest/dezena/maisfrequentes/').get(dezenaController.dezenasMaisFrequentes);
    app.route('/rest/dezena/menosfrequentes/').get(dezenaController.dezenasMenosFrequentes);
    app.route('/rest/dezena/:dezena').get(dezenaController.dezenaInfo);
};

