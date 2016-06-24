var express = require('express')
  , app = express(app)
  , server = require('http').createServer(app);
var Eureca = require('eureca.io');
var Hormiga = require('./hormiga.js');
 
var Promise = require("bluebird");
var eurecaServer = new Eureca.Server();
 
eurecaServer.attach(server);
 

 function verificarInventario(comida,cantidad){
 	//Se debe traer el inventario desde la memoria en C 
 	//El inventario estara en formato JSON almacenado en C el mismo sera retornado en el mismo tipo.
 	var inventarioJSON = {
 		yuca:100,
 		lagartosinhueso:20,
 		cambur:10
 	}
 	
 }
 
//functions under "exports" namespace will be exposed to client side
eurecaServer.exports.hello = function (llegoHormiguita) {
	
	var hormiga = new Hormiga(llegoHormiguita);
    console.log('Hormiga > Tipo de comida: '+hormiga.obtenerTipoComida+' Cantidad: '+hormiga.obtenerEncomienda+' Itinerario'+hormiga.obtenerItinerario);
    hormiga.recibirCarga = hormiga.obtenerEncomienda;
    if(hormiga.buscarProximoDestino()){
    	hormiga.viajar(hormiga)
    	.then(function(result){
    		var hormigaResultado = new Hormiga(result);
    		return hormigaResultado;
    	});
    }
    else{return hormiga; }

}
//------------------------------------------
 

//see browser client side code for index.html content
app.get('/pedido', function (req, res, next) {
    //res.send('Hormiga llego');
});
 
server.listen(8003);