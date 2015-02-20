var poly, map;
var markers = [];
var dateLocationsOutput = [];
var destinations = new google.maps.MVCArray();

function initialize() {
  var mapOptions = {
    zoom: 5,
    disableDoubleClickZoom : true,
    center: new google.maps.LatLng(40.622291783092706, 17.91046142578125)
  };

  map = new google.maps.Map(document.getElementById('map-canvas-tool'), mapOptions);

  var polyOptions = {
    path: destinations,
    strokeColor: '#000000',
    strokeOpacity: 1.0,
    strokeWeight: 3
  };
  poly = new google.maps.Polyline(polyOptions);
  poly.setMap(map);

  // Add a listener for the click event
  google.maps.event.addListener(map, 'click', addLatLng);
}

function addLatLng(event) {
// Add new <tr> to #latLongList
  var stringLatLng = event.latLng.toString();
  dateLocationsOutput.push("<tr><td class='danger'> <input type='checkbox' id='"+(dateLocationsOutput.length)+
    "'class='remove'</input></td><td class='active' >DateArea: "+stringLatLng+
    "</td></tr>");
  document.getElementById('latLongList').innerHTML = dateLocationsOutput.join("");

// Add new polyline point at point of 'click' event
  destinations.push(event.latLng);

// Add a new marker at the new plotted point on the polyline.
  var marker = new google.maps.Marker({
    position: event.latLng,
    title: '#' + event.latLng,
    map: map,
    draggable: true
  });
  markers.push(marker);

// Add a 'click' listener to this newly placed marker (every marker gets its own click listener)
  google.maps.event.addListener(marker, 'click', function() {
    marker.setMap(null);
    var i = markers.indexOf(marker);
    if(i >= 0)
    {
      markers.splice(i,1);
      destinations.removeAt(i);
      dateLocationsOutput.splice(i,1);
      document.getElementById('latLongList').innerHTML = dateLocationsOutput.join("");
    }
  });

// Add a 'dragend' listener to this newly placed marker (every marker gets its own dragend listener)
  google.maps.event.addListener(marker, 'dragend', function() {
    var i = markers.indexOf(marker);
    destinations.setAt(i, marker.getPosition());
    newLocation = marker.getPosition().toString();
    marker.setTitle(newLocation);
    dateLocationsOutput[i] = "<tr><td class='danger'> <input type='checkbox' id='"+(dateLocationsOutput.length)+
    "'class='remove'</input></td><td class='active' >DateArea: "+newLocation+
    "</td></tr>";
    document.getElementById('latLongList').innerHTML = dateLocationsOutput.join("");
    }
  );
}
// addLatLng function ends here


// Create a method of clearing map of markers
function setAllMap(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Use setAllMap function and set all array to empty to clear map.
function clearAll()
{
  setAllMap(null);
  markers = [];
  dateLocationsOutput = [];
  destinations.clear();
  document.getElementById('latLongList').innerHTML = dateLocationsOutput;
}



google.maps.event.addDomListener(window, 'load', initialize);
