'use strict'

const predictor = require('../scripts/MegaPredictor');

class ServicoCarga {

    constructor(
        repositorioResultado_, repositorioExecucao_,
        repositorioDezena_, repositorioConcurso_, 
        servicoResultado_) {

        this.repositorioResultado = repositorioResultado_;
        this.repositorioExecucao = repositorioExecucao_;
        this.repositorioDezena = repositorioDezena_;
        this.repositorioConcurso = repositorioConcurso_;
        
        this.servicoResultado = servicoResultado_; 
    }

    async carregarResultadoDiario() {
        try {
            process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
            console.log('Executando carga dos resultados faltantes na base de dados...');
            await this.#carregarConcursosFaltantes()
            console.log('Resultados faltantes carregados com sucesso.');
        } catch(error) {
            throw error;
        } finally {
            process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 1;
        }

        var ultimoConcurso = await this.#retornaUltimoConcurso();
        var ultimoConcursoProcessado =  await this.#retornaUltimoConcursoProcessado();
        var concurso = ultimoConcursoProcessado + 1;
    
        for(concurso; concurso <= ultimoConcurso; concurso++) {
            console.log('Executando o processamento do concurso ' + concurso );
            var concursoDoArquivoJaProcessado = await this.#verificaConcursoProcessado(concurso);
            
            if(concursoDoArquivoJaProcessado) {
                console.log('Concurso ' + concurso + ' do arquivo ja processado anteriormente.');
                process.exitCode = 0;
                return;
            }
            var statusExecucao = 1;
            var idExecucao = await this.#inicializaExecucao(concurso);

            await this.#carregarDezenas();

            try {
                await this.#executaPrevisao(concurso);
                console.log('Concurso ' + concurso + ' processado com sucesso.');
                statusExecucao = 2;
                process.exitCode = 0;
            } catch(err) {
                console.log('Erro ao processar concurso  ' + concurso + '.');
                console.log(err.stack);
                statusExecucao = 3;
                process.exitCode = 1;
            }
            await this.#finalizaExecucao(idExecucao, statusExecucao);
        }
    }

    async #carregarConcursosFaltantes() {
        await this.servicoResultado.carregarConcursosFaltantes('megasena');
    }

    async #retornaUltimoConcurso() {
        return await this.repositorioResultado.retornaUltimoConcurso();
    }

    async #retornaUltimoConcursoProcessado(){
        return await this.repositorioExecucao.retornaUltimoConcursoProcessado();
    }

    async #verificaConcursoProcessado(concurso){
        return await this.repositorioExecucao.isConcursoProcessado(concurso);
    };

    async #inicializaExecucao(concurso){
        return await this.repositorioExecucao.insert(concurso);
    };
    
    async #finalizaExecucao(idExecucao, status){
        return await this.repositorioExecucao.update(idExecucao, status);
    };

    async #carregarDezenas(){
        await this.repositorioDezena.deleteDezenas();
        for(var indice = 1; indice <= 6; indice++) {
            await this.repositorioDezena.carregarDezena(indice);
        }
    }

    async #executaPrevisao(concurso){
        await this.#calcularFrequencias(concurso);
        await this.#atualizaPrevisao(concurso);
        await this.#calcularIndices(concurso);
        return await this.#salvarPrevisao(concurso);
    }

    async #calcularFrequencias(concurso){
        await this.repositorioDezena.deleteDezenaFrequencia(concurso);
        await this.repositorioDezena.calculaFrequencias(concurso);
    };
    
    async #calcularIndices(concurso){
        await this.repositorioDezena.deleteDezenaIndice(concurso);
        await this.repositorioDezena.calcularIndices(concurso);
    }
    
    async #atualizaPrevisao(concurso){
        for(var dezena = 1; dezena <= 60; dezena++) {
            var concursos = await this.repositorioConcurso.retornaConcursos(dezena, concurso);
            var proximoConcurso = predictor.linearReg(concursos);
            await this.repositorioDezena.atualizaProximoConcurso(concurso, proximoConcurso, dezena)
        }
    }
    
    async #salvarPrevisao(concurso){
        //Cria o concurso que estah sendo feita a previsao
        await this.repositorioConcurso.delete(concurso + 1);//DELETA SE HOUVER DO MESMO NUMERO
        await this.repositorioConcurso.insert(concurso + 1);
        //Atualiza quais dezenas foram sorteadas na previsao anterior
        await this.repositorioDezena.atualizaDezenasSorteadas(concurso);
        //Salva a previsao para o proximo concurso
        await this.repositorioDezena.salvarPrevisoes(concurso+1);
    }

}

module.exports = ServicoCarga;