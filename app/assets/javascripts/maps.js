$(document).ready(function() {
  console.log("eeeeeeeeeeeeeee");
var side_bar_html = "";
var gmarkers = [];
var highlighted_marker = null;
var map = null;

function letsGetStarted()
{
  var myOptions =
  {
zoom: 8,
      center: new google.maps.LatLng(43.907787,-79.359741),
      mapTypeControl: true,
      mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
      navigationControl: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
  }

  map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

  google.maps.event.addListener(map, 'click', function() {
      infowindow.close();
      });

  var point = new google.maps.LatLng(43.65654,-79.90138);
  var marker = createMarker(point,"This place","Some stuff to display in the<br>First Info Window");

  var point = new google.maps.LatLng(43.91892,-78.89231);
  var marker = createMarker(point,"That place","Some stuff to display in the<br>Second Info Window");

  var point = new google.maps.LatLng(33.0000, 44.0000);
  var marker = createMarker(point,"The other place","Some stuff to display in the<br>Third Info Window");

  document.getElementById("side_bar").innerHTML = side_bar_html;
}

var infowindow = new google.maps.InfoWindow({
size: new google.maps.Size(150,50)
});

function myclick(i) {
  google.maps.event.trigger(gmarkers[i], "click");
}

function createMarker(latlng, name, html) {
  var contentString = html;
  console.log(""+latlng.lat());
  var marker = new google.maps.Marker({
    position: latlng,
    map: map,
    //icon: '<%= image_path('inactive_pin.png') %>',
    anchor: new google.maps.Point(latlng.lat(), latlng.lng()),
    zIndex: Math.round(latlng.lat()*-100000)<<5
});

google.maps.event.addListener(marker, 'click', function() {
    console.log(marker.getPosition());
    unhighlightMarker(highlighted_marker);
    // marker.setIcon('<%= image_path('active_pin.png') %>');
    highlighted_marker = marker;
    map.setCenter(marker.getPosition());
    infowindow.open(map,marker);
    });
gmarkers.push(marker);
side_bar_html += '<a href="javascript:myclick(' + (gmarkers.length-1) + ')">' + name + '<\/a><br>';
}


function unhighlightMarker(marker) {
  if(marker != null)
  {
    //marker.setIcon('<%= image_path('inactive_pin.png') %>');
  }
}
});
