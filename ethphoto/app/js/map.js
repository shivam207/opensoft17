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

    var locations = [
        {lat: -31.563910, lng: 147.154312},
        {lat: -33.718234, lng: 150.363181},
        {lat: -33.727111, lng: 150.371124},
        {lat: -33.848588, lng: 151.209834},
        {lat: -33.851702, lng: 151.216968},
        {lat: -34.671264, lng: 150.863657},
        {lat: -35.304724, lng: 148.662905},
        {lat: -36.817685, lng: 175.699196},
        {lat: -36.828611, lng: 175.790222},
        {lat: -37.750000, lng: 145.116667},
        {lat: -37.759859, lng: 145.128708},
        {lat: -37.765015, lng: 145.133858},
        {lat: -37.770104, lng: 145.143299},
        {lat: -37.773700, lng: 145.145187},
        {lat: -37.774785, lng: 145.137978},
        {lat: -37.819616, lng: 144.968119},
        {lat: -38.330766, lng: 144.695692},
        {lat: -39.927193, lng: 175.053218},
        {lat: -41.330162, lng: 174.865694},
        {lat: -42.734358, lng: 147.439506},
        {lat: -42.734358, lng: 147.501315},
        {lat: -42.735258, lng: 147.438000},
        {lat: -43.999792, lng: 170.463352}
      ];


      // Try HTML5 geolocation.
        if (navigator.geolocation) {
          console.log('geolocation')
          // console.log(navigator.geolocation)
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            console.log("Hello form map init " + pos.lat + pos.lng)
            // setLatLang(pos.lat,pos.lng);
          //  var marker = new google.maps.Marker({
          // position: pos,
          // map: map,
          // // icon: {
          // //   path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
          // //   scale: 4
          // //   },
          // title: 'User Location'
          // });
            // console.log()
            map.setCenter(pos);
          });
        }

    setMarkers(locations);
}

function setMarkers(locations) {
    
    console.log("In Markers")
    var markers=[];
    
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
    
    markers.push(marker);
  }


    var markerCluster = new MarkerClusterer(map, markers,
        {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

}

