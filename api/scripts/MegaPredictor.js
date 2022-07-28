'use strict';

const everpolate = require('everpolate');


module.exports.interpolate = (concursosAnteriores) => {
    var proximoIndice = concursosAnteriores.length + 1;
    var indices = Array.from(Array(concursosAnteriores.length), (_,x) => x+1);
    var proximoConcurso = 
        everpolate.polynomial(proximoIndice, indices, concursosAnteriores );
    console.log(concursosAnteriores);
    console.log(proximoConcurso);
    return Math.round(proximoConcurso[0]);
};

module.exports.linearReg = (concursosAnteriores) => {
    var proximoIndice = concursosAnteriores.length + 1;
    var indices = Array.from(Array(concursosAnteriores.length), (_,x) => x+1);
    var regression = everpolate.linearRegression(indices, concursosAnteriores);
    var proximoConcurso = regression.evaluate(proximoIndice);
    return Math.round(proximoConcurso[0]);
};


module.exports.normalizar = (valor, index, arr) =>{
    var maiorValor = arr[arr.length -1] + 100;
    return valor / maiorValor;
}

module.exports.denormalizar = (valor, arr) => {
    var maiorValor = arr[arr.length -1] + 100;
    return valor * maiorValor;
}

//var concursos = [4,5,22,24];//,46,65,68,72,92,101,103,104];//,109,119,129,136,167,169,175,176,181,191,192,198,226,254,257,264,267,297,325,331,338,347,369,370,373,375,397,404,415,416,436,449,450,465,491,499,510,529,530,531,561,591,593,595,620,627,631,641,655,663,664,667,668,687,701,702,707,713,723,726,736,746,748,758,763,766,800,810,823,843,871,887,892,908,911,921,934,946,949,953,966,968,973,981,992,1009,1020,1030,1034,1035,1040,1045,1047,1059,1060,1063,1092,1097,1105,1117,1131,1144,1151,1160,1169,1178,1208,1239,1250,1271,1289,1293,1313,1315,1334,1336,1338,1341,1357,1389,1436,1447,1448,1468,1474,1483,1486,1489,1490,1501,1505,1509,1510,1534,1556,1563,1575,1580,1582,1596,1606,1610,1630,1633,1637,1638,1653,1665,1666,1670,1672,1676,1679,1681,1691,1696,1699,1704,1719,1730,1765,1774,1781,1787,1794,1799,1807,1810,1817,1822,1847,1853,1859,1865,1868,1875,1884,1888,1891,1925,1935,1941,1949,1960,1973,1997]
//console.log(this.interpolate(concursos));
