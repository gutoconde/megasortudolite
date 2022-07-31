'use strict'

const cron = require('node-cron');
const TaskImportacaoResultadoDiario = require('../model/TaskImportacaoResultadoDiario');

module.exports = (db) => {
	cron.schedule('0 0,10,21 * * *', () => {
		const task = new TaskImportacaoResultadoDiario(db);
		task.run();
	});
};


