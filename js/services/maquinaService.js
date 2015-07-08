app.factory('maquinasAPI', function ($http) {
	
	var _setMaquina = function(maquina){
		return $http.post('https://api.backendless.com/v1/data/Maquinas',maquina,{
			headers:{
				'application-id': '22D65F41-8019-CAC2-FFC1-CF54E1C31200',
				'secret-key'    : '75CBD4A0-E41C-2AD0-FF07-C792F3B1DA00',
				'Content-Type':'application/json'
			}

		})
	};

	var _getMaquina = function(maquina){
		return $http.get('https://api.backendless.com/v1/data/Maquinas',{
			headers:{
				'application-id': '22D65F41-8019-CAC2-FFC1-CF54E1C31200',
				'secret-key'    : '75CBD4A0-E41C-2AD0-FF07-C792F3B1DA00',
				'Content-Type':'application/json'
			}

		})
	};


	return {
		setMaquina: _setMaquina,
		getMaquina: _getMaquina

	};
})