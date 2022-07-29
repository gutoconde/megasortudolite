export default class User {
  
    static from (token) {
        try {
          let obj = User.parseJWT(token)
          return new User(obj)
        }catch(error) {
          return null
        }
    }
  
    static isSessaoValida(token) {
      let sessaoValida = false
      let usuario = User.from(token)
      if(usuario) {
        sessaoValida = !usuario.sessaoExpirada;
      }
      return sessaoValida
    }
  
    constructor ({ iat, ext, sub }) {
      this.dataCriacao = iat
      this.dataExpiracao = ext
      this.id = sub 
    }
  
    static parseJWT(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }
  
    get idUsuario () {
      return this.id;
    }
  
    get sessaoExpirada() {
      let currentDate = new Date().getTime();
      return this.dataExpiracao <= currentDate;
    }
  }