app.config(["$routeProvider", "$locationProvider",function ($routeProvider) {
	


	$routeProvider
	.when('/maquinas', {
		templateUrl: '/ProjetoLoja/views/maquina/maquinas.html',
		controller: 'maquinaCtrl'
	}).when('/produto', {
		templateUrl: '/ProjetoLoja/views/produto/produto.html',
		controller: 'produtoCtrl'
	}).when('/venda', {
		templateUrl: '/ProjetoLoja/views/venda/venda.html',
		controller: 'vendaCtrl'
	}).when('/temposAtivos', {
		templateUrl: '/ProjetoLoja/views/venda/temposAtivos.html',
		controller: 'vendaCtrl'
		
	}).when('/relatorio', {
		templateUrl: '/ProjetoLoja/views/relatorio/relatorio.html',
		controller: 'vendaCtrl'
	}).otherwise({ redirectTo: '/venda' })

}])


