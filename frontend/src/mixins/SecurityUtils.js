export default {
    methods: {
    	isTokenValido: function() {
			let result = false;
			let token = localStorage['megasortudo-token'];
		   	if ( token !== null ) {
		   		console.log (this.parseJWT(token));	
		   		result = true;
		  	}
		  	return result;
		},

		parseJWT: function(token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse(window.atob(base64));
        },
	},

	
};