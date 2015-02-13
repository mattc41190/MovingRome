//this is a constructor for emperors. It will return an object with the given data.
function makeEmperor(firstName, LastName, times, color, active, data, polylineOptions, locations) {
    return {
        firstName: firstName,
    lastName: LastName,
    times: times,
    color: color,
    active: active,
    data: data,
    polylineOptions: polylineOptions,
    locations:locations
  };
}
//POMPEY

var destinations1 = new google.maps.MVCArray();
var pompeyLocations = [];
var pompeyData = [];

getPompeyData(pompeyData)
getPompeyLocations(pompeyLocations)
//this looks the same as the last time you had but it will ensure that you always have the same properties in each emperor object
var pompey = makeEmperor(
			"Gneus",
			"Pompey",
			dates,
			"success",
      false,
			pompeyData,
			{
			path: destinations1,
			strokeColor: '#51A351',
			strokeOpacity: 0
			},
			pompeyLocations);

//CEASAR

var destinations2 = new google.maps.MVCArray();
var ceasarLocations = [];
var ceasarData = [];

getCeasarData(ceasarData)
getCeasarLocations(ceasarLocations)
var ceasar = makeEmperor(
      "Julius",
      "Ceasar",
      dates,
      "danger",
      false,
      ceasarData,
      {
      path: destinations2,
      strokeColor: '#BD362F',
      strokeOpacity: 0
      },
      ceasarLocations);



var emperorArray =
{
	"Pompey": pompey,
	"Ceasar": ceasar
}
