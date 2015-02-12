var map, mapOptions;
var destinations3 = new google.maps.MVCArray();
var destinations4 = new google.maps.MVCArray();
var pompeyLine
var ceasarpolyLine
var polyLine3, polyLineOptions3;
var polyLine4, polyLineOption4;
var value;

var plots3 = [];
var tiberius = [];

$(document).ready(function() {
    console.log("document is ready");
    value = 0;
    document.getElementById("dateShower").innerHTML = dates[0];
    console.log("The current slider value is: " + value)
    destinations1.push(pompey.locations[0]);
    destinations2.push(ceasar.locations[0]);
    destinations3.push(plots3[0]);
    destinations4.push(tiberius[0]);
});

$("#markerSlider1").bind("slider:changed", function() {
    value = this.value;
    console.log("The current slider value is: " + value)
    document.getElementById("dateShower").innerHTML = dates[value];
    slideChanged();
    writeSentence1();
    writeSentence2();
    writeSentence3();
    writeSentence4();
});

function slideChanged() {

    var currentLength = destinations1.length;
    if(value >= destinations1.length)
    {
    while(value >= destinations1.length) {
            var x  = destinations1.length;
            destinations1.push(pompey.locations[x])
            destinations2.push(ceasar.locations[x])
            destinations3.push(plots3[x])
            destinations4.push(tiberius[x])
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
    

/*    pompeyPolyline = new google.maps.Polyline(pompey.polylineOptions);
    pompeyPolyline.setMap(map);
    pompey.Polyline = pompeyPolyline;


    ceasar.polylineOptions;
    ceasarPolyline = new google.maps.Polyline(ceasar.polylineOptions);
    ceasarPolyline.setMap(map);*/

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

function cellClicked(element)
{

    var emperorName = element.getAttribute("name");
    console.log(emperorArray[emperorName].firstName);
    var colorActive = element.getAttribute("colorActive");
    if(colorActive == 'false')
    {
        element.className = emperorArray[emperorName].color;
        element.setAttribute("colorActive", "true");
        emperorArray[emperorName].Polyline.setOptions({strokeOpacity:1.0});
    }

    else if (colorActive == 'true')
    {
        element.className = 'active'
        element.setAttribute("colorActive", "false");
        emperorArray[emperorName].Polyline.setOptions({strokeOpacity:0});
    }
}


/*var pCellActive = false;
function pompeyCellClicked()
{
    console.log("pompeyCell clicked");

    if(pCellActive  == false)
    {
        var pompeyCell = document.getElementById("pompeyCell");
        pompeyCell.className = pompey.color;
        pompeyLine.setOptions({strokeOpacity:1.0});
        pCellActive = true;
    }

    else
    {
        var pompeyCell = document.getElementById("pompeyCell");
        pompeyCell.className = 'active';
        pompeyLine.setOptions({strokeOpacity:0});
        pCellActive = false;
    }
    writeSentence1();
}

var cCellActive = false;
function ceasarCellClicked()
{
    console.log("ceasar clicked");

    if(cCellActive  == false)
    {
        var ceasarCell = document.getElementById("ceasarCell");
        ceasarCell.className = ceasar.color;
        ceasarpolyLine.setOptions({strokeOpacity:1.0});
        cCellActive = true;
    }

    else
    {
        var ceasarCell = document.getElementById("ceasarCell");
        ceasarCell.className = 'active';
        ceasarpolyLine.setOptions({strokeOpacity:0});
        cCellActive = false;
    }
    writeSentence2();
}

var aCellActive = false;
function augustusCellClicked()
{
    console.log("augustusCellClicked");

    if(aCellActive  == false)
    {
        var augustusCell = document.getElementById("augustusCell");
        augustusCell.className = 'info';
        polyLine3.setOptions({strokeOpacity:1.0});
        aCellActive = true;
    }

    else
    {
        var augustusCell = document.getElementById("augustusCell");
        augustusCell.className = 'active';
        polyLine3.setOptions({strokeOpacity:0});
        aCellActive = false;
    }
    writeSentence3();
}

var tCellActive = false;
function tiberiusCellClicked()
{
    console.log("tiberiusCellClicked");

    if(tCellActive  == false)
    {
        var tiberiusCell = document.getElementById("tiberiusCell");
        tiberiusCell.className = 'warning';
        polyLine4.setOptions({strokeOpacity:1.0});
        tCellActive = true;
    }

    else
    {
        var tiberiusCell = document.getElementById("tiberiusCell");
        tiberiusCell.className = 'active';
        polyLine4.setOptions({strokeOpacity:0});
        tCellActive = false;
    }
    writeSentence4();
}
*/
