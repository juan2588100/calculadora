var calculadora = {
	
	      cuadro: document.getElementById("display"),
	      valorPantalla: "0",
	      operacion: "",
	      primerValor: 0,
	      segundoValor: 0,
	      ultimoValor: 0,
	      resultado: 0,
	      teclaIgual: false, 
    
    // método de inicialización
	
	            init: (function(){
		            this.eventosBotones(".tecla");
		            this.eventosFuncion();
	            }),
	
	// botones
	
	eventosBotones: function(selector){
		var x = document.querySelectorAll(selector);
		for (var i = 0; i<x.length;i++) {
			x[i].onmouseover = this.eventoEncogerBoton;
			x[i].onmouseleave = this.eventoOriginalBoton;
		};
	          },
 	          eventoEncogerBoton: function(event){
		          calculadora.EncogerBoton(event.target);
	},
 	eventoOriginalBoton: function(event){
		calculadora.AgrandarBoton(event.target);
	},
	
	// boton reduzca su tamaño
	
	EncogerBoton: function(elemento){
		var x = elemento.id;
		if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" ||       x=="punto" ) {
			elemento.style.width = "28%";
			elemento.style.height = "62px";
		} else if(x=="mas") {
			elemento.style.width = "88%";
			elemento.style.height = "98%";
		} else {
		    elemento.style.width = "21%";
		    elemento.style.height = "62px";
		}
	},
    
    
// boton Aumente  su tamaño
	
	AgrandarBoton: function(elemento){
		  var x = elemento.id;
		if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto" ) {
			elemento.style.width = "29%";
			elemento.style.height = "62.91px";
		} else if(x=="mas") {
			elemento.style.width = "90%";
			elemento.style.height = "100%";
		} else {
		elemento.style.width = "22%";
		elemento.style.height = "62.91px";
		}
	},
	
	
		
// poner funciones a los botones
 eventosFuncion: function(){
		document.getElementById("0").addEventListener("click", function() {calculadora.colocarNumero("0");});
		document.getElementById("1").addEventListener("click", function() {calculadora.colocarNumero("1");});
		document.getElementById("2").addEventListener("click", function() {calculadora.colocarNumero("2");});
		document.getElementById("3").addEventListener("click", function() {calculadora.colocarNumero("3");});
		document.getElementById("4").addEventListener("click", function() {calculadora.colocarNumero("4");});
		document.getElementById("5").addEventListener("click", function() {calculadora.colocarNumero("5");});
		document.getElementById("6").addEventListener("click", function() {calculadora.colocarNumero("6");});
		document.getElementById("7").addEventListener("click", function() {calculadora.colocarNumero("7");});
		document.getElementById("8").addEventListener("click", function() {calculadora.colocarNumero("8");});
		document.getElementById("9").addEventListener("click", function() {calculadora.colocarNumero("9");});
		document.getElementById("on").addEventListener("click", function() {calculadora.borrarPantalla();});
		document.getElementById("sign").addEventListener("click", function() {calculadora.cambiarSigno();});
		document.getElementById("punto").addEventListener("click", function() {calculadora.numeroDecimal();});
		document.getElementById("igual").addEventListener("click", function() {calculadora.verResultado();});
		
        
          document.getElementById("menos").addEventListener("click", function() {calculadora.implementarOperacion("-");});
		document.getElementById("mas").addEventListener("click", function() {calculadora.implementarOperacion("+");});
		document.getElementById("dividido").addEventListener("click", function() {calculadora.implementarOperacion("/");});
		 document.getElementById("por").addEventListener("click", function() {calculadora.implementarOperacion("*");});
		  
	},
	
	
//limpiar pantalla
	
	borrarPantalla: function(){ 
        	this.operacion = "";
 	    this.valorPantalla = "0";
	
		this.primerValor = 0;
		this.segundoValor = 0;
		this.resultado = 0;
		this.Operación = "";
		this.teclaIgual = false;
		this.ultimoValor = 0;
		this.actualizarPantalla();
	},
	
	      cambiarSigno: function(){
		if (this.valorPantalla !="0") {
			var auxiliar;
			if (this.valorPantalla.charAt(0)=="-") {
				auxiliar = this.valorPantalla.slice(1);
			}	else {
				auxiliar = "-" + this.valorPantalla;
			}
		this.valorPantalla = "";
		this.valorPantalla = auxiliar;
		this.actualizarPantalla();
		}
	},
	
	numeroDecimal: function(){
		      if (this.valorPantalla.indexOf(".")== -1) {
			if (this.valorPantalla == ""){
				this.valorPantalla = this.valorPantalla+ "0.";
			} else {
				this.valorPantalla = this.valorPantalla + ".";
			}
			this.actualizarPantalla();
		}
	},
	
	colocarNumero: function(valores){
		    if (this.valorPantalla.length < 8) {
		 if (this.valorPantalla=="0") {
				this.valorPantalla = "";
				this.valorPantalla = this.valorPantalla + valores;
			} else {
				this.valorPantalla = this.valorPantalla + valores;
			}
		this.actualizarPantalla();
		}
	},
	
	implementarOperacion: function(operacion){
		  this.primerValor = parseFloat(this.valorPantalla);
		this.valorPantalla = "";
		this.operacion = operacion;
		  this.teclaIgual= false;
		this.actualizarPantalla();
	},
	
	verResultado: function(){ 
 		if(!this.teclaIgual){ 
			this.segundoValor = parseFloat(this.valorPantalla);
			this.ultimoValor = this.segundoValor;
            
		//resultado
			this.ejecutarOperacion(this.primerValor, this.segundoValor, this.operacion);
		
            
            
            //presionar el botón igual para que se ejecute la operacion
		} else { 
		this.ejecutarOperacion(this.primerValor, this.ultimoValor, this.operacion);
		}
	
		//guardar resultado para seguir operacion
		this.primerValor = this.resultado;
	
		// borrar pantalla 
		this.valorPantalla = "";
	
		//ver solo 8 numeros en pantalla
 		if (this.resultado.toString().length < 9){
			this.valorPantalla = this.resultado.toString();
		} else {
			this.valorPantalla = this.resultado.toString().slice(0,8) + "...";
		}
	
		//tecla igual calculando ultimo valor
 		this.teclaIgual = true;		
		this.actualizarPantalla();
	
	},
	ejecutarOperacion: function(primerValor, segundoValor, operacion){
  switch(operacion){
			case "+": 
				this.resultado = (primerValor + segundoValor);
			break;
			case "-": 
				this.resultado = (primerValor - segundoValor);
			break;
			case "*": 
				this.resultado = (primerValor * segundoValor);
			break;
			case "/": 
				this.resultado = (primerValor / segundoValor);
			break;
  }
	    },
	
	    actualizarPantalla: function(){
		    this.cuadro.innerHTML = this.valorPantalla;
	    }
	
};
 calculadora.init();