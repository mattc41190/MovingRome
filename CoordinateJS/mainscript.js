var poly, map;
var markers = [];
var rowButtons = [];
var dateLocationsOutput = [];
var destinations = new google.maps.MVCArray();
var placingIntermediateMarker = false;
var entryPoint = destinations.getLength();


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
// Add new <tr> to #latLongList and addListner to it
  var stringLatLng = event.latLng.toString();
  var currentRowButtonId;

  console.log("The current entry point is: " + entryPoint);

  function changeTruth(element)
  {
    console.log(element.id)
    placingIntermediateMarker = true;
    for(i in rowButtons)
    {
      if (rowButtons[i] != element.id)
      {
        document.getElementById(rowButtons[i]).setAttribute("disabled", "true");
      }
      else {
        entryPoint = i;
        console.log("The value of the entry point is now set to : " + entryPoint)
      }
    }
  }


  for (var i = 0; i <= dateLocationsOutput.length; i++ )
  {
    if(i == dateLocationsOutput.length)
    {
      console.log(i);
      currentRowButtonId = "rowBtn" + i;
      rowButtons.push(currentRowButtonId);
    }
  }

  dateLocationsOutput.push("<tr><td class='danger'> <button id='"+currentRowButtonId+
    "'class='btn btn-primary'><span class='caret'></span></button></td><td class='active' >DateArea: "+stringLatLng+
    "</td></tr>");
  document.getElementById('latLongList').innerHTML = dateLocationsOutput.join("");
  for(i in dateLocationsOutput)
  {
    document.getElementById(rowButtons[i]).addEventListener('click', function(){changeTruth(this)});
  }

// Add new polyline point at point of 'click' event
  destinations.insertAt(entryPoint, event.latLng);
  entryPoint = destinations.getLength();


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
      for(i in dateLocationsOutput)
      {
        document.getElementById(rowButtons[i]).addEventListener('click', function(){changeTruth(this)});
      }
    }
  });

// Add a 'dragend' listener to this newly placed marker (every marker gets its own dragend listener)
  google.maps.event.addListener(marker, 'dragend', function() {
    var i = markers.indexOf(marker);
    destinations.setAt(i, marker.getPosition());
    newLocation = marker.getPosition().toString();
    marker.setTitle(newLocation);
    dateLocationsOutput[i] = "<tr><td class='danger'> <button id='"+currentRowButtonId+
      "'class='btn btn-primary'><span class='caret'></span></button></td><td class='active' >DateArea: "+newLocation+
    "</td></tr>";
    document.getElementById('latLongList').innerHTML = dateLocationsOutput.join("");
    for(i in dateLocationsOutput)
    {
      document.getElementById(rowButtons[i]).addEventListener('click', function(){changeTruth(this)});
    }
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
