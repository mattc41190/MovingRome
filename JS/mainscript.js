var map, mapOptions;
var destinations3 = new google.maps.MVCArray();
var destinations4 = new google.maps.MVCArray();
var polyLine3, polyLineOptions3;
var polyLine4, polyLineOption4;
var plots3 = [];
var tiberius = [];
var circleNum = 0;

$(document).ready(function() {
    document.getElementById("dateShower").innerHTML = dates[0];
    for(emperor in emperorArray)
    {
      var currentEmperor = emperorArray[emperor]
      currentEmperor.destinations.push(currentEmperor.locations[0]);
    }
});

$('input[type="range"]').rangeslider({
    polyfill: false,
});
$(document).on('input', 'input[type="range"]', function(e){ 
value = e.target.value;
circleNum = value;
document.getElementById("dateShower").innerHTML = dates[value];
slideChanged(value); 
});



$("#markerSlider1").bind("slider:changed", function() {
    value = this.value;
    circleNum = value;
    document.getElementById("dateShower").innerHTML = dates[value];
    slideChanged(value);
});

function slideChanged(value) {
    if(value >= destinations1.length)
    {
    while(value >= destinations1.length) {
            var lengthVal  = destinations1.length;
            destinations1.push(pompey.locations[lengthVal])
            destinations2.push(ceasar.locations[lengthVal])
            destinations3.push(plots3[lengthVal])
            destinations4.push(tiberius[lengthVal])
            }
    }
    else if (value < destinations1.length) {
        while(value < destinations1.length -1) {
            destinations1.pop()
            destinations2.pop()
            destinations3.pop()
            destinations4.pop()
        }
    }
}



function initialize() {

    mapOptions =
    {
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        center: new google.maps.LatLng(41.902277040963696, 12.5244140625),
        zoom: 6,
        maxZoom: 10,
        minZoom: 4,
        streetViewControl: false,
        zoomControl: false,
        panControl: false,
        mapTypeControl: false,
    };


    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    for (emperor in emperorArray)
    {
            emperorArray[emperor].Polyline = new google.maps.Polyline(emperorArray[emperor].polylineOptions);
            emperorArray[emperor].Polyline.setMap(map);
    }


    polyLineOptions3 = {
        path: destinations3,
        strokeColor: '#4D70B8',
        strokeOpacity: .1
    };

    polyLineOptions4 = {
            path: destinations4,
            strokeColor: '  #FFAD33',
            strokeOpacity: .1
    };



    polyLine3 = new google.maps.Polyline(polyLineOptions3);
    polyLine3.setMap(map);
    polyLine4 = new google.maps.Polyline(polyLineOptions4);
    polyLine4.setMap(map);
}

google.maps.event.addDomListener(window, 'load', initialize);

//Function to actively liten to window resizing
google.maps.event.addDomListener(window, "resize", function() {
 var center = map.getCenter();
google.maps.event.trigger(map, "resize");
 map.setCenter(center);
});

var menuShown = true
function showMenu()
{
    console.log("clickedMenu");
    if (menuShown == true)
    {
        document.getElementById("fMenu").style.opacity = "0";
        document.getElementById("fMenu").style.height = "0px";
        document.getElementById("fMenu").style.width = "0px";
        menuShown = false;
    }
    else
    {
        document.getElementById("fMenu").style.opacity = "1";
        document.getElementById("fMenu").style.height = "600px";
        document.getElementById("fMenu").style.width = "250px";
        menuShown = true;
    }

}

function showModal(circleElement, number)
{
  console.log(number);
  var emperorName = circleElement.getAttribute("name");
  document.getElementById("modalTitle").innerHTML = emperorName;
  document.getElementById("dynamicText").innerHTML = chooseSentence(emperorName, number);
}

function cellClicked(element, circleID)
{

    var emperorName = element.getAttribute("name");
    var circle = document.getElementById(circleID);
    console.log(emperorName);
    var colorActive = emperorArray[emperorName].active;
    if(colorActive == false)
    {

        element.className = emperorArray[emperorName].color;
        emperorArray[emperorName].active = true;
        emperorArray[emperorName].Polyline.setOptions({strokeOpacity:1.0});
        circle.disabled = false;
    }

    else if (colorActive == true)
    {
        element.className = 'active'
        emperorArray[emperorName].color
        emperorArray[emperorName].active = false;
        emperorArray[emperorName].Polyline.setOptions({strokeOpacity:0});
        circle.disabled = true;
    }
}
