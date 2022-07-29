const { defineConfig } = require('@vue/cli-service')
const { gitDescribe, gitDescribeSync } = require('git-describe');

process.env.VUE_APP_GITHASH = gitDescribeSync().hash;
process.env.VUE_APP_VERSAO = process.env.npm_package_version;
process.env.VUE_APP_TIMESTAMP = (new Date()).toLocaleDateString("pt-BR",
  		{ year: 'numeric', month: 'numeric', day: 'numeric', 
  		hour: 'numeric', minute: 'numeric', second : 'numeric'});

module.exports = defineConfig({
  transpileDependencies: true,
  runtimeCompiler: true
})
