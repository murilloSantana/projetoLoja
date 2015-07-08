app.factory('produtosAPI', function ($http) {
	
	var _setProduto = function(produto){

		return $http.post('https://api.backendless.com/v1/data/Produtos',produto,{
			headers:{
				'application-id': '22D65F41-8019-CAC2-FFC1-CF54E1C31200',
				'secret-key'    : '75CBD4A0-E41C-2AD0-FF07-C792F3B1DA00',
				'Content-Type':'application/json'
			}
		}).error(function(data){
			console.log(data);
		})
	}

	var _getProduto = function(){
		return $http.get('https://api.backendless.com/v1/data/Produtos?pageSize=100',{

			headers:{
				'application-id': '22D65F41-8019-CAC2-FFC1-CF54E1C31200',
				'secret-key'    : '75CBD4A0-E41C-2AD0-FF07-C792F3B1DA00',
				'Content-Type':'application/json'
			}

		}).error(function(data) {
			console.log(data);
		});
	}

	var _getControleProduto = function(){
		return $http.get('https://api.backendless.com/v1/data/ControleProduto?pageSize=100',{

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
		setProduto: _setProduto,
		getProduto: _getProduto,
		getControleProduto:_getControleProduto
	};
})