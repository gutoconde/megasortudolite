'use strict';

require('dotenv').config();
const config = require('./config');
const db = require('../integracao/Database');
const ServiceFactory = require('../model/ServiceFactory');

module.exports.execute = async() => {
    
    try {
        ServiceFactory.getServicoSimulacao(db).executarSimulacaoComFrequencias(2502, 2000000, true);
    } catch(error) {
        throw error;
    }

   return;
};

this.execute();






