
function initMap() {


    const incidentContainer = parent.document.querySelector('#incidentContainer');
    const incidentPS = new PerfectScrollbar(incidentContainer);


    let guard = results[0];
    let center = { lat: guard.lat, lng: guard.lng };
    let guardPosition = { lat: guard.lat, lng: guard.lng };
    const COLORS = [
        '#e21400', '#f8a700', '#f78b00',
        '#58dc00', '#a8f07a', '#4ae8c4',
        '#3b88eb'];
        
        var mapStyle = [
            {
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    }
                ]
            },
            {
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#616161"
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#bdbdbd"
                    }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ebebeb"
                    }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#eeeeee"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e5e5e5"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dadada"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#616161"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e5e5e5"
                    }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#eeeeee"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#c9c9c9"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#76d6ff"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            }
        ];

    let map = new google.maps.Map(document.getElementById('map'), {
        styles: mapStyle,
        zoom: 18,
        center: center,
        mapTypeId: google.maps.MapTypeId.MAP,
        streetViewControl: false,
        clickableIcons: false,
        fullscreenControl: false,
        mapTypeControl: true,
        panControl: false,
        rotateControl: false,
    });

    let marker = new google.maps.Marker({
        position: guardPosition,
        map: map,
        animation: google.maps.Animation.DROP,
    });


    createPatrolPath();
    createIncidentMarkers();
    createIncidentButtons();

    function createPatrolPath() {

        let firstName = guard.FirstName;

        let pathColor = getPathColor(firstName);

        var patrolSeq = {
            repeat: '30px',
            icon: {
                path: google.maps.SymbolPath.FORWARD_OPEN_ARROW,
                scale: 1,
                fillOpacity: 0,
                strokeColor: "red",
                strokeWeight: 1,
                strokeOpacity: 1
            }
        };
        var patrol = new google.maps.Polyline({
            map: map,
            zIndex: 1,
            geodesic: true,
            strokeColor: pathColor,
            strokeOpacity: 1,
            strokeWeight: 3,
            icons: [patrolSeq]
        })

        let multiplier = 2;

        for (let i = 0; i < results.length; i++) {
            multiplier++;
            window.setTimeout(function () {
                let latLng = new google.maps.LatLng(results[i].lat, results[i].lng);
                if (i > 0) {
                    let lastLocation = new google.maps.LatLng(results[i - 1].lat, results[i - 1].lng);
                    let locAccurate = locationIsAccurate(latLng, lastLocation);
                    if (locAccurate) {
                        patrol.getPath().push(latLng);
                        marker.setPosition(latLng);
                    } else {
                        patrol.getPath().pop();
                    }
                } else {
                    patrol.getPath().push(latLng);
                    marker.setPosition(latLng);

                }
            }, 250 * multiplier);
        }

    }

    function createIncidentMarkers() {

        for (let i = 0; i < incidents.length; i++) {
            var lat = incidents[i].lat;
            var lng = incidents[i].lng;
            let incidentID = incidents[i].IncidentID;

            let windowString = '';

            
            if (incidents[i].Media != 'none') {
                windowString = `<h3  style="text-align: center">` + incidents[i].Type + ` </h3> 
                    <div style="text-align: center"> <p>` + incidents[i].Description + `</p> </div> <div text-align = 'center'> <object id = 'map' data='https://convoyer.mobsscmd.com/incidentpreview/` + incidents[i].IncidentID + `' width='100%' height='100%' type='text/html'> <object/> </div>
                    `;
            } else {
                windowString = `<h3  style="text-align: center">` + incidents[i].Type + ` </h3> 
                <div style="text-align: center"> <p>` + incidents[i].Description + `</p></div>`
            }

            let marker = new google.maps.Marker({
                position: { lat: lat, lng: lng },
                map: map,
                icon: "../../images/warning.png",
                animation: google.maps.Animation.DROP
            });


            let infoWindow = new SnazzyInfoWindow({
                marker: marker,
                content: windowString
            });

            let alreadyOpenedWindow = localStorage.getItem('alreadyOpenedWindow ' + incidentID);

            if (!alreadyOpenedWindow) {
                infoWindow.open(map, marker);
            }

            marker.addListener('click', function (e) {
                localStorage.setItem("alreadyOpenedWindow " + incidentID, true);
                infoWindow.open(map, marker);
            });
        }
    }

    function createIncidentButtons() {

        var incidentButtons = [];

        for (let i = 0; i < incidents.length; i++) {
            let incident = incidents[i];
            let incidentButton = parent.document.getElementById(incident.IncidentID);
            let incidentID = incidents[i].IncidentID;

            incidentButton.addEventListener('click', function (e) {

                map.setCenter({
                    lat: incident.lat,
                    lng: incident.lng
                });
            })

            incidentButtons.push(incidentButton);
        }

    }

    function getPathColor(username) {
        // Compute hash code
        var hash = 7;
        for (var i = 0; i < username.length; i++) {
            hash = username.charCodeAt(i) + (hash << 5) - hash;
        }
        // Calculate color
        var index = Math.abs(hash % COLORS.length);
        return COLORS[index];
    }




}
