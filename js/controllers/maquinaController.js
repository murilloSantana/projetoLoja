app.controller('maquinaCtrl', function($scope,produtosAPI,maquinasAPI){

	$scope.currentPage = 1;
	$scope.pageSize= 20;
	$scope.perPagePresets = [10,20,30,50,100];

	$scope.carregarMaquina = function(){
		maquinasAPI.getMaquina().success(function(response){
			$scope.maquinas = response.data;
			console.log($scope.maquinas);
		}).error(function(data) {
			console.log(data);
		});
	}


	$scope.carregarMaquina();

});


app.controller('modalMaquinaCtrl', function($scope,maquinasAPI,$modalInstance,produtosAPI){
	

	$scope.cancel = function () {
		$modalInstance.dismiss();

	};

	$scope.carregarProdutos = function(){
		produtosAPI.getProduto().success(function(response){
			$scope.produtos= response.data;
			console.log($scope.produtos);
		}).error(function(data) {
			console.log(data);
		});
	}

	$scope.carregarProdutos();

});