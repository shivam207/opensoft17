var map;

function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: { lat: -37.363, lng: 150.044 }
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
        setScreenPoints(NECorner.lat(), NECorner.lng(), SWCorner.lat(), SWCorner.lng());
    });

    var locations = [
        { lat: -31.563910, lng: 147.154312 },
        { lat: -33.718234, lng: 150.363181 },
        { lat: -33.727111, lng: 150.371124 },
        { lat: -33.848588, lng: 151.209834 },
        { lat: -33.851702, lng: 151.216968 },
        { lat: -34.671264, lng: 150.863657 },
        { lat: -35.304724, lng: 148.662905 },
        { lat: -36.817685, lng: 175.699196 },
        { lat: -36.828611, lng: 175.790222 },
        { lat: -37.750000, lng: 145.116667 },
        { lat: -37.759859, lng: 145.128708 },
        { lat: -37.765015, lng: 145.133858 },
        { lat: -37.770104, lng: 145.143299 },
        { lat: -37.773700, lng: 145.145187 },
        { lat: -37.774785, lng: 145.137978 },
        { lat: -37.819616, lng: 144.968119 },
        { lat: -38.330766, lng: 144.695692 },
        { lat: -39.927193, lng: 175.053218 },
        { lat: -41.330162, lng: 174.865694 },
        { lat: -42.734358, lng: 147.439506 },
        { lat: -42.734358, lng: 147.501315 },
        { lat: -42.735258, lng: 147.438000 },
        { lat: -43.999792, lng: 170.463352 }
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
    searchBox();
}

function searchBox() {

    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        // Clear out the old markers.
        markers.forEach(function(marker) {
            marker.setMap(null);
        });
        markers = [];

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

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
            }));

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

function setMarkers(locations) {

    console.log("In Markers")
    var markers = [];

    var infowindow = new google.maps.InfoWindow();
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


        markers.push(marker);

    }

    var markerCluster = new MarkerClusterer(map, markers, 
        { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });


}

function tagfun() {
    var t;
    // console.log(document.getElementById("a").checked)
    // if(document.getElementById("a").checked) t="a";
    // if(document.getElementById("b").checked) t="b";
    // if(document.getElementById("c").checked) t="c";
    // console.log(t)
    console.log("prasant")
}
