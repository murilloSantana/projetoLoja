app.directive('uiModal', function ($modal) {
	return {
		restrict:'AE',
		transclude:true,
		scope:{
			ctrl:'@',
			size:'@',
			classe:'@'
		},
		template:'<button  class="{{classe}}" ng-click="open()"   ng-transclude></button>',

		link: function(scope,element,attrs){
			var templateDiretorio = '/ProjetoLoja/views/';
			scope.open = function(venda){
				var modalInstance = $modal.open({
					templateUrl: templateDiretorio+attrs.template+'.html',
					controller: scope.ctrl,
					size:scope.size,
					

				});

			}		

			

		}
	}
});

