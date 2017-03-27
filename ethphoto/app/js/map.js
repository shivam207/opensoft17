var map;
var gmarkers = [];

var infowindow = null;
// console.log("REACHED HERE!!!");

function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: { lat: -37.363, lng: 150.044 }
    });
    console.log("REACHED HERE!!!");
    //searchBox();
    var card = document.getElementById('pac-card');
    var input = document.getElementById('pac-input');
    // var types = document.getElementById('type-selector');

    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);
    var autocomplete = new google.maps.places.Autocomplete(input);
    console.log(autocomplete);
    autocomplete.bindTo('bounds', map);
    
    autocomplete.addListener('place_changed', function() {
      // infowindow.close();
      // marker.setVisible(false);
      var place = autocomplete.getPlace();
      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }

      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);  // Why 17? Because it looks good.
      }
      // marker.setPosition(place.geometry.location);
      // marker.setVisible(true);


      // infowindowContent.children['place-icon'].src = place.icon;
      // infowindowContent.children['place-name'].textContent = place.name;
      // infowindowContent.children['place-address'].textContent = address;
      // infowindow.open(map, marker);
    });
    infowindow = new google.maps.InfoWindow({
                content: "loading..."
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
        setScreenPoints(NECorner.lat(), NECorner.lng(), SWCorner.lat(), SWCorner.lng());
    });


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
    searchBox("manualLocation")

}

function searchBox(id="pac-input") {

    var input = document.getElementById(id);
    var searchBox = new google.maps.places.SearchBox(input);
    // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
    });


    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        // Clear out the old markers.

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };



            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });
}
var markerCluster ;
var flag = 0;
function setMarkers(locations, add = 0) {

    console.log("IN SET MARKERS")
    if (add == 0) {
        //console.log("\n\n\nHello");
        //console.log(gmarkers.length + " " + locations.length + "\n\n\n");
        console.log("the length is "+locations.length)
        for (i = 0; i < gmarkers.length; i++) {
            
            console.log("hi"+i);
            gmarkers[i].setMap(null);
        }
        
        if(flag)
        {
        markerCluster.clearMarkers();
        }
        gmarkers = [];
    }
    for (var i = 0; i < locations.length; i++) {
        var location = locations[i];
        console.log("printing locations");
        console.log(location.lat,location.lng);
        flag = 1;
        var marker = new google.maps.Marker({
            position: { lat: location.lat, lng: location.lng },
            map: map
        });

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                var x = marker.getPosition().lat();
                var y = marker.getPosition().lng();
                console.log("marker clicked");
                ethPhoto.getByLocation(x.toString(),y.toString()).then(function(final) {
                    console.log("the retrieved string is")
                    //console.log(final);
                    if(final!="")
                    {   console.log(final)
                    link = EmbarkJS.Storage.getUrl(final);
                    console.log(link);

                    infowindow.setContent("<p> hello  </p> <IMG width = '100' height = '100' SRC="+link+">");
                    infowindow.open(map,marker);
                    
                    }
                    // console.log(x)
                    // console.log(y);
                    // console.log(final[0])
                    // console.log(final[1])
                    // console.log(final[2])
                    // console.log(final[3])

                });

            }
        })(marker, i));
        // console.log(location);
        gmarkers.push(marker);
    }

    // console.log("setMap");

    markerCluster = new MarkerClusterer(map, gmarkers,
     { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
    // console.log("bdbfd");

}
