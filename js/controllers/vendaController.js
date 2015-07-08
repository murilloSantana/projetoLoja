app.controller('vendaCtrl', function ($scope,vendasAPI,maquinasAPI,produtosAPI,$timeout,$rootScope) {
	$scope.numeros = ["01","02","03","04","05","06","07"]
	$scope.horas = ["30","60","90","120","180"]
	$scope.dataAtual = new Date()
	$scope.piscar = false
	$scope.finalTempo=false;
	$scope.tipoRelatorio=["Diário","Mensal","Anual"]
	$scope.anosFiltrados=[]
	$scope.mesesFiltrados=[]
	$scope.diasFiltrados=[]

	$scope.filtrarAnos = function(){
		var contador=0;
		$scope.maquinas.filter(function(elemento) {
			var dateCreate = new Date(elemento.created)
			if($scope.anosFiltrados.length == 0){
				return $scope.anosFiltrados.push(dateCreate.getFullYear());
			}else{
				for (var i = 0; i < $scope.anosFiltrados.length; i++) {

					if($scope.anosFiltrados[i] == dateCreate.getFullYear()){
						contador ++
					}
				}

			}if( contador < 1){						
				return $scope.anosFiltrados.push(dateCreate.getFullYear());
			}
			contador = 0;


		});

	}

	$scope.filtrarMeses = function(){
		var contador = 0;
		$scope.maquinas.filter(function(elemento) {
			var dateCreate = new Date(elemento.created)
			if($scope.mesesFiltrados.length == 0){
				return $scope.mesesFiltrados.push(dateCreate.getMonth()+1);
			}else{
				for (var i = 0; i < $scope.mesesFiltrados.length; i++) {

					if($scope.mesesFiltrados[i] == dateCreate.getMonth()+1){
						contador ++
					}
				}

			}if( contador < 1){						
				return $scope.mesesFiltrados.push(dateCreate.getMonth()+1);
			}
			contador = 0;
			

		});
	}


	$scope.filtrarDias = function(){
		var contador = 0;
		$scope.maquinas.filter(function(elemento) {
			var dateCreate = new Date(elemento.created)
			if($scope.diasFiltrados.length == 0){
				return $scope.diasFiltrados.push(dateCreate.getDate());
			}else{
				for (var i = 0; i < $scope.diasFiltrados.length; i++) {

					if($scope.diasFiltrados[i] == dateCreate.getDate()){
						contador ++
					}
				}

			}if( contador < 1){						
				return $scope.diasFiltrados.push(dateCreate.getDate());
			}
			contador = 0;
		});
	}

	$scope.gerarRelatorio = function(tpRelatorio){
		if(tpRelatorio != null){
			if(tpRelatorio == "Diário"){
				$scope.filtrarDias();

				$scope.mostraDia = 	true;
				$scope.mostraAnual = false;
				$scope.mostraMes = false;
			}else if(tpRelatorio == "Mensal"){
				$scope.filtrarMeses();

				$scope.mostraMes= true;
				$scope.mostraDia= false;
				$scope.mostraAnual = false;

			}else {
				$scope.filtrarAnos();
				$scope.mostraAnual = true
				$scope.mostraMes = false;
				$scope.mostraDia= false;
			}
		}else{
			$scope.mostraAnual = false;
			$scope.mostraDia = false;
			$scope.mostraMes = false;
		}
	}

	$scope.ano = function(tpAno){
		$scope.dadosAno=[];
		$scope.qtdTempos=[];
		$scope.valorMaqs=0;
		$scope.valorProds=0;
		$scope.somaTotal=0;
		$scope.totalTempo=0;
		$scope.maquinas.filter(function(elemento) {
			var ano = new Date(elemento.created);

			if(ano.getFullYear() == tpAno)
				return $scope.qtdTempos.push(elemento);
		});

		
		$scope.maquinas.forEach(function(elemento){
			var ano = new Date(elemento.created);
			
			if(ano.getFullYear() == tpAno)
				return $scope.valorMaqs = eval($scope.valorMaqs) + eval(elemento.valorHora)
		});

		$scope.maquinas.forEach(function(elemento){
			var ano = new Date(elemento.created);
			
			if(ano.getFullYear() == tpAno)
				return $scope.totalTempo = eval($scope.totalTempo) + eval(elemento.tempo)
		});

		$scope.produtosControle.forEach(function(elemento){
			var ano = new Date(elemento.created);
			if(ano.getFullYear() == tpAno)
				return $scope.valorProds = (eval($scope.valorProds) + eval(elemento.preco)) * elemento.quantidade

		});
		$scope.somaTotal = eval($scope.valorMaqs) + eval($scope.valorProds);

		$scope.dadosAno={"dados":{"qtdTempos":$scope.qtdTempos.length,"valorMaquinas": $scope.valorMaqs,
		"valorProds":$scope.valorProds,"somaTotal":$scope.somaTotal,"totalTempo":$scope.totalTempo}}
		$scope.mostraTabelaAnual = true


	}


	$scope.carregarMaquina = function(){
		maquinasAPI.getMaquina().success(function(response){
			$scope.maquinas = response.data;

			console.log($scope.maquinas);
		}).error(function(data) {
			console.log(data);
		});
	};

	$scope.carregarGuardarTempo = function(){
		vendasAPI.getGuardarTempo().success(function(response){
			$scope.temposGuardados = response.data;

			console.log($scope.temposGuardados);
		}).error(function(data) {
			console.log(data);
		});
	};

	$scope.carregarVendas = function(){
		vendasAPI.getVenda().success(function(response){
			$scope.vendas= response.data;
			console.log($scope.vendas);

		}).error(function(data) {
			console.log(data);
		});
	}

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

	$scope.carregarProdutoVenda = function(vend){
		$scope.prodVend=[];
		$scope.produtosControle.filter(function(elemento) {
			if(elemento.numeroMaquina == vend.maquina) return $scope.prodVend.push(elemento);
		});
	}

	$scope.carregarMaquinaVenda = function(vend){
		$scope.maqVend=[];
		$scope.maquinas.filter(function(elemento) {
			if(elemento.numeroMaquina == vend.maquina) return $scope.maqVend.push(elemento);
		});
	}
	
	$scope.salvarTempo = function(){
		vendasAPI.setGuardarTempo(tempoGuardado).success(function(){
			$scope.sucessoGuardar = true;
			$timeout(function(){
				$scope.sucessoGuardar = false;
			},2000)
			$timeout(function(){
				window.location.reload();
			},1000);
		}).error(function() {
			$scope.erroGuardar = true;
			$timeout(function(){
				$scope.erroGuardar= false;
			},2000)
		});
	};

	$scope.dataAtual = new Date();
	$scope.temporizador = function(){
		$scope.timer = new Date();
		$scope.timer.getTime()


		if($scope.finalTempo == true){
			$scope.timer.setTime("null")
			$scope.mensagem="fim de tempo"

			$scope.piscar = !$scope.piscar


		}
		$scope.$apply(function() {

		});			



	}

	var timers = setInterval(function(){ $scope.temporizador() 
	}, 1000);


	$scope.adicionarProduto = function(vend){


		$scope.valorProd= vend.valorProd;
		var produtoMaquinaSelect = $scope.produtos.filter(function(prod) {
			if(prod.select) return $scope.produtos;
		});

		if($scope.produtosControle.length == 0){
			for (var i = 0; i < produtoMaquinaSelect.length; i++) {

				$scope.valorProd += eval(produtoMaquinaSelect[i].preco) * produtoMaquinaSelect[i].qtdProd

			}
		}else{
			for (var i = 0; i < produtoMaquinaSelect.length; i++) {

				$scope.valorProd += eval(produtoMaquinaSelect[i].preco) * produtoMaquinaSelect[i].qtdProd


			};
		}
		$scope.valorTotal = eval(vend.valorHora) + eval($scope.valorProd)


		for (var i = 0; i < produtoMaquinaSelect.length; i++) {


			venda={
				"valorProd":$scope.valorProd,
				"valorTotal":$scope.valorTotal,
				"produtoVenda":
				{
					"___class":"ControleProduto",
					"numeroMaquina":vend.maquina,
					"produto": produtoMaquinaSelect[i].nome,
					"quantidade": produtoMaquinaSelect[i].qtdProd,
					"preco":produtoMaquinaSelect[i].preco
				}
			}
			vendasAPI.editVenda(vend.objectId,venda).success(function(data){
				console.log(data);
				$window.location.reload();
			}).error(function(data) {
				console.log(data);

			});

		};
	}
	$scope.novoTempo = function(){
		$scope.mais = false;
		$scope.primeiro = true;
	}

	$scope.editTempo = function(vend){
		$scope.mais = true;
		$scope.primeiro = false;
		$scope.vend = vend
	}
	$scope.verifica = function(vend){

		$scope.mostraProduto = !$scope.mostraProduto;
		$scope.vend = vend

	}

	$scope.maisTempo = function(maquina){
		$scope.totalHora = 0;

		var contador = 0
		$scope.tempoMaquina(maquina);
		$scope.calculaHora(maquina);
		$scope.maquinas.forEach(function(elemento) {

			if($scope.vend.maquina == elemento.numeroMaquina){
				contador++;
			}
			if(contador < 2 && $scope.vend.maquina == elemento.numeroMaquina){

				return $scope.totalHora = eval($scope.totalHora) + eval(elemento.valorHora) +eval($scope.valorHora)
			}else if(contador >= 2 && $scope.vend.maquina == elemento.numeroMaquina){
				return $scope.totalHora = eval($scope.totalHora) + eval(elemento.valorHora) 

			}
		});
		$scope.valorTotal = eval($scope.totalHora) + eval($scope.vend.valorProd)

		venda={
			"maquina":$scope.vend.maquina,
			"valorHora":$scope.totalHora,
			"fim":$scope.dataFim.getTime(),
			"valorTotal":$scope.valorTotal,
			"vendaMaquinas":[{
				"___class":"Maquinas",
				"numeroMaquina":$scope.vend.maquina,
				"tempo": maquina.tempo,
				"inicio":$scope.dataAtual,
				"fim":$scope.dataFim,
				"valorHora":$scope.valorHora
			}]
		}
		vendasAPI.editVenda($scope.vend.objectId, venda).success(function(data){
			$scope.sucessoSalvar = true;
			$timeout(function() {
				$scope.sucessoSalvar= false
			}, 2000);
			$timeout(function() {
				window.location.reload()
			}, 1000);
		}).error(function(data){
			$scope.erroSalvar = true;
			$timeout(function() {
				$scope.erroSalvar= false
			}, 3000);	
		});
	}



	$scope.salvar = function (maquina) {
		$scope.totalHora=0;
		$scope.valorProd=0;
		var contador = false;
		$scope.tempoMaquina(maquina);
		$scope.calculaHora(maquina);

		for (var i = 0; i < $scope.vendas.length; i++) {
			if($scope.vendas[i].maquina == maquina.numero){
				contador = true;
			}
		};

		if(!contador){

			$scope.totalHora = eval($scope.totalHora) + eval($scope.valorHora)
			$scope.valorTotal = eval($scope.totalHora) + eval($scope.valorProd)
			venda={
				"maquina":maquina.numero,
				"valorHora":$scope.totalHora,
				"fim":$scope.dataFim.getTime(),
				"valorProd":$scope.valorProd,
				"valorTotal":$scope.valorTotal,
				"vendaMaquinas":{
					"___class":"Maquinas",
					"numeroMaquina":maquina.numero,
					"tempo": maquina.tempo,
					"inicio":$scope.dataAtual,
					"fim":$scope.dataFim,
					"valorHora":$scope.valorHora
				}
			}
			vendasAPI.setVenda(venda).success(function(data){
				$scope.sucessoSalvar = true;
				$timeout(function() {
					$scope.sucessoSalvar= false
				}, 2000);
				$timeout(function() {
					window.location.reload()
				}, 1000);
			}).error(function(data){
				$scope.erroSalvar = true;
				$timeout(function() {
					$scope.erroSalvar= false
				}, 3000);			
			});
		}else{
			alert("Está máquina está sendo usada")
		}

	};

	$scope.tempoMaquina = function(venda){
		$scope.dataFim = new Date();
		$scope.dataFim.setMinutes($scope.dataFim.getMinutes()+parseInt(venda.tempo))
		$scope.dataFim.setHours($scope.dataFim.getHours())
		$scope.dataAtual.setHours($scope.dataAtual.getHours())
	}

	$scope.calculaHora = function(venda){
		$scope.valorHora=0;
		if(venda.numero == '04'){
			switch(parseInt(venda.tempo)){
				case 30:
				$scope.valorHora = "1.75";
				break;
				case 60:
				$scope.valorHora = "3.50";
				break;
				case 90:
				$scope.valorHora = "4.00";
				break;
				case 120:
				$scope.valorHora = "5.00";
				break;
				case 180:
				$scope.valorHora = "6.00";
				break;
			}
		}else{
			switch(parseInt(venda.tempo)){
				case 30:
				$scope.valorHora = "1.50";
				break;
				case 60:
				$scope.valorHora = "2.50";
				break;
				case 90:
				$scope.valorHora = "4.00";
				break;
				case 120:
				$scope.valorHora = "5.00";
				break;
				case 180:
				$scope.valorHora = "6.00";
				break;
			}
		}
	}
	$scope.calculaPreco = function(vend){
		$scope.total =0
			// $scope.total = $scope.maquinas.reduce(function(prev,cur,elemento) {

		// 	if(prev == vend.maquina)
		// 		return eval(prev) + eval(cur.valorHora)
		// },0);
		// $scope.total=[]

		$scope.maquinas.forEach(function(elemento) {

			if(vend.maquina == elemento.numeroMaquina)
				return $scope.total = eval($scope.total) + eval(elemento.valorHora)
		})
		console.log($scope.total);

	}

	$scope.filtrarMaquinas = function(){
		$scope.maquinasFiltradas=[]
		for(var i =0; i <$scope.vendas.length;i++){

			$scope.maquinas.filter(function(elemento) {
				if(elemento.numeroMaquina == $scope.vendas[i].maquina)	
					return $scope.maquinasFiltradas.push(elemento);
			});

		}

		for(var i =0; i <$scope.vendas.length;i++){

			$scope.maquinas.filter(function(elemento) {
				if(elemento.numeroMaquina == $scope.vendas[i].maquina)	
					return $scope.maquinasFiltradas.push(elemento);
			});

		}
	}

	
	$scope.carregarVendas();
	$scope.carregarMaquina();
	$scope.carregarProdutos();
	$scope.carregarControleProdutos();

	





})


