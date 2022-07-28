'use strict';

const jsdom = require("jsdom");
const { JSDOM } = jsdom;


module.exports.parse = (html) => {
    const promise = new Promise((resolve, reject) => {
        const options = {
            contentType: "text/html",
        };
        try {
                const dom = new JSDOM(html, options);
                
                const trs = dom.window.document.querySelectorAll('tr');
                var resultados = [];
                trs.forEach(node => {
                    const tds = node.querySelectorAll('td');
                    
                    if(tds.length >= 9 && !isNaN(tds[0].textContent)) {
                        var str = tds[1].textContent;
                        var match = str.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);  
                        
                        var data = match[3] + '-' + match[2] + '-' + match[1];
                        var resultado = {
                            'numero': parseInt(tds[0].textContent),
                            'data': data,
                            'dezena1': parseInt(tds[2].textContent),
                            'dezena2': parseInt(tds[3].textContent),
                            'dezena3': parseInt(tds[4].textContent),
                            'dezena4': parseInt(tds[5].textContent),
                            'dezena5': parseInt(tds[6].textContent),
                            'dezena6': parseInt(tds[7].textContent)
                        };
                        resultados.push(resultado);
                        
                    }
                });
                resolve(resultados);
        } catch(error) {
            reject(error);
        }

    });
    return promise;
}



