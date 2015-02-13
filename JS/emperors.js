
//POMPEY

var destinations1 = new google.maps.MVCArray();
var pompeyLocations = [];
var pompeyData = [];

//this is a constructor for emperors. It will return an object with the given data.
function makeEmperor(firstName, LastName, times, color, data, polylineOptions, locations) {
    return {
        firstName: firstName, 
		lastName: LastName, 
		times: times,
		color: color, 
		data: data,
		polylineOptions: polylineOptions,
		locations:locations
	};
}


getPompeyData(pompeyData)
getPompeyLocations(pompeyLocations)
//this looks the same as the last time you had but it will ensure that you always have the same properties in each emperor object
var pompey = makeEmperor(
			"Gneus", 
			"Pompey", 
			dates, 
			"success", 
			pompeyData, 
			{
			path: destinations1,
			strokeColor: '#51A351',
			strokeOpacity: 1
			}, 
			pompeyLocations);

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
	active: false,
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
