module.exports.appOptions = {
  nome_arquivo_zip : 'D_megase.zip',
  //url : 'http://www1.caixa.gov.br/loterias/_arquivos/loterias/D_megase.zip',
  //url: 'http://www.loterias.caixa.gov.br/wps/portal/loterias/landing/megasena/!ut/p/a1/04_Sj9CPykssy0xPLMnMz0vMAfGjzOLNDH0MPAzcDbwMPI0sDBxNXAOMwrzCjA0sjIEKIoEKnN0dPUzMfQwMDEwsjAw8XZw8XMwtfQ0MPM2I02-AAzgaENIfrh-FqsQ9wNnUwNHfxcnSwBgIDUyhCvA5EawAjxsKckMjDDI9FQE-F4ca/dl5/d5/L2dBISEvZ0FBIS9nQSEh/pw/Z7_HGK818G0K8DBC0QPVN93KQ10G1/res/id=historicoHTML/c=cacheLevelPage/=/',
  url: 'http://servicebus2.caixa.gov.br/portaldeloterias/api/resultados?modalidade=Mega-Sena',
  arquivo_megasena : 'd_mega.htm',
  arquivo_zip : 'D_megase.zip'
};

module.exports.mailOptions = {
    serverOptions : {
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'carson.cartwright43@ethereal.email',
        pass: 'exwGUvhsW1HqR2RJkC'
      }
    },  
};