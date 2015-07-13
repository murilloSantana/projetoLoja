app.controller('produtoCtrl',  function ($scope,produtosAPI) {
	$scope.produtos;

	$scope.currentPage = 1;
	$scope.pageSize= 20;
	$scope.perPagePresets = [10,20,30,50,100];
	
	$scope.carregarProdutos = function(){
		produtosAPI.getProduto().success(function(response){
			$scope.produtos= response.data;
			console.log($scope.produtos);
		}).error(function(data) {
			console.log(data);
		});
	}
	$scope.carregarControleProdutos = function(){
		produtosAPI.getControleProduto().success(function(response){
			$scope.produtosControle= response.data;
			console.log($scope.produtosControle);
		}).error(function(data) {
			console.log(data);
		});
	}

	$scope.carregarControleProdutos();
	$scope.carregarProdutos();

});



app.controller('modalProdutoCtrl',  function ($scope,$modalInstance,produtosAPI) {
	
	$scope.salvar = function (produto) {
		produto={
			"nome":produto.nome,
			"preco":produto.preco,
			"quantidade":produto.quantidade
		}
		produtosAPI.setProduto(produto).success(function(){
			$modalInstance.close();
		});

	};

	$scope.cancel = function () {
		$scope.produto = [];
		$modalInstance.dismiss();

	};
})
