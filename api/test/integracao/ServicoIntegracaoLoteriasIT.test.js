const assert = require('assert');
const ServicoIntegracaoLoterias = require('../../integracao/ServicoIntegracaoLoterias');
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

describe('Testando recuperacao de concursos', () => {
    var concursos = [ 1, 400, 980, 1030, 2500 ];
    concursos.forEach(concurso => {
        it('Testando recuperacao de concurso ' + concurso, async() => {
            var resultado = await ServicoIntegracaoLoterias.recuperaResultado('megasena', concurso);
            assert.equal(resultado.numero, concurso);
            assert.equal(resultado.tipoJogo, 'MEGA_SENA');
        });
    });    
});