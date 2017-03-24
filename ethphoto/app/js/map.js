var map;
var gmarkers = [];

// console.log("REACHED HERE!!!");

function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: { lat: -37.363, lng: 150.044 }
    });
    console.log("REACHED HERE!!!");
    searchBox();

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

}

function searchBox() {

    var input = document.getElementById('pac-input');
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

function setMarkers(locations, add = 0) {

    if (add == 0) {
        for (i = 0; i < gmarkers.length; i++) {
            gmarkers[i].setMap(null);
        }
        gmarkers = [];
    }
    for (var i = 0; i < locations.length; i++) {
        var location = locations[i];

        var marker = new google.maps.Marker({
            position: { lat: location.lat, lng: location.lng },
            map: map
        });

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                var x = marker.getPosition().lat();
                var y = marker.getPosition().lng();
                console.log(x, y, 'getImage');
                infowindow.setContent("Get Username from Backend");
                infowindow.open(map, marker);
            }
        })(marker, i));
        console.log(location);
        gmarkers.push(marker);
    }

    console.log("setMap");
    var markerCluster = new MarkerClusterer(map, gmarkers,
     { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
    console.log("bdbfd");

}
