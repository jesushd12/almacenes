var express = require('express')
  , app = express(app)
  , server = require('http').createServer(app);
var Eureca = require('eureca.io');
var Hormiga = require('./hormiga.js');
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

    var context = this;
    context.async = true;  //Se necesita que eureca trabaje asincronamente
    var hormiga = new Hormiga(llegoHormiguita);
    console.log('Almacen app - Hormiga enviada > Tipo de comida: '+hormiga.obtenerTipoComida+' Cantidad: '+hormiga.obtenerEncomienda+' Itinerario'+hormiga.obtenerItinerario + ' Hormiga peso MAX ' + hormiga.obtenerPesoMaximo);
    hormiga.recibirCarga = hormiga.obtenerEncomienda;
    if(hormiga.buscarProximoDestino()){
        hormiga.viajar(hormiga)
        .then(function(result){
            var hormigaResultado = new Hormiga(result);
            return  new Promise (function (resolve, reject){
                console.log(' IF  Almacen app - Hormiga antes de regresar PESO MAX' + hormigaResultado.obtenerPesoMaximo);
                context.return(hormigaResultado);
            
            });
        
        });

    }else{
        console.log(' ELSE almacen app - Hormiga antes de regresar ' + hormiga + 'valor peso maximo de la hormiga' + hormiga.obtenerPesoMaximo);
        return new Promise (function (resolve, reject){
        context.return(hormiga);
        });
        }
        
}
//------------------------------------------
 

//see browser client side code for index.html content
app.get('/pedido', function (req, res, next) {
    //res.send('Hormiga llego');
});
 
server.listen(8000);