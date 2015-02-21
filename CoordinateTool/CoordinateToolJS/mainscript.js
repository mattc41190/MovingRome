// Create all vars current needed in global scope
var poly, map;
var markers = [];
var rowButtons = [];
var dateLocationsOutput = [];
var destinations = new google.maps.MVCArray();
var placingIntermediateMarker = false;
var entryPoint = destinations.getLength();

// Create the map and initalize the options for the map
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

// Bulk of this application belongs on the addLatLng function as all individual listners are declared upon creation

function addLatLng(event) {
// Create local variables
  var stringLatLng = event.latLng.toString();
  var currentRowButtonId;

// Log current index at which new points will be placed
  console.log("The current entry point is: " + entryPoint);

// Change the point of entry for a new index allowing the user to place a point inbetween two previously existing points
  function changeEntry(element)
  {
// Log the name of the button we click
    console.log(element.id)
// Loop through all existing rowButtons, disable all other buttons, redefine entryPoint to be the index we want to insert at
    for(i in rowButtons)
    {
      if (rowButtons[i] != element.id)
      {
        document.getElementById(rowButtons[i]).setAttribute("disabled", "true");
      }
      else {
        entryPoint = i;
        console.log("The value of the entry point is now set to : " + entryPoint)
        console.log("I am about to create a button not in order at index: "+ entryPoint);
      }
    }
  }

// Loop through all table rows and assign currentButtonRowId to be current entryPoint
  for (var i = 0; i <= dateLocationsOutput.length; i++ )
  {
    if(i == entryPoint)
    {
      currentRowButtonId = "rowBtn" + i;
// Add button to the entryPoint index of the rowButtons array
      rowButtons.splice(i, 0, currentRowButtonId);
    }
  }

// Add new table row and give each button it's own listener
  dateLocationsOutput.splice(entryPoint, 0,"<tr><td class='danger'> <button id='"+currentRowButtonId+
    "'class='btn btn-primary'><span class='caret'></span></button></td><td class='active' >DateArea: "+stringLatLng+
    "</td></tr>");
    document.getElementById('latLongList').innerHTML = "";
  document.getElementById('latLongList').innerHTML = dateLocationsOutput.join("");
  for(i in dateLocationsOutput)
  {
    document.getElementById(rowButtons[i]).addEventListener('click', function(){changeEntry(this)});
  }

// Add new polyline point at point of 'click' event
  destinations.insertAt(entryPoint, event.latLng);

// Add a new marker at the new plotted point on the polyline.
  var marker = new google.maps.Marker({
    position: event.latLng,
    title: '#' + event.latLng,
    map: map,
    draggable: true
  });
  markers.splice(entryPoint, 0, marker);

// Delete Marker function
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
        document.getElementById(rowButtons[i]).addEventListener('click', function(){changeEntry(this)});
      }
    }
  });

// Move Marker function
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
      document.getElementById(rowButtons[i]).addEventListener('click', function(){changeEntry(this)});
    }
    }
  );
// Set entry point to destinations.getLength() so that we have a clean slate to start with.
  entryPoint = destinations.getLength();
}
// addLatLng function ends here, it's a monster I know.


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
  rowButtons = [];
  dateLocationsOutput = [];
  destinations.clear();
  entryPoint = destinations.getLength();
  document.getElementById('latLongList').innerHTML = dateLocationsOutput;
}

google.maps.event.addDomListener(window, 'load', initialize);
