var poly, map;
var markers = [];
var destinations = new google.maps.MVCArray();

function initialize() {
  var mapOptions = {
    zoom: 5,
    disableDoubleClickZoom : true,
    // Center the map on Chicago, USA.
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

/**
 * Handles click events on a map, and adds a new point to the Polyline.
 * @param {google.maps.MouseEvent} event
 */
function addLatLng(event) {

  var path = poly.getPath();
  var stringLatLng = event.latLng.toString();


  document.getElementById('latLongList').innerHTML +=
  "<tr><td class='danger'> <span class='remove'>X</span></td><td class='active' >DateArea: "+stringLatLng+"</td></tr>";
  console.log(event.latLng.toString());

  // Because path is an MVCArray, we can simply append a new coordinate
  // and it will automatically appear.
  path.push(event.latLng);


  // Add a new marker at the new plotted point on the polyline.
  var marker = new google.maps.Marker({
    position: event.latLng,
    title: '#' + event.latLng,
    map: map,
    draggable: true
  });
  markers.push(marker);


  google.maps.event.addListener(marker, 'click', function() {
    marker.setMap(null);
    for (var i = 0, I = markers.length; i < I && markers[i] != marker; ++i);
    markers.splice(i, 1);
    destinations.removeAt(i);
    }
  );

  google.maps.event.addListener(marker, 'dragend', function() {
    for (var i = 0, I = markers.length; i < I && markers[i] != marker; ++i);
    destinations.setAt(i, marker.getPosition());

    }
  );

}

function removeLatLng() {

  var path = poly.getPath();
  path.pop();

}

google.maps.event.addDomListener(window, 'load', initialize);
