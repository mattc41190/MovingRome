//POMPEY

var destinations1 = new google.maps.MVCArray();
var pompeyLocations = [];
var pompeyData = [];

getPompeyData(pompeyData)
getPompeyLocations(pompeyLocations)
var pompey = {
	firstname: "Gneaus", 
	lastname: "Pompey", 
	times: dates,
	color: "success", 
	data: pompeyData,
	polylineOptions: polyLineOptions1 = 
	{
       path: destinations1,
       strokeColor: '#51A351',
       strokeOpacity: 0
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
	firstname: "Julius", 
	lastname: "Ceasar", 
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
