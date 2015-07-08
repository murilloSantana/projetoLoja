app.directive("maquinaProduto",function(){
	
	return{

		restrict:"AE",
		templateUrl:"/ProjetoLoja/views/venda/maquinaProduto.html"

	}


});

app.directive("alertaSalvar",function(){
	
	return{

		restrict:"AE",
		templateUrl:"/ProjetoLoja/views/venda/alertasVenda.html"

	}


});

app.directive("maquinaModal",function(){
	
	return{

		restrict:"E",
		templateUrl:"/ProjetoLoja/views/maquina/modalMaquina.html",
	}


});

app.directive("relAnual",function(){
	
	return{

		restrict:"AE",
		templateUrl:"/ProjetoLoja/views/relatorio/anual.html"

	}


});

app.directive('teste', function () {
	return {
		restrict: 'AE',
		controller:'vendaCtrl',
		scope:false,
		link: function (scope, iElement, iAttrs) {
			scope.finalTempo = false	


			if((scope.vend.fim - scope.dataAtual.getTime()-79200000) < -79200000 ){
				scope.finalTempo = true

			}

		}
	};
})