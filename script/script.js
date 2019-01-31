var PUBLIC_KEY = "64454da05e570841b064b448884ed0fe";
var PRIV_KEY = "f3abf77279d0229d5a63ec5cdc92d9ef3a6d9982";
var HASH = "8a860f2473dc39bcf95f3ab87c3efd12";
var TIMESTAMP = "200";

function getData() {
	checkCon();
	checkDiv();
	var sSValue = document.getElementById('jcg-search-text').value;
	console.log(sSValue);
	if (sSValue.length == 0){
		alert("Este campo es requerido para la búsqueda");
	}
	var sUrl = "https://gateway.marvel.com:443/v1/public/characters?nameStartsWith="+sSValue+"&apikey="+PUBLIC_KEY+"&hash="+HASH+"&ts="+TIMESTAMP;
	console.log(sUrl);
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	    if (xhttp.readyState == 4 && xhttp.status == 200) {
	    	var oPersonajes = JSON.parse(xhttp.responseText);
	    	//console.log(oPersonajes);
	    	var personajes = oPersonajes.data.results;
	    	noResultsMessage(personajes);
	    	for (var i = 0; i < personajes.length; i++) {
	    		console.log(personajes[i].name);
	    		console.log(personajes[i].description);
	    		//console.log(personajes[i].thumbnail.path+"/portrait_small"+"."+personajes[i].thumbnail.extension);
	    		var sImage = personajes[i].thumbnail.path+"/portrait_medium"+"."+personajes[i].thumbnail.extension;
	    		var sName = personajes[i].name;
	    		var sDesc = personajes[i].description; 
	    		var sMessage = "No hay una descripción disponible para este personaje";
	    		var card = document.createElement('div');
	    		card.className = 'jcg-div-hijo';
	    		var sTituloElem = document.createElement('h2');
	    		var sDescElem = document.createElement('p');
	    		sDescElem.className = 'jcg-text';
	    		var iFotoElem = document.createElement('img');
	    		iFotoElem.className = 'jcg-img-card';
			    var sNodeName = document.createTextNode(sName);
			    var sNodeDesc = document.createTextNode(sDesc);
			    if (sNodeDesc.length == 0){
			    	var sNodeDesc = document.createTextNode(sMessage);
			    }
			    iFotoElem.src = sImage;
			    sTituloElem.appendChild(sNodeName);
			    sDescElem.appendChild(sNodeDesc);
			    card.appendChild(iFotoElem);
			    card.appendChild(sTituloElem);
			    card.appendChild(sDescElem);
			    document.getElementById("jcg-div-padre").appendChild(card);
	    	}
	    	//document.getElementById('but').disabled = true;
	    }
	};
	xhttp.open('GET', sUrl, true);
	xhttp.send();

	//console.log(oPersonajes.data.results);
}

function getRefresh() {
  //localStorage.removeItem('DatasDescription');
  var parent = document.getElementById('jcg-div-padre');
  while (parent.firstChild) {
    console.log(parent.firstChild);
    parent.removeChild(parent.firstChild);
  }
  var sInput = document.getElementById("jcg-search-text");
  sInput.value= "";
}

function checkCon(){
	if(!navigator.onLine){
		alert('No hay una conexión a internet, no se puede realizar exitosamente la búsqueda');
	}
}
function checkDiv () {
	var ckDiv = document.getElementById('jcg-div-hijo');
	if (ckDiv = true){
		document.getElementById('jcg-div-padre').innerHTML='';
	}
}

function noResultsMessage (personajes) {
	if (personajes.length == 0){
		//alert("Esta búsqueda no arroja ningún resultado, prueba con otra búsqueda");
		var card = document.createElement('div');
		card.className = 'jcg-div-msg';
		var sTituloElem = document.createElement('p');
		sTituloElem.className = 'jcg-msgerror-text';
		var sMessageNoResults = document.createTextNode("No se encontraron resultados, prueba con otra búsqueda");
		sTituloElem.appendChild(sMessageNoResults);
		card.appendChild(sTituloElem);
		document.getElementById('jcg-div-padre').appendChild(card);
	}
}