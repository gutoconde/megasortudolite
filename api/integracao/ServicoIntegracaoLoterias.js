'use strict';

const axios = require('axios');

class ServicoIntegracaoLoterias {

    static async recuperarPaginaResultados(url) {
        var html = null;
        const options = {
            method: 'GET',
            url: url
        };
        try {
            const response = await axios(options);
            html = response.data.html;
        } catch(error) {
            console.error(error);
        }
        return html;
    };

    static async recuperaResultado(loteria, concurso) {
        var url = 'http://servicebus2.caixa.gov.br/portaldeloterias/api/' + loteria + '/resultado';
        var params = {
            'numero': concurso
        };
        const options = {
            method: 'GET',
            headers: { 'Accept': 'application/json'},
            url: url,
            params
        };
        const resposta = await axios(options);
        return resposta.data;
    }

    static async recuperaUltimoResultado(loteria) {
        var url = 'http://servicebus2.caixa.gov.br/portaldeloterias/api/' + loteria;
        const options = {
            method: 'GET',
            headers: { 'Accept': 'application/json'},
            url: url,
        };
        const resposta = await axios(options);
        return resposta.data;
    }
};

module.exports = ServicoIntegracaoLoterias;