'use strict';

require('dotenv').config();
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const config = require('./config');
const db = require('../integracao/Database');
const ServiceFactory = require('../model/ServiceFactory');

module.exports.execute = async() => {
    await ServiceFactory.getServicoCarga(db).carregarResultadoDiario();
    return;  
};

this.execute();






