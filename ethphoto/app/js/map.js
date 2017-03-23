//function initMap() {
//
//        var map = new google.maps.Map(document.getElementById('map'), {
//          zoom: 5,
//          center: {lat: -28.024, lng: 140.887}
//        });
//
//        // Create an array of alphabetical characters used to label the markers.
//        var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//
//        // Add some markers to the map.
//        // Note: The code uses the JavaScript Array.prototype.map() method to
//        // create an array of markers based on a given "locations" array.
//        // The map() method here has nothing to do with the Google Maps API.
//       
//            point = new google.maps.LatLng(-28.024,140.887);
//
//        // Add a marker clusterer to manage the markers.
//        var markerCluster = new MarkerClusterer(map, markers,
//            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
//
//        var marker = new google.maps.Marker({map: map, position: point, clickable: true});
//        var infoWindowContent = '<div class="info_content">' +
//                '<h3>Images</h3>' +
//                // '<p>The London Eye is a giant Ferris wheel situated on the banks of the River Thames. The entire structure is 135 metres (443 ft) tall and the wheel has a diameter of 120 metres (394 ft).</p>' +
//                // <IMG BORDER="0" ALIGN="Left" SRC='https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'> 
//                  '<img src="https://openclipart.org/image/2400px/svg_to_png/237816/OrangeLores.png"        width="100" height="100" />'+
//
//            '</div>';
//
//    // var infoWindowContent = <IMG BORDER="0" ALIGN="Left" SRC="/images/user.jpg"> 
//
//    
//    // Initialise the inforWindow
//    var infoWindow = new google.maps.InfoWindow({
//        content: infoWindowContent
//    });
//                
//    // Add a marker to the map based on our coordinates
//    // var marker = new google.maps.Marker({
//    //     position: myLatlng,
//    //     map: map,
//    //     title: 'London Eye, London'
//    // });
//
//    // Display our info window when the marker is clicked
//    google.maps.event.addListener(marker, 'mouseover', function() {
//        infoWindow.open(map, marker);
//    });
//    // google.maps.event.addListener(marker, 'mouseout', function() {
//    //     // infoWindow.open(map, marker);
//    //     infoWindow.close();
//    // });
//
//    
////    var image = {
////        url: 'https://brightcove04pmdo-a.akamaihd.net/5104226627001/5104226627001_5232386545001_5215063851001-vs.jpg?pubId=5104226627001&videoId=5215063851001',
//////        size: new google.maps.Size(71, 71),
////        origin: new google.maps.Point(0, 0),
//////        anchor: new google.maps.Point(17, 34),
////        scaledSize: new google.maps.Size(60, 60)
////    };
//    
//     var markers = locations.map(function(location, i) {
//          return new google.maps.Marker({
//            position: location,
//            label: labels[i % labels.length],
//            map: map,
////            icon:image
//          });
//        });
//
//     var markerCluster = new MarkerClusterer(map, markers,
//            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
//
//}



var map;
var gmarkers = [];

function initMap() {
  
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: {lat: -37.363, lng: 150.044}
  });

  google.maps.event.addListener(map, 'onclick', function(event) {
      // alert(event.latLng); 
      console.log(event.latLng);
  });

  google.maps.event.addListener(map, 'idle', function() {
    // zoomLevel = map.getZoom();
    console.log("Became idle");
    var bounds = map.getBounds();
    var NECorner = bounds.getNorthEast();
    var SWCorner = bounds.getSouthWest();
    // console.log(NECorner.lat());
    // console.log(SWCorner.lat());
    // console.log(NECorner.lng());
    // console.log(SWCorner.lng());
     setScreenPoints(NECorner.lat(),NECorner.lng(),SWCorner.lat(),SWCorner.lng());
  });



  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    console.log('geolocation')
    // console.log(navigator.geolocation)
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      map.setCenter(pos);
    });
  }
}

function setMarkers(locations,add=0) {
    
    console.log("In Markers")
    
    if (add==0)
    {
      for(i=0; i<gmarkers.length; i++){
          gmarkers[i].setMap(null);
      }
      gmarkers = [];
    }
    
    for (var i = 0; i < locations.length; i++) {
        var location = locations[i];  

    var marker = new google.maps.Marker({
      position: {lat: location.lat, lng: location.lng},
      map: map
    });

    marker.addListener('click',function(){
                var x = marker.getPosition().lat();
                var y = marker.getPosition().lng();
                console.log(x,y,'getImage');
    });
    
    gmarkers.push(marker);
  }

  var markerCluster = new MarkerClusterer(map, gmarkers,
      {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

}

