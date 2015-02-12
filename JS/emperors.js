
//POMPEY

var destinations1 = new google.maps.MVCArray();
var pompeyLocations = [];
var pompeyData = [];

getPompeyData(pompeyData)
getPompeyLocations(pompeyLocations)
var pompey = {
	firstName: "Gneaus", 
	lastName: "Pompey", 
	times: dates,
	color: "success", 
	data: pompeyData,
	polylineOptions: polyLineOptions1 = 
	{
       path: destinations1,
       strokeColor: '#51A351',
       strokeOpacity: 1
    },
	locations:pompeyLocations
} 

//CEASAR

var destinations2 = new google.maps.MVCArray();
var ceasarLocations = [];
var ceasarData = [];
getCeasarData(ceasarData)
getCeasarLocations(ceasarLocations)
var ceasar = {
	firstName: "Julius", 
	lastName: "Ceasar", 
	times: dates,
	color: "danger", 
	data: ceasarData,
	polylineOptions: polyLineOptions2 = 
	{
       path: destinations2,
       strokeColor: '#BD362F',
       strokeOpacity: 0
    },
	locations: ceasarLocations
} 


var emperorArray = 
{
	"Pompey": pompey,
	"Ceasar": ceasar
}

