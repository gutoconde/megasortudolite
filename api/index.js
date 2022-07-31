require('dotenv').config();
var express = require('express');
var cors = require('cors')

var app = express();
var dbMiddleWare = require('./integracao/DatabaseMiddleware');
var db = require("./integracao/Database.js");
var bodyParser = require('body-parser');

const port = process.env.MEGASORTUFO_API_PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(dbMiddleWare(db));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

var routes = require('./routes');
routes(app);

app.listen(port, () => {
    console.log(`Servico iniciado na porta ${port}!`);
});

//Tarefas Agendadas
var tasks = require('./administracao/TarefasAgendadas');
tasks(db);

