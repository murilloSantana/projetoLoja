app.factory('vendasAPI', function ($http) {
	
	var _setVenda = function(venda){

		return $http.post('https://api.backendless.com/v1/data/Vendas',venda,{
			headers:{
				'application-id': '22D65F41-8019-CAC2-FFC1-CF54E1C31200',
				'secret-key'    : '75CBD4A0-E41C-2AD0-FF07-C792F3B1DA00',
				'Content-Type':'application/json'
			}
		}).error(function(data){
			console.log(data);
		})
	}

	var _setGuardarTempo = function(tempoGuardado){

		return $http.post('https://api.backendless.com/v1/data/GuardarTempo',tempoGuardado,{
			headers:{
				'application-id': '22D65F41-8019-CAC2-FFC1-CF54E1C31200',
				'secret-key'    : '75CBD4A0-E41C-2AD0-FF07-C792F3B1DA00',
				'Content-Type':'application/json'
			}
		}).error(function(data){
			console.log(data);
		})
	}

	var _getGuardarTempo = function(){
		return $http.get('https://api.backendless.com/v1/data/GuardarTempo?pageSize=100',{

			headers:{
				'application-id': '22D65F41-8019-CAC2-FFC1-CF54E1C31200',
				'secret-key'    : '75CBD4A0-E41C-2AD0-FF07-C792F3B1DA00',
				'Content-Type':'application/json'
			}

		}).error(function(data) {
			console.log(data);
		});
	}

	var _getVenda = function(){
		return $http.get('https://api.backendless.com/v1/data/Vendas?pageSize=100',{

			headers:{
				'application-id': '22D65F41-8019-CAC2-FFC1-CF54E1C31200',
				'secret-key'    : '75CBD4A0-E41C-2AD0-FF07-C792F3B1DA00',
				'Content-Type':'application/json'
			}

		}).error(function(data) {
			console.log(data);
		});
	}

	var _getVenda = function(){
		return $http.get('https://api.backendless.com/v1/data/Vendas?pageSize=100',{

			headers:{
				'application-id': '22D65F41-8019-CAC2-FFC1-CF54E1C31200',
				'secret-key'    : '75CBD4A0-E41C-2AD0-FF07-C792F3B1DA00',
				'Content-Type':'application/json'
			}

		}).error(function(data) {
			console.log(data);
		});
	}

	var _editVenda = function(objectId,venda){
		return $http.put('https://api.backendless.com/v1/data/Vendas/'+objectId,venda,{

			headers:{
				'application-id': '22D65F41-8019-CAC2-FFC1-CF54E1C31200',
				'secret-key'    : '75CBD4A0-E41C-2AD0-FF07-C792F3B1DA00',
				'Content-Type':'application/json'
			}

		}).error(function(data) {
			console.log(data);
		});
	}
	return {
		setVenda: _setVenda,
		getVenda: _getVenda,
		editVenda: _editVenda,
		setGuardarTempo: _setGuardarTempo,
		getGuardarTempo: _getGuardarTempo

	};
})